From ubuntu:focal

ENV DEBIAN_FRONTEND noninteractive
ENV GOLANG_VERSION 1.21

RUN apt-get update && \
    apt-get install -y git wget tar curl sudo tcpdump && \
    apt-get clean

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN     apt update
RUN     apt install nodejs -y
RUN     corepack enable

RUN wget https://dl.google.com/go/go1.22.5.linux-amd64.tar.gz && tar -xvf go1.22.5.linux-amd64.tar.gz && mv go /usr/local
ENV GOROOT=/usr/local/go
RUN mkdir goproject
ENV GOPATH=/goproject
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH 

RUN git clone https://github.com/AbdallahRustom/webconsole.git /webconsole

WORKDIR /webconsole
RUN go mod tidy
RUN  go build -o ./webui ./server.go

Run cd /webconsole/frontend && yarn install && yarn build && rm -rf ../public && cp -R build ../public

VOLUME [ "/free5gc/config" ]

EXPOSE 5000
EXPOSE 2122