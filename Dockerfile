FROM node:22-alpine3.21 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.27.0-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Create a volume for the Nginx configuration
VOLUME ["/etc/nginx/conf.d"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
