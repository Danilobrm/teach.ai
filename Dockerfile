FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY prisma ./prisma

COPY .env ./

RUN npm run prisma:generate
# RUN npm run prisma:deploy

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]
