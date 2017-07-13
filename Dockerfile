FROM gliderlabs/alpine:3.6

RUN apk --no-cache add imagemagick \
    openjpeg \
    git \
    nodejs-current-npm

RUN git clone https://github.com/kaptiin-tuekhov/DICOMstagram-API.git
WORKDIR /DICOMstagram-API
RUN git checkout service
RUN npm install
CMD ["npm", "start"]
