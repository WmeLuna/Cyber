#!/bin/bash
sudo apt-get install -y tar gnome-shell gnome-shell-extensions gnome-tweaks

cd ~ && mkdir .themes 
cd ~/.themes 

if [ "$(lsb_release -is)" = "Debian" ]; then 
    sudo apt-get install -y gnome-shell-extension-dashtodock
    gnome-shell-extension-tool -e user-theme@gnome-shell-extensions.gcampax.github.com
    gnome-shell-extension-tool -e dash-to-dock@micxgx.gmail.com
    gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed true
    gsettings set org.gnome.shell.extensions.dash-to-dock extend-height true
else
    gnome-extensions enable user-theme@gnome-shell-extensions.gcampax.github.com
fi

gsettings set org.gnome.shell.extensions.dash-to-dock transparency-mode DYNAMIC
curl -LOJ https://github.com/EliverLara/Nordic/releases/download/v2.1.0/Nordic.tar.xz
tar -xf Nordic.tar.xz
wget -qO- https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/raw/master/install.sh | DESTDIR="$HOME/.icons" sh
gsettings set org.gnome.desktop.interface gtk-theme Nordic
gsettings set org.gnome.desktop.wm.preferences theme Nordic
gsettings set org.gnome.shell.extensions.user-theme name "Nordic"
gsettings set org.gnome.desktop.interface icon-theme 'Papirus-Dark'

if [ "$(lsb_release -is)" = "Debian" ]; then 
    echo "Ubuntu's Dock has beed added, will appear on reboot"
fi