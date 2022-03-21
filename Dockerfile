FROM node:16
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
# ENTRYPOINT ["bin/bash"]
COPY . ./
CMD ["npm", "run", "start"]
