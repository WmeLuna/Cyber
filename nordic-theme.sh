#!/bin/bash
sudo apt-get install -y tar gnome-shell gnome-shell-extensions gnome-tweaks git

cd ~ && mkdir .themes 
cd ~/.themes || exit 

if [ "$(lsb_release -is)" = "Debian" ]; then 
    if [ "$(dpkg-query -W -f='${Status}' gnome-shell-extension-dashtodock 2>/dev/null | grep -c 'ok installed')" = "0" ]; then
        sudo apt-get install -y gnome-shell-extension-dashtodock
        gnome-session-quit --no-prompt
    fi
    gnome-shell-extension-tool -e user-theme@gnome-shell-extensions.gcampax.github.com
    gnome-shell-extension-tool -e dash-to-dock@micxgx.gmail.com
    gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed true
    gsettings set org.gnome.shell.extensions.dash-to-dock extend-height true
else
    gnome-extensions enable user-theme@gnome-shell-extensions.gcampax.github.com
fi

gsettings set org.gnome.shell.extensions.dash-to-dock transparency-mode DYNAMIC
wget -O Nordic-darker.tar.xz https://github.com/EliverLara/Nordic/releases/latest/download/Nordic-darker.tar.xz
tar -xf Nordic-darker.tar.xz
#wget -qO- https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/raw/master/install.sh | DESTDIR="$HOME/.icons" sh
bash -c "$(curl -sL https://github.com/WmeLuna/Cyber/raw/main/tela-icons.sh)"
gsettings set org.gnome.desktop.interface gtk-theme Nordic-darker
gsettings set org.gnome.desktop.wm.preferences theme Nordic-darker
gsettings set org.gnome.shell.extensions.user-theme name "Nordic-darker"
#gsettings set org.gnome.desktop.interface icon-theme 'Papirus-Dark'

if [ "$(lsb_release -is)" = "Debian" ]; then 
    echo "Ubuntu's Dock has beed added, will appear on reboot"
fi
