cd /etc/apt/apt.conf.d/
wget -O https://github.com/WmeLuna/Cyber/raw/main/10periodic 10periodic
wget -O https://github.com/WmeLuna/Cyber/raw/main/20auto-upgrades 20auto-upgrades
# lsb_release -cs
echo -e "deb http://archive.ubuntu.com/ubuntu $(lsb_release -cs) main universe restricted multiverse" > /etc/apt/sources.list
echo -e "deb-src http://archive.ubuntu.com/ubuntu $(lsb_release -cs) main universe restricted multiverse " >> /etc/apt/sources.list
echo -e "deb http://security.ubuntu.com/ubuntu/ $(lsb_release -cs)-security restricted main multiverse universe" >> /etc/apt/sources.list
echo -e "deb http://archive.ubuntu.com/ubuntu $(lsb_release -cs)-updates restricted main multiverse universe" >> /etc/apt/sources.list
echo -e "deb http://archive.ubuntu.com/ubuntu $(lsb_release -cs)-backports restricted main multiverse universe" >> /etc/apt/sources.list
