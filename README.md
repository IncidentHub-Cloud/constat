<p align="center">
  <img alt="constat Logo" src="public/constat-logo.png" height="128" width="128">
</p>

# **constat**

## What is constat?
constat is a simple status page to list the running Docker containers on your local machine.

## Screenshots

![Main page](screenshots/main.png)

![Log viewer](screenshots/logs.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The port might be different if you have another Next project running on 3000.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running in a Container
constat can itself run in a container.

It needs `/var/run/docker.sock` to be mounted inside to be able to talk to the Docker daemon on the machine where its running.

```shell
docker run -p9001:3000 -v /var/run/docker.sock:/var/run/docker.sock <image>
```

Open [http://localhost:9001](http://localhost:3000) with your browser to see the result.
