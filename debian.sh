#!/bin/bash
echo "This is a script made by Allen Martinez (luna@wmeluna.com) for CyberPatriot team 14-4293"
echo "Any Use of this script that is not this team is NOT allowed!"
gsettings set org.gnome.desktop.interface gtk-theme 'Adwaita-dark' > /dev/null 2>&1 #darkmde bc i like my eyes
echo "$USER ALL=(ALL:ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/$USER > /dev/null 2>&1 # disable sudo prompt during the comp

sudo apt update > /dev/null 2>&1
sudo apt install -y curl> /dev/null 2>&1

bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"browser.contentblocking.category\", strict);' >> user.js"
bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"privacy.donottrackheader.enabled\", true);' >> user.js"
bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"dom.security.https_only_mode\", true);' >> user.js"
bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"dom.disable_open_during_load\", true);' >> user.js"

echo -e "\033[1;35mConfiguring Update Settings\033[0m"
sudo bash -c "cd /etc/apt/apt.conf.d/ && curl -sL https://github.com/WmeLuna/Cyber/raw/main/10periodic > 10periodic"
sudo bash -c "cd /etc/apt/apt.conf.d/ && curl -sL https://github.com/WmeLuna/Cyber/raw/main/20auto-upgrades > 20auto-upgrades"
sudo bash -c 'echo -e "deb http://deb.debian.org/debian/ $(lsb_release -cs) main contrib non-free" > /etc/apt/sources.list'
sudo bash -c 'echo -e "deb-src http://deb.debian.org/debian/ $(lsb_release -cs) main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb http://security.debian.org/debian-security $(lsb_release -cs)/updates main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb-src http://security.debian.org/debian-security $(lsb_release -cs)/updates main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb http://deb.debian.org/debian/ $(lsb_release -cs)-updates main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb-src http://deb.debian.org/debian/ $(lsb_release -cs)-updates main contrib non-free" >> /etc/apt/sources.list'

echo -e "\033[1;35mCustomizing GNOME\033[0m"
bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/nordic-theme.sh)" > /dev/null 2>&1
if [ "$(lsb_release -is)" = "Debian" ]; then echo -e "\033[1;35mUbuntu's Dock has beed added\033[0m"; fi
#sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/updates.sh)"

echo -e "\033[1;35mConfiguring Custom APT settings (makes downloads go faster) \033[0m"
sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/apt-smart.sh)"  > /dev/null 2>&1 
sudo bash -c "$(curl -sL https://raw.githubusercontent.com/ilikenwf/apt-fast/master/quick-install.sh)" > /dev/null 2>&1 
echo "_APTMGR=apt" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "DOWNLOADBEFORE=true" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXNUM=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXCONPERSRV=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1

echo -e "\033[1;35mDownloading software\033[0m"
echo "debconf debconf/priority select critical" | sudo debconf-set-selections
echo "debconf debconf/frontend select Noninteractive" | sudo debconf-set-selections
sudo apt-fast install -y software-properties-common sysstat acct auditd debsums apt-show-versions ssh ufw unattended-upgrades rkhunter clamav lynis chkrootkit synaptic gufw libpam-cracklib iptables ansible git
sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/lynis.sh)" > /dev/null 2>&1

echo -e "\033[1;35mUpgrading Packages\033[0m"
sudo apt-fast upgrade -y 

sudo bash -c 'echo -e "deb http://deb.debian.org/debian/ $(lsb_release -cs) main contrib non-free" > /etc/apt/sources.list'
sudo bash -c 'echo -e "deb-src http://deb.debian.org/debian/ $(lsb_release -cs) main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb http://security.debian.org/debian-security $(lsb_release -cs)/updates main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb-src http://security.debian.org/debian-security $(lsb_release -cs)/updates main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb http://deb.debian.org/debian/ $(lsb_release -cs)-updates main contrib non-free" >> /etc/apt/sources.list'
sudo bash -c 'echo -e "deb-src http://deb.debian.org/debian/ $(lsb_release -cs)-updates main contrib non-free" >> /etc/apt/sources.list'

echo -e "\033[1;35mConfiguring many files\033[0m"
sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/config.sh)" > /dev/null 2>&1 

echo -e "\033[1;35mTurning on firewall\033[0m" 
sudo ufw enable
sudo ufw logging on

echo -e "\033[1;35mRemoving items in default game directorys\033[0m"
sudo rm -r /usr/games* > /dev/null
sudo rm -r /usr/local/games* > /dev/null

echo "allow-guest=false" | sudo tee -a /etc/lightdm/lightdm.conf > /dev/null 2>&1 

sudo iptables -F
sudo iptables -P INPUT DROP
sudo iptables -P OUTPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A OUTPUT -o lo -j ACCEPT
sudo iptables -A INPUT -s 127.0.0.0/8 -j DROP
sudo iptables -A OUTPUT -p tcp -m state --state NEW,ESTABLISHED -j ACCEPT
sudo iptables -A OUTPUT -p udp -m state --state NEW,ESTABLISHED -j ACCEPT
sudo iptables -A OUTPUT -p icmp -m state --state NEW,ESTABLISHED -j ACCEPT
sudo iptables -A INPUT -p tcp -m state --state ESTABLISHED -j ACCEPT
sudo iptables -A INPUT -p udp -m state --state ESTABLISHED -j ACCEPT
sudo iptables -A INPUT -p icmp -m state --state ESTABLISHED -j ACCEPT

echo -e "\033[1;35mDeleting media files\033[0m"
sudo find /home -name '*.mp3' -type f -delete &
sudo find /home -name '*.mov' -type f -delete &
sudo find /home -name '*.mp4' -type f -delete &
sudo find /home -name '*.avi' -type f -delete &
sudo find /home -name '*.mpg' -type f -delete &
sudo find /home -name '*.mpeg' -type f -delete &
sudo find /home -name '*.flac' -type f -delete &
sudo find /home -name '*.m4a' -type f -delete &
sudo find /home -name '*.flv' -type f -delete &
sudo find /home -name '*.ogg' -type f -delete &
sudo find /home -name '*.gif' -type f -delete &
sudo find /home -name '*.png' -type f -delete &
sudo find /home -name '*.jpg' -type f -delete &
sudo find /home -name '*.jpeg' -type f -delete &
wait

echo -e "\033[1;35mRemoving malicious software\033[0m"
sudo apt-fast remove -y john hydra wireshark nginx snmp xinetd > /dev/null 2>&1 
sudo apt autoremove -y > /dev/null 2>&1 

echo -e "\033[1;35mDisabling root logon\033[0m"
sudo passwd -l root > /dev/null 2>&1 
sudo usermod -s /usr/sbin/nologin root > /dev/null 2>&1 

echo -e "\033[1;35mRunning AV checks\033[0m"
sudo rm -rf /var/log/lynis.log > /dev/null 2>&1 
sudo rkhunter -c --sk  > /dev/null 2>&1 & 
sudo chkrootkit -q  > /dev/null 2>&1 &
sudo lynis -q --quick > /dev/null 2>&1 &
wait

PASS='K!rkL@nd2587'
sudo cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1 > users
sed -i '/root/ d' users

##delete users make admin and change pass
for x in `cat users`
do
    read -p "Delete user $x?[y/n]: " ansdel
    if [ $ansdel = y ];
    then
          sudo mv /home/$x /home/del_$x
          sudo sed -i -e "/$x/ s/^#*/#/" /etc/passwd
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
                sudo chage -M 90 -m 7 -W 15 $x
                echo -e "Changed password of $x"
          fi
    fi
done


bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/info.sh)"
