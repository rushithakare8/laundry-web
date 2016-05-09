# To build:
# docker build -t cesaregb/laundry-web -f Dockerfile .
# docker push cesaregb/laundry-web:v1
#
# To run:
# run docker mongo....
# docker run -p 3000:3000 -it cesaregb/laundry-web
# docker run -p 3000:3000 -it --entrypoint bash cesaregb/laundry-web
FROM node
MAINTAINER Cesar Gonzalez, cesareg.borjon@gmail.com

# Install software
RUN apt-get update && \
            apt-get install -y git && \
            apt-get clean && \
            rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir -p /root/.ssh
ADD github_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

# RUN ssh-keyscan github.com >> ~/.ssh/github_rsa

# RUN git clone https://github.com/cesaregb/il-middleware-services.git

RUN mkdir app
COPY package.json app/package.json
WORKDIR app
RUN npm install

#Current workingdir is app from dependencies image.
ADD . /app
ENV NODE_ENV dev
ENV VAULT='{"auth":{"facebook":{"clientId":"881601445289245","clientSecret":"8b3671fe28e22dd57b525d8cb864a2c9"}},"password":"wx8(rOqJIA^yok4aBv!(l25GjwHTP0g&","api":{"user":"user","password":"user"},"stripe":"sk_test_m1f9mBO7U4X1lDnerfKhTyK9"}'

# Define default command.
ENTRYPOINT ["npm", "start"]
# ENTRYPOINT ["start.sh"]

# Expose ports.
EXPOSE 3000
