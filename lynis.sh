wget -q -O - https://packages.cisofy.com/keys/cisofy-software-public.key | sudo apt-key add - &> /dev/null
echo "deb https://packages.cisofy.com/community/lynis/deb/ stable main" | sudo tee /etc/apt/sources.list.d/cisofy-lynis.list > /dev/null
echo 'Acquire::Languages "none";' | sudo tee /etc/apt/apt.conf.d/99disable-translations
apt-fast update
apt-fast -y install apt-transport-https sysstat acct auditd debsums apt-show-versions lynis


echo "Package: lynis
Pin: origin packages.cisofy.com
Pin-Priority: 600" > /etc/apt/preferences.d/lynis
