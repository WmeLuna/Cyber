wget -q -O - https://packages.cisofy.com/keys/cisofy-software-public.key | sudo apt-key add - &> /dev/null
echo "deb https://packages.cisofy.com/community/lynis/deb/ stable main" | sudo tee /etc/apt/sources.list.d/cisofy-lynis.list > /dev/null
apt-fast -y install apt-transport-https sysstat acct auditd debsums apt-show-versions
apt-fast update


echo "ENABLED=true" > /etc/default/sysstat
systemctl enable sysstat &> /dev/null
systemctl start sysstat > /dev/null

/etc/init.d/acct start > /dev/null

echo "WARNING: UNAUTHORIZED ACCESS IS FORBIDDEN. PENAL LAWS WILL BE ENFORCED BY OWNER." > /etc/issue.net
echo "WARNING: UNAUTHORIZED ACCESS IS FORBIDDEN. PENAL LAWS WILL BE ENFORCED BY OWNER." > /etc/issue
echo "install dccp /bin/true" > /etc/modprobe.d/dccp.conf
echo "install rds /bin/true" > /etc/modprobe.d/rds.conf
echo "install tipc /bin/true" > /etc/modprobe.d/tipc.conf

apt-get -y purge gnome-games > /dev/null

rm -rf /usr/games > /dev/null
rm -rf /usr/local/games > /dev/null

chmod o-rx /usr/bin/x86_64-linux-gnu-as

chown root:shadow /etc/shadow
chmod 640 /etc/shadow

chown root:root /etc/passwd
chmod 644 /etc/passwd

chown root:root /etc/group
chmod 644 /etc/group
chown root:root /etc/pam.d
chmod 644 /etc/pam.d
chown root:shadow /etc/gshadow
chmod 640 /etc/gshadow
chmod 600 /etc/crontab
chmod 700 /etc/cron.d
chmod 700 /etc/cron.daily
chmod 700 /etc/cron.hourly
chmod 700 /etc/cron.monthly
chmod 700 /etc/cron.weekly
chmod 600 /etc/cups/cupsd.conf
