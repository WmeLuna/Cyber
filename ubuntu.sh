echo "nospoof on" | sudo tee -a /etc/host.conf
sudo sed -i -e 's/APT::Periodic::Update-Package-Lists.*\+/APT::Periodic::Update-Package-Lists "1";/' /etc/apt/apt.conf.d/10periodic
sudo sed -i -e 's/APT::Periodic::Download-Upgradeable-Packages.*\+/APT::Periodic::Download-Upgradeable-Packages "0";/' /etc/apt/apt.conf.d/10periodic
sudo apt update
bash -c "$(curl -sL https://github.com/ilikenwf/apt-fast/raw/master/quick-install.sh)"
echo "_APTMGR=apt" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "DOWNLOADBEFORE=true" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXNUM=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
echo "_MAXCONPERSRV=10" | sudo tee -a /etc/apt-fast.conf>/dev/null 2>&1
sudo apt-fast install -y gnome-session-fallback ssh ufw unattended-upgrades rkhunter clamav lynis chkrootkit synaptic gufw libpam-cracklib
sudo apt-fast upgrade -y
sudo ufw enable
sudo ufw logging on
sudo passwd -l root


# password security
sudo sed 's/pam_cracklib.so/pam_cracklib.so ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1 /g' /etc/pam.d/common-password
sudo sed 's/pam_unix.so/pam_unix.so remember=5 minlen=8 /g' /etc/pam.d/common-password
echo 'auth required pam_tally2.so deny=5 onerr=fail unlock_time=1800' >> /etc/pam.d/common-auth

#potentially malicious programs 
sudo apt remove -y john hydra wireshark

##av scans
clamscan
rkhunter -c --sk
lynis -c --quick
chkrootkit -q

## list games ##
dpkg -l | grep -i game

## lock root user
sudo passwd -l root

## disable guest
echo "allow-guest=false" >> /etc/lightdm/lightdm.conf
