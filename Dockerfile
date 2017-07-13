FROM gliderlabs/alpine:3.6

RUN apk --no-cache add imagemagick \
    openjpeg \
    nodejs-current-npm

RUN mkdir /app/
WORKDIR /app/
COPY package.json /app/
COPY package-lock.json /app/
ENV NODE_ENV=production
RUN npm install
COPY dicomParse/ /app/dicomParse
COPY dynamoDBUpload/ /app/dynamoDBUpload
COPY magickImageConvert/ /app/magickImageConvert
COPY s3upload/ /app/s3upload
COPY index.js /app/


EXPOSE 3000
CMD ["npm", "start"]