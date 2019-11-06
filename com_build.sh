#!/bin/bash

yum -y update

yum install -y vim git unzip zip 

mkdir /data
cd /data
git clone https://github.com/lisapan123pd/carr.git

yum install -y yum-utils device-mapper-persistent-data lvm2

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

yum makecache fast

yum -y install docker-ce

systemctl start docker
systemctl enbale docker

curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose 


