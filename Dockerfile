FROM node:alpine AS frontend
WORKDIR /frontend
COPY frontend/package.json .
RUN npm i
COPY frontend .
RUN npm run build

FROM node:alpine AS backend
WORKDIR /backend
COPY backend/package.json .
RUN npm i
COPY backend .
RUN npm run build

FROM node:alpine AS server
WORKDIR /server
COPY --from=frontend /frontend/dist ./static
COPY --from=backend /backend/dist .
COPY --from=backend /backend/node_modules ./node_modules
CMD node main.js
