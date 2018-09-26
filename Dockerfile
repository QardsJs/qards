FROM node:8.12.0-alpine

RUN apk add --update \
  --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-tools vips-dev fftw-dev gcc g++ make libc6-compat git \
  && rm -rf /var/cache/apk/*

RUN yarn global add gatsby-cli gatsby
RUN mkdir -p /site
WORKDIR /site
VOLUME /site

ADD ./bin/develop.sh /
RUN chmod +x /develop.sh

EXPOSE 8000
EXPOSE 9000

ENTRYPOINT ["sh", "/develop.sh"]