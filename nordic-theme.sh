#!/bin/bash
cd ~ && mkdir .themes 
cd ~/.themes 
curl -LOJ https://github.com/EliverLara/Nordic/releases/download/v2.1.0/Nordic.tar.xz
tar -xf Nordic.tar.xz
gsettings set org.gnome.desktop.interface gtk-theme Nordic
gsettings set org.gnome.desktop.wm.preferences theme Nordic
