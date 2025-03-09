FROM node:20-alpine

# dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl

WORKDIR /app
COPY . .
RUN npm install

# build
RUN npx oss-attribution-generator generate-attribution
RUN npx prisma generate
RUN npm run build

# run
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
CMD ["npm", "start"]
