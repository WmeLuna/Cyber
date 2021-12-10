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

