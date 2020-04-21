---
layout: post
title: "Personalização Solus Mate com Polybar"
---

### Usando o xdg-mime:

Instale o pacote [xdg-utils](https://www.archlinux.org/packages/xdg-utils):  

```bash
sudo pacman -S xdg-utils
```  

Ache o tipo do arquivo:  

```bash  
xdg-mime query filetype /path/pagina.html
```

Veja qual aplicativo está associado:  

```bash  
xdg-mime query default text/html
```

Liste os aplicativos instalados:  

```bash
ls /usr/share/applications/
```  
Configure o aplicativo padrão:

```bash
xdg-mime default chromium.desktop text/html
```  

Para o MATE:  

```bash
gsettings set org.mate.applications-browser exec chromium
```  

No modo gráfico:  

```bash
mate-default-applications-properties
```  

*BÔNUS* váriaveis globais

/etc/profile ou /etc/bash.bashrc ou ~/.bashrc  
```bash
BROWSER="chromium"
export BROWSER
```

/etc/fish/config.fish ou /etc/fish/conf.d/variables.fish (**ou qualquer outro nome terminado em .fish**) ou ~/.config/fish/config.fish  
```bash
set -x -g BROWSER chromium
```  

*EDIT*

```bash
gvfs-mime --set x-scheme-handler/magnet deluge.desktop
```  

Fontes:
[Arch Linux Wiki](https://wiki.archlinux.org/index.php/default_applications)  
[Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?pid=732285#p732285)  
[Arch Linux MATE Wiki](https://wiki.archlinux.org/index.php/MATE#Enabling_compositing)  
[Arch Linux BBS](https://bbs.archlinux.org/viewtopic.php?id=59119)  
[Ask Ubuntu](http://askubuntu.com/questions/44849/how-to-configure-chrome-to-open-magnet-urls-with-deluge)  

Boa sorte! :wink:
