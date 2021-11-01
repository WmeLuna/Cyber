#!/bin/bash

## daily update
sudo sed -i -e 's/APT::Periodic::Update-Package-Lists.*\+/APT::Periodic::Update-Package-Lists "1";/' /etc/apt/apt.conf.d/10periodic
sudo sed -i -e 's/APT::Periodic::Download-Upgradeable-Packages.*\+/APT::Periodic::Download-Upgradeable-Packages "0";/' /etc/apt/apt.conf.d/10periodic
## Security updates
cat /etc/apt/sources.list | grep "deb http://security.ubuntu.com/ubuntu/ focal-security universe main multiverse restricted"
if [ $? -eq 1 ]
then
	echo "deb http://security.ubuntu.com/ubuntu/ focal-security universe main multiverse restricted" | sudo tee -a /etc/apt/sources.list
fi

sudo apt update
bash -c "$(curl -sL https://github.com/ilikenwf/apt-fast/raw/master/quick-install.sh)"
echo "_APTMGR=apt" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "DOWNLOADBEFORE=true" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXNUM=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXCONPERSRV=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
sudo apt-fast install -y software-properties-common ssh ufw unattended-upgrades rkhunter clamav lynis chkrootkit synaptic gufw libpam-cracklib
sudo apt-fast upgrade -y
sudo ufw enable
sudo ufw logging on



## disable guest
echo "allow-guest=false" >> /etc/lightdm/lightdm.conf


# password security
sudo sed 's/pam_cracklib.so/pam_cracklib.so ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1 /g' /etc/pam.d/common-password
sudo sed 's/pam_unix.so/pam_unix.so remember=5 minlen=8 /g' /etc/pam.d/common-password
echo 'auth required pam_tally2.so deny=5 onerr=fail unlock_time=1800' >> /etc/pam.d/common-auth

# remove "hacking tools" 
sudo apt remove -y john hydra wireshark nginx snmp xinetd

##av scans
freshclam --stdout
clamscan -r -i --stdout --exclude-dir="^/sys" /
rkhunter -c --sk
lynis -c --quick
chkrootkit -q

#removes leftover images
sudo find /home -name '*.gif' -type f -delete
sudo find /home -name '*.png' -type f -delete
sudo find /home -name '*.jpg' -type f -delete
sudo /home -name '*.jpeg' -type f -delete

sysctl -n net.ipv4.tcp_syncookies
echo 0 | sudo tee /proc/sys/net/ipv4/ip_forward
echo "nospoof on" | sudo tee -a /etc/host.conf

## change all user passwords
PASS='K!rkL@nd2587'
cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1 > users
sed -i '/root/ d' users
for x in `cat users`
do
      echo -e "$PASS\n$PASS" | passwd $x
      chage -M 90 -m 7 -W 15 $x
      echo -e "$x's password has been changed"
done

## lock root user
sudo passwd -l root
clear
##delete users
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
    fi
done



clear

echo "Start printing text that may be useful to get more points"
## list games ##
echo "List games"
dpkg -l | grep -i game

echo " "
echo "List files in all home dirs"
ls /home/*/*

echo " "
echo "Listing all human users"
cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1



if [ -f /var/run/reboot-required ]; then
        echo "A reboot is required please reboot asap"
fi
