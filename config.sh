#!/bin/bash
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/common-auth > /etc/pam.d/common-auth
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/common-password > /etc/pam.d/common-password
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/limits.conf > /etc/security/limits.conf
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/login.defs > /etc/login.defs
curl -sL https://github.com/WmeLuna/Cyber/raw/main/conf/sysctl.conf > /etc/sysctl.conf


apt-get install auditd -y
sed 's/log_file = .*/log_file = /var/log/audit/audit.log/g' /etc/audit/auditd.conf
sed 's/log_format = .*/log_format = RAW/g' /etc/audit/auditd.conf
sed 's/log_group = .*/log_group = root/g' /etc/audit/auditd.conf
sed 's/priority_boost = .*/priority_boost = 4/g' /etc/audit/auditd.conf
sed 's/flush = .*/flush = INCREMENTAL/g' /etc/audit/auditd.conf
sed 's/freq = .*/freq = 20/g' /etc/audit/auditd.conf
sed 's/num_logs = .*/num_logs = 4/g' /etc/audit/auditd.conf
sed 's/disp_qos = .*/disp_qos = lossy/g' /etc/audit/auditd.conf
sed 's/dispatcher = .*/dispatcher = /sbin/audispd/g' /etc/audit/auditd.conf
sed 's/name_format = .*/name_format = NONE/g' /etc/audit/auditd.conf
sed 's/##name = .*/##name = mydomain/g' /etc/audit/auditd.conf
sed 's/max_log_file = .*/max_log_file = 5/g' /etc/audit/auditd.conf
sed 's/max_log_file_action = .*/max_log_file_action = ROTATE/g' /etc/audit/auditd.conf
sed 's/space_left = .*/space_left = 75/g' /etc/audit/auditd.conf
sed 's/space_left_action = .*/space_left_action = SYSLOG/g' /etc/audit/auditd.conf
sed 's/action_mail_acct = .*/action_mail_acct = root/g' /etc/audit/auditd.conf
sed 's/admin_space_left = .*/admin_space_left = 50/g' /etc/audit/auditd.conf
sed 's/admin_space_left_action = .*/admin_space_left_action = SUSPEND/g' /etc/audit/auditd.conf
sed 's/disk_full_action = .*/disk_full_action = SUSPEND/g' /etc/audit/auditd.conf
sed 's/disk_error_action = .*/disk_error_action = SUSPEND/g' /etc/audit/auditd.conf
sed 's/##tcp_listen_port = .*/##tcp_listen_port = /g' /etc/audit/auditd.conf
sed 's/tcp_listen_queue = .*/tcp_listen_queue = 5/g' /etc/audit/auditd.conf
sed 's/tcp_max_per_addr = .*/tcp_max_per_addr = 1/g' /etc/audit/auditd.conf
sed 's/##tcp_client_ports = .*/##tcp_client_ports = 1024-65535/g' /etc/audit/auditd.conf
sed 's/tcp_client_max_idle = .*/tcp_client_max_idle = 0/g' /etc/audit/auditd.conf
sed 's/enable_krb5 = .*/enable_krb5 = no/g' /etc/audit/auditd.conf
sed 's/krb5_principal = .*/krb5_princiapl = auditd/g' /etc/audit/auditd.conf
sed 's/##krb5_key_file = .*/##krb5_key_file = /etc/audit/audit.key/g' /etc/audit/auditd.conf
auditctl -e 1

echo "LoginGraceTime 2m" >> /etc/ssh/sshd_config
echo "PermitRootLogin no " >> /etc/ssh/sshd_config
echo "StrictMode yes" >> /etc/ssh/sshd_config
echo "MaxAuthTries 0" >> /etc/ssh/sshd_config
echo "MaxSessions 0" >> /etc/ssh/sshd_config
echo "PubkeyAuthentication yes" >> /etc/ssh/sshd_config

systemctl reload sshd.service

echo 0 | sudo tee /proc/sys/net/ipv4/ip_forward
sysctl -n net.ipv4.tcp_syncookies

echo "ENABLED=true" > /etc/default/sysstat
systemctl enable sysstat &> /dev/null
systemctl start sysstat > /dev/null

/etc/init.d/acct start > /dev/null

echo "WARNING: UNAUTHORIZED ACCESS IS FORBIDDEN. PENAL LAWS WILL BE ENFORCED BY OWNER." > /etc/issue.net
echo "WARNING: UNAUTHORIZED ACCESS IS FORBIDDEN. PENAL LAWS WILL BE ENFORCED BY OWNER." > /etc/issue
echo "install dccp /bin/true" > /etc/modprobe.d/dccp.conf
echo "install rds /bin/true" > /etc/modprobe.d/rds.conf
echo "install tipc /bin/true" > /etc/modprobe.d/tipc.conf

apt-get -y purge telnet gnome-games > /dev/null

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
