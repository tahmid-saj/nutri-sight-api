# build (include dev dependencies):

# when we build, we're using the dev dependencies to do so
FROM node:20-alpine AS builder
WORKDIR /app

# copy and install dependencies
COPY package*.json ./
RUN npm install

# copy source and build
COPY . .
RUN npm run build

# create final runtime image (exclude installing dev dependencies)

# when we create the final runtime image, we're excluding dev dependencies to do so
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# copy build code
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
