
echo -e "\033[1;35m Start printing text that may be useful to get more points\033[0m"
echo -e "\033[1;35m List games\033[0m"
sudo dpkg -l | grep -i game

echo " "
echo -e "\033[1;35m List files in all home dirs\033[0m"
sudo ls /home/*/*

echo " "
echo -e "\033[1;35m Listing all human users\033[0m"
sudo cut -d: -f1,3 /etc/passwd | egrep ':[0-9]{4}$' | cut -d: -f1

echo " "
echo -e "\033[1;35m Listing actionable test ids from lynis (google them to see what commands to run to fix them) \033[0m" 
sudo cat /var/log/lynis.log | grep Suggestion | grep -o "test:.*" | cut -f2- -d: | cut -d "]" -f1 |sed s:LYNIS:: | sed s:FILE-6310:: | sort -u | grep "\S"

if [ -f /var/run/reboot-required ]; then
        echo -e "\033[1;35m A reboot is required please reboot asap\033[0m"
fi
