
echo -e "\033[1;35m Start printing text that may be useful to get more points\033[0m"
echo -e "\033[1;35m List games\033[0m"
sudo dpkg -l | grep -i game

echo " "
echo -e "\033[1;35m List files in all home dirs\033[0m"
sudo ls /home/*/*

echo " "
echo -e "\033[1;35m List all cronjobs\033[0m"
echo "" > /tmp/cronjobs
for user in $(cut -f1 -d: /etc/passwd); do echo $user >> /tmp/cronjobs; sudo crontab -u $user -l >> /tmp/cronjobs 2>&1; done
cat /tmp/cronjobs | sed 's/no crontab for //' | uniq -u |sed 's/#.*//' |sed -r '/^\s*$/d'

echo " "
echo -e "\033[1;35m Listing all human users\033[0m"
sudo cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1

echo " "
echo -e "\033[1;35m Listing nonempty groups with human users highlighted\033[0m"
cat /etc/group |grep -v ":$" |sed -e $'s/:.*:/ /' > /tmp/groups
cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1 > /tmp/humuser
for x in `cat /tmp/humuser`
do
    sed -i -e "s/$x/\\\033[1;35m&\\\033[0m/" /tmp/groups > /dev/null
done
echo -e "$(</tmp/groups)"

echo " "
echo -e "\033[1;35m Listing actionable test ids from lynis (google them to see what commands to run to fix them) \033[0m" 
sudo cat /var/log/lynis.log | grep Suggestion | grep -o "test:.*" | cut -f2- -d: | cut -d "]" -f1 |sed s:LYNIS:: | sed s:FILE-6310:: | sort -u | grep "\S"

echo " "
echo -e "\033[1;35m Listing solutions already in lynis's log \033[0m" 
sudo cat /var/log/lynis.log | grep Suggestion | grep -o "solution:.*" | cut -f2- -d: | grep -v -- '-]' | rev | cut -c2- | rev

if [ -f /var/run/reboot-required ]; then
        echo -e "\033[1;35m A reboot is required please reboot asap\033[0m"
fi
