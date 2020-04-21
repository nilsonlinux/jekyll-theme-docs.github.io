#!/bin/bash
#########################################################
#    Script criado para automatizar a instalação        #
#  e configuração dos pacotes mpd + ncmpcpp + polybar   #
#           Desenvolvido por:  Nilsonlinux              #
#########################################################

# Variáveis
## Colors
C='\033[1;36m'
G='\033[1;32m'
R='\033[1;31m'
Y='\033[1;33m'
B='\033[1;34m'
P='\033[1;35m'
RE='\033[0m'
a='\033[1;33m' # Amarelo
p='\033[0;35m' # Purple
v='\033[0;32m' #Verde
b='\033[1m'
u='\033[4m'
bl='\E[30m'
r='\E[31m'
g='\E[32m'
y='\E[33m'
bu='\E[34m'
m='\E[35m'
c='\E[36m'
w='\E[37m'
endc='\E[0m'
enda='\033[0m'
version='20200408'
spath="$( cd "$( dirname $0 )" && pwd )"
############################################################
# clipdvs Logo
logo () {
  clear
  echo -e "${b}${g}                                                                                                     
::::    :::  ::::::::   ::::::::  :::        :::    :::  ::::::::  
:+:+:   :+: :+:    :+: :+:    :+: :+:        :+:    :+: :+:    :+: 
:+:+:+  +:+ +:+        +:+    +:+ +:+        +:+    +:+ +:+        
+#+ +:+ +#+ +#++:++#++ +#+    +:+ +#+        +#+    +:+ +#++:++#++ 
+#+  +#+#+#        +#+ +#+    +#+ +#+        +#+    +#+        +#+ 
#+#   #+#+# #+#    #+# #+#    #+# #+#        #+#    #+# #+#    #+# 
###    ####  ########   ########  ##########  ########   ########   ®${enda}
 ${c}Script para instalação automatizada${endc} do ${r}mpd+ncmpcpp+polybar${endc}
                   ${r}Dev: Nilsonlinux${endc}"
    echo
}

# Exit Codig
nsolusexit () {
  logo
  echo -e " Obrigado por utilizar o ${b}CliPDVs${enda}
 Para mais informações visite o repositório oficial:
 ${b}==>> ${bu}https://github.com/nilsonlinux/CliPDVs${enda}
 Grupo no Telegram:
 ${b}==>> ${bu}https://t.me/clipdvs${enda}"
  echo && sleep 1
  exit
}
###############################################################################
mpd () {
  logo
  echo -e " ${y}Você irá instalar o mpd + ncmpcpp${endc}" && echo
  echo -e " ${bu}Tudo será configurado automaticamente.${enda}"
  echo && echo -en " ${y}Deseja continuar? {s/n}${endc} "
  read option
  case $option in
    s) echo && echo -e " ${r}Iniciando${endc} ${y}Instalação${endc}"; sudo eopkg it git mpd ncmpcpp && mkdir ~/.config/mpd && mkdir .config/mpd/playlists && wget https://raw.githubusercontent.com/nilsonlinux/ncmpcpp-mpd/master/mpd.conf && cp mpd.conf ~/.config/mpd/ && mpd && ncmpcpp; saidacomando " ${c}mpd + ncmpcpp${endc}" ;;
    n) echo -e " ${y}OK. Retornando para o menu anterior${end}"; sleep 1;;
    *) echo -e " \"$option\"  ${r}Comando inválido!${endc}"; sleep 1; mpd ;;
  esac
}
###############################################################################
polybar () {
  logo
  echo -e " ${y}Você irá instalar polybar${endc}" && echo
  echo -e " ${bu}Tudo será configurado automaticamente${enda}, ${r}Pacotes a ser instalado. mpd + ncmpcpp + polybar.${enda}"
  echo && echo -en " ${y}Deseja continuar? {s/n}${endc} "
  read option
  case $option in
    s) echo && echo -e " ${r}Iniciando${endc} ${y}Instalação${endc}"; sudo eopkg it polybar && mkdir ~/.local/share/fonts && mkdir ~/.config/polybar && git clone https://github.com/nilsonlinux/polybar && cd polybar && cp -r fonts/* ~/.local/share/fonts && fc-cache -v && cp -r * ~/.config/polybar && chmod +x ~/.config/polybar/polybar.sh &&  ~/.config/polybar/polybar.sh; saidacomando " ${c}polybar${endc}" ;;
    n) echo -e " ${y}OK. Retornando para o menu anterior${end}"; sleep 1;;
    *) echo -e " \"$option\"  ${r}Comando inválido!${endc}"; sleep 1; polybar ;;
  esac
}
###############################################################################
todos () {
  logo
  echo -e " ${y}Você irá instalar todos os pacotes${endc}" && echo
  echo -e " ${bu}E tudo será configurado automaticamente.${enda}"
  echo && echo -en " ${y}Deseja continuar? {s/n}${endc} "
  read option
  case $option in
    s) echo && echo -e " ${r}Iniciando${endc} ${y}Instalação${endc}"; sudo eopkg it git polybar mpd ncmpcpp && mkdir ~/.local/share/fonts && mkdir ~/.config/polybar && git clone https://github.com/nilsonlinux/polybar && cd polybar && cp -r fonts/* ~/.local/share/fonts && fc-cache -v && cp -r * ~/.config/polybar && chmod +x ~/.config/polybar/polybar.sh && sudo eopkg it git mpd ncmpcpp && mkdir ~/.config/mpd && mkdir .config/mpd/playlists && wget https://raw.githubusercontent.com/nilsonlinux/ncmpcpp-mpd/master/mpd.conf && cp mpd.conf ~/.config/mpd/ && mpd && ~/.config/polybar/polybar.sh; saidacomando " ${c}mpd + ncmpcpp + polybar${endc}" ;;
    n) echo -e " ${y}OK. Retornando para o menu anterior${end}"; sleep 1;;
    *) echo -e " \"$option\"  ${r}Comando inválido!${endc}"; sleep 1; polybar ;;
  esac
}
###############################################################################
###############################################################################
# Comando executado
saidacomando () {
    echo && echo -e "Você executou a instalação do${b}$1${enda}."
    echo -e " Volte para o menu anterior."
    echo && echo -e " ${y}Digite Enter para retornar.${endc}"
    read input ;
}
#########################################################
# Menu principal
while :
do
logo
echo -e "         ${b}[ MENU PRINCIPAL ]${enda}"
echo -e "
"
echo -e $B"        [$R"01"$B]$G mpd + ncmpcpp$P"
echo -e $B"        [$R"02"$B]$G polybar$P"
echo -e $B"        [$R"03"$B]$G Instalar todos$P"
echo -e $B"        --------------------------$B"
echo -e $B"        [$R"0"$B]$G Fechar o script"
echo
echo -en " Digite a opção: "
read option
case $option in
1) mpd ;;
01) mpd ;;
2) polybar ;;
02) polybar ;;
3) todos ;;
03) todos ;;
0) nsolusexit ;;
*) echo -e " \"$option\" ${r}Opção inválida!${endc}"; sleep 1 ;;
esac
done
#© 2020 Nilsonlinux
