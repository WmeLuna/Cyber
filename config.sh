curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/common-auth > /etc/pam.d/common-auth
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/common-password > /etc/pam.d/common-password
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/limits.conf > /etc/security/limits.conf
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/login.defs > /etc/login.defs
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/sysctl.conf > /etc/sysctl.conf


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
