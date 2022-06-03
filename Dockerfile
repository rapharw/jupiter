FROM centos/nodejs-10-centos7

ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

USER root

## Import the Microsoft repository key
RUN rpm --import https://packages.microsoft.com/keys/microsoft.asc

## Create local azure-cli repository
COPY config/azure-cli.repo /etc/yum.repos.d/azure-cli.repo

## Install Azure CLI with the yum install command
RUN yum install azure-cli -y

RUN npm install -g typescript



RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY . /usr/src/app
RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]