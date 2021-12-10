#!/bin/bash
sudo apt update
sudo apt install python3-pip python3-setuptools python3-wheel -y  # install python-pip and so on without asking
pip3 install apt-smart  # --user flag means install to per user site-packages directory(see below)
echo "export PATH=\$(python -c 'import site; print(site.USER_BASE + \"/bin\")'):\$PATH" >> ~/.bashrc
source ~/.bashrc  # set per user site-packages directory to PATH
apt-smart -aq
