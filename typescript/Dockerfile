FROM node:18

RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

COPY . . 

RUN pnpm install

ENTRYPOINT [ "pnpm" ]

CMD [ "start" ]
