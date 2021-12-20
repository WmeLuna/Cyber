#!/bin/bash
cd ~ && mkdir .themes && cd ~/.themes 
curl -OJ https://github.com/EliverLara/Nordic/releases/download/v2.1.0/Nordic.tar.xz
tar xvzf Nordic.tar.xz
gsettings set org.gnome.desktop.interface gtk-theme Nordic
gsettings set org.gnome.desktop.wm.preferences theme Nordic
