FROM ubuntu:16.04
RUN apt-get update && apt-get install -y git curl wget gnupg apt-transport-https ca-certificates supervisor=3.2.0-2ubuntu0.2
WORKDIR /app
RUN mkdir -p /var/log/supervisord /data/db /app/my-slate-api

# Installing mongodb
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org=4.2.2 mongodb-org-server=4.2.2 mongodb-org-shell=4.2.2 mongodb-org-mongos=4.2.2 mongodb-org-tools=4.2.2

# Instaling nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install --yes nodejs

# Copying api side
COPY package.json /app/my-slate-api/
RUN cd /app/my-slate-api/ && npm install 
COPY . /app/my-slate-api/

# Copying node side
COPY ../my-slate/package.json /app/my-slate/
RUN cd /app/my-slate/ && npm install 
COPY ../my-slate /app/my-slate/


CMD ["supervisord", "-c", "/app/supervisord.conf"]
