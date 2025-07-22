FROM tsl0922/ttyd:1.7.7

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update --yes && apt install --yes curl gpg wget htop neovim strace systemctl git zsh qemu-utils genisoimage net-tools libcap2-bin apt iproute2 iputils-ping

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"


CMD ["/usr/bin/ttyd", "--writable", "-p", "7681", "/usr/bin/zsh"]

