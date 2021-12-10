#!/bin/bash

echo "This is a script made by Allen Martinez (luna@wmeluna.com) for CyberPatriot team 14-4293"
echo "Any Use of this script that is not this team is NOT allowed!"
gsettings set org.gnome.desktop.interface gtk-theme 'Adwaita-dark' > /dev/null 2>&1
bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"dom.disable_open_during_load\", true);' >> user.js"

## daily update
#sudo sed -i -e 's/APT::Periodic::Update-Package-Lists.*\+/APT::Periodic::Update-Package-Lists "1";/' /etc/apt/apt.conf.d/10periodic
#sudo sed -i -e 's/APT::Periodic::Download-Upgradeable-Packages.*\+/APT::Periodic::Download-Upgradeable-Packages "0";/' /etc/apt/apt.conf.d/10periodic
sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/updates.sh)"
bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/apt-smart.sh)" #change to fastest mirror
#echo -e "\033[1;35m Opening Software & Updates, in the Updates tab change \"Subscribed to: \" to All Updates and \"Automatically check for updates\" to daily\033[0m"
#sudo software-properties-gtk

sudo apt update
bash -c "$(curl -sL https://raw.githubusercontent.com/ilikenwf/apt-fast/master/quick-install.sh)"
echo "_APTMGR=apt" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "DOWNLOADBEFORE=true" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXNUM=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXCONPERSRV=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
sudo apt-fast install -y software-properties-common ssh ufw unattended-upgrades rkhunter clamav lynis chkrootkit synaptic gufw libpam-cracklib iptables ansible git
sudo apt-fast upgrade -y
sudo ufw enable
sudo ufw logging on

#set it back to default mirror
sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/updates.sh)"

#disabling services
echo -e "\033[1;35mDisabling unneeded services...\033[0m"
systemctl disable cups.service cups ssh xinetd avahi-daemon isc-dhcp-server6 slapd nfs-server rcpbind bind9 vsftd dovecot smbd squid snmpd rsync rsh nis samba snmp talk ntalk ftp > /dev/null

#remove games
rm -r /usr/games* > /dev/null
rm -r /usr/local/games* > /dev/null

## disable guest
echo "allow-guest=false" | sudo tee -a /etc/lightdm/lightdm.conf


# password security
sed -i "s/PASS_MAX_DAYS	99999/PASS_MAX_DAYS 90/" /etc/login.defs
sed -i "s/PASS_MIN_DAYS	0/PASS_MIN_DAYS 7/" /etc/login.defs
sed -i "s/PASS_WARN_AGE	7/PASS_WARN_AGE 14/" /etc/login.defs

# firewall
iptables -F
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A INPUT -s 127.0.0.0/8 -j DROP
iptables -A OUTPUT -p tcp -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p udp -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p icmp -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -p tcp -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -p udp -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -p icmp -m state --state ESTABLISHED -j ACCEPT
#iptables -A INPUT -p tcp --dport 22 -m state --state NEW -j ACCEPT #inbound ssh

# remove "hacking tools" 
sudo apt remove -y john hydra wireshark nginx snmp xinetd

##av scans
sudo rkhunter -c --sk &
sudo lynis --quick &
sudo chkrootkit -q &
wait # waits for the above to finish as the & has it run in the background and continue

#removes leftover images
#sudo find / -name '*.mp3' -type f -delete &
#sudo find / -name '*.mov' -type f -delete &
#sudo find / -name '*.mp4' -type f -delete &
#sudo find / -name '*.avi' -type f -delete &
#sudo find / -name '*.mpg' -type f -delete &
#sudo find / -name '*.mpeg' -type f -delete &
#sudo find / -name '*.flac' -type f -delete &
#sudo find / -name '*.m4a' -type f -delete &
#sudo find / -name '*.flv' -type f -delete &
#sudo find / -name '*.ogg' -type f -delete &
sudo find /home -name '*.gif' -type f -delete &
sudo find /home -name '*.png' -type f -delete &
sudo find /home -name '*.jpg' -type f -delete &
sudo find /home -name '*.jpeg' -type f -delete &
wait 

sysctl -n net.ipv4.tcp_syncookies
echo 0 | sudo tee /proc/sys/net/ipv4/ip_forward


## change all user passwords
#PASS='K!rkL@nd2587'
#cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1 > users
#sed -i '/root/ d' users
#for x in `cat users`
#do
#      echo -e "$PASS\n$PASS" | sudo passwd $x
#      chage -M 90 -m 7 -W 15 $x
#      echo -e "$x's password has been changed"
#done

## lock root user
sudo passwd -l root
sudo usermod -s /usr/sbin/nologin root

PASS='K!rkL@nd2587'
cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1 > users
sed -i '/root/ d' users
clear
##delete users make admin and change pass
for x in `cat users`
do
    read -p "Delete user $x?[y/n]: " ansdel
    if [ $ansdel = y ];
    then
          mv /home/$x /home/del_$x
          sed -i -e "/$x/ s/^#*/#/" /etc/passwd
    else
          ##confirm admin list
          read -p "Is user $x an admin?[y/n]: " ansadmin
          if [ $ansadmin = y ];
          then
                sudo usermod -a -G adm $x
                sudo usermod -a -G sudo $x
          else
                sudo deluser $x adm
                sudo deluser $x sudo
          fi
          
          #change pass
          read -p "Change user's $x password (do not change $USER's password)?[y/n]: " anspass
          if [ $anspass = y ];
          then
                echo -e "$PASS\n$PASS" | sudo passwd $x
                chage -M 90 -m 7 -W 15 $x
                echo -e "Changed password of $x"
          fi
    fi
done



clear

echo -e "\033[1;35m Start printing text that may be useful to get more points\033[0m"
## list games ##
echo -e "\033[1;35m List games\033[0m"
dpkg -l | grep -i game

echo " "
echo -e "\033[1;35m List files in all home dirs\033[0m"
ls /home/*/*

echo " "
echo -e "\033[1;35m Listing all human users\033[0m"
cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1

echo " "

if [ -f /var/run/reboot-required ]; then
        echo -e "\033[1;35m A reboot is required please reboot asap\033[0m"
fi
