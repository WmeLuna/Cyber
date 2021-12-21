#!/bin/bash
sudo add-apt-repository ppa:papirus/papirus -y
sudo apt-get install tar gnome-shell-extensions gnome-tweaks papirus-icon-theme

cd ~ && mkdir .themes 
cd ~/.themes 

status=$(gnome-extensions info user-theme@gnome-shell-extensions.gcampax.github.com | grep -o "State:.*" | cut -f2- -d:)
if [ "$status" = " DISABLED" ]; then 
    gnome-extensions enable user-theme@gnome-shell-extensions.gcampax.github.com

fi
curl -LOJ https://github.com/EliverLara/Nordic/releases/download/v2.1.0/Nordic.tar.xz
tar -xf Nordic.tar.xz
gsettings set org.gnome.desktop.interface gtk-theme Nordic
gsettings set org.gnome.desktop.wm.preferences theme Nordic
gsettings set org.gnome.shell.extensions.user-theme name "Nordic"
gsettings set org.gnome.desktop.interface icon-theme 'Papirus-Dark'