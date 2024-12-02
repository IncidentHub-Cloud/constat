FROM alpine
ENV NODE_ENV=production
RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build
CMD ["npm", "start"]