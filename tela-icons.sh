#!/bin/bash
git clone https://github.com/vinceliuice/Tela-icon-theme.git ~/tela
~/tela/install.sh purple
gsettings set org.gnome.desktop.interface icon-theme 'Tela-purple-dark'
rm -rf ~/tela/