FROM node:20-alpine

WORKDIR /app

COPY src ./src

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "src/sample.js"]
