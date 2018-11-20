#FROM node:10
FROM keymetrics/pm2:latest-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

RUN npm install pm2 -g
# If you are building your code for production
# RUN npm install --only=production

#RUN apk update
#RUN apk upgrade

#RUN apk add nano
# RUN apk update
# RUN apk add --upgrade busybox 

# Bundle app source
COPY . .
RUN npm install --prefix client
RUN npm run build --prefix client

EXPOSE 3000
EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && pm2-runtime process.yml

#RUN curl "mongo_service:57493"

#EXPOSE 57493
#CMD [ "pm2", "run", "start" ]
#CMD [ "pm2", "run", "start" ]
#CMD ["pm2-runtime", "server.js"]
#CMD ["pm2-runtime", "process.yml"]
#CMD ["pm2-runtime", "process.yml", "--only", "APP"]
#CMD ["npm", "run", "pm2"]
#CMD ["npm", "run", "start"]

# http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/#starting-a-configuration-file
# https://github.com/keymetrics/docker-pm2
# https://github.com/keymetrics/pm2-auto-pull

# docker build -t node .
# docker run -d -p 5000:5000 --name node node:latest
# docker run -d -p 5000:5000 -v $(pwd):/usr/src/app --name node node:latest
# docker exec -it node /bin/sh
# docker run -d -p 3000:3000 -v $(pwd):/usr/src/app --name node nicejames/node:latest
# docker-compose up -d


# Useful commands
# Command	Description
# docker exec -it node pm2 monit	                Monitoring CPU/Usage of each process
# docker exec -it node pm2 list	                  Listing managed processes
# docker exec -it node pm2 show	                  Get more information about a process
# docker exec -it node pm2 reload all	            0sec downtime reload all applications


# docker login
# export DOCKER_ID_USER="nicejames"
# export IMG_NAME="node"
# docker tag $IMG_NAME $DOCKER_ID_USER/$IMG_NAME
# docker push $DOCKER_ID_USER/$IMG_NAME


# https://github.com/vishnubob/wait-for-it
# https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b
# https://stackoverflow.com/questions/51938049/mongodb-connection-error-inside-docker-container