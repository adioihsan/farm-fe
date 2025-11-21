
# Frontend Application — Vue 3, Vite, TypeScript, TailwindCSS

This repository contains the frontend application for the Farm Management System.  
The application is built with **Vue 3**, **Vite**, **TypeScript**, and **TailwindCSS**, with full Docker and CI/CD support for development and production.

---

## Overview

The frontend provides:

- Vue 3 Composition API  
- Vite build system  
- TypeScript  
- TailwindCSS styling  
- Vue Router  
- Pinia state management  
- API integration using Axios  
- Component utilities and UI helpers  
- Docker image for production  
- Development Docker environment  
- CI/CD pipeline with GitHub Actions + GHCR  

---

## Project Structure

```
japfa-fe/
│── src/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── stores/
│   ├── utils/
│   ├── main.ts
│── public/
│── dist/                    # Production build output
│── Dockerfile               # Production container
│── .env.production          # Production env variables
│── .env.development         # Development env variables
│── package.json
│── tsconfig.json
│── vite.config.ts
│── README.md
```

---

## Environment Variables

Vite requires environment variables to start with `VITE_`.

### `.env.development`

```
VITE_API_URL=http://localhost:7000
VITE_ENV=development
```

### `.env.production`

```
VITE_API_URL=https://api.ms27.my.id
VITE_ENV=production
```

---

## Local Development

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Production Build

Build optimized production files:

```
npm run build
```

Preview build output:

```
npm run preview
```

---

## Development Using Docker

A development Docker environment is available.

```
docker compose -f docker-compose.dev.yml up --build
```

Stop:

```
docker compose -f docker-compose.dev.yml down
```

Files in the host machine are mounted into the container for fast live reload during development.

---

## Production Using Docker

The production container serves the `dist` folder using Nginx.

Build locally:

```
docker build -t japfa-fe .
```

Run:

```
docker run -p 8080:80 japfa-fe
```

---

## CI/CD Pipeline

The frontend deployment uses:

- Dockerfile  
- GitHub Actions workflow  
- GitHub Container Registry (GHCR)  
- VPS deployment via SSH  

Pipeline flow:

1. GitHub Actions builds the Docker image  
2. Pushes it to GHCR  
3. Connects to VPS  
4. Pulls the latest FE image  
5. Recreates the container using docker compose  

VPS FE deployment folder:

```
/opt/japfa-fe/
│── docker-compose.yml
```

Manual redeploy:

```
docker compose pull
docker compose up -d --force-recreate
```

---

## Useful Commands

| Command | Description |
|--------|-------------|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |
| docker build | Build Docker image |
| docker run | Run Docker container |

---

