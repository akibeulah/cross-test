FROM gitpod/workspace-node:latest
COPY .nvmrc .nvmrc
RUN bash -c 'source $HOME/.nvm/nvm.sh && nvm install && nvm use && npm install -g npm@8.12.2'

RUN echo "nvm use &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
