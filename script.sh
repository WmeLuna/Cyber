echo "This is a script made by Allen Martinez (luna@wmeluna.com) for CyberPatriot team 14-4293"
echo "Any Use of this script that is not this team is NOT allowed!"
sudo gsettings set org.gnome.desktop.interface gtk-theme 'Adwaita-dark' > /dev/null 2>&1 #darkmde bc i like my eyes

sudo apt update 
sudo apt install -y curl

sudo bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"dom.disable_open_during_load\", true);' >> user.js"
sudo bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"privacy.donottrackheader.enabled\", true);' >> user.js"
sudo bash -c "cd ~/.mozilla/firefox/*.default/ && echo 'user_pref(\"dom.security.https_only_mode\", true);' >> user.js"


sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/updates.sh)"
sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/apt-smart.sh)"
sudo bash -c "$(curl -sL https://raw.githubusercontent.com/ilikenwf/apt-fast/master/quick-install.sh)"
echo "_APTMGR=apt" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "DOWNLOADBEFORE=true" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXNUM=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXCONPERSRV=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1

sudo apt-fast install -y software-properties-common ssh ufw unattended-upgrades rkhunter clamav lynis chkrootkit synaptic gufw libpam-cracklib iptables ansible git
sudo gnome-terminal -- bash -c 'sudo apt-fast upgrade -y && sudo bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/updates.sh)"'

sudo ufw enable
sudo ufw logging on

sudo rm -r /usr/games* > /dev/null
sudo rm -r /usr/local/games* > /dev/null

echo "allow-guest=false" | sudo tee -a /etc/lightdm/lightdm.conf

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
