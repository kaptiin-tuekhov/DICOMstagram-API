FROM ubuntu:14.04.3

RUN apt-get update -y && apt-get install -y build-essential wget make git git-core cmake autoconf libfcgi0ldbl libtool libjpeg-turbo8 libtiff4-dev libpng12-0 libpng12-dev liblcms2-2 liblcms2-dev libgomp1 libpthread-stubs0-dev liblzma5 liblzma-dev libjbig-dev libjbig0 libz80ex1 libz80ex-dev pkg-config nodejs npm

# Download and compile openjpeg2.1
WORKDIR /tmp/openjpeg
RUN git clone https://github.com/uclouvain/openjpeg.git ./
RUN git checkout tags/version.2.1
RUN cmake . && make && make install

RUN export USE_OPENJPEG=1

# add usr/local/lib to /etc/ld.so.conf and run ldconfig
RUN printf "include /etc/ld.so.conf.d/*.conf\ninclude /usr/local/lib\n" > /etc/ld.so.conf && ldconfig

# download and compile Stweil's iipsrv w/ openjpeg2.1, sleeps prevent 'Text file busy' error
WORKDIR /tmp/iip
RUN git clone https://github.com/stweil/iipsrv.git ./
RUN git checkout tags/openjpeg-20160529
RUN chmod +x autogen.sh && sleep 2 && ./autogen.sh
RUN chmod +x configure && sleep 2 && ./configure --with-openjpeg=/tmp/openjpeg && sleep 2 && make && make install