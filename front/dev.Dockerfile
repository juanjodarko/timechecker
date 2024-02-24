FROM node:12-alpine
RUN mkdir /front
WORKDIR /front
ENV PATH /front/node_modules/.bin:$PATH
RUN npm install -g @angular/cli@8.3.21
ADD package.json package-lock.json /front/
RUN npm install
