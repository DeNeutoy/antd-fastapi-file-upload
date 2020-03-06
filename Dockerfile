FROM node:10.15.2

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy in the source code
COPY . .

# This tells build scripts and libraries that we're in development, so they
# can include stuff that's helpful for debugging even if it's a tad slower.
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ARG BABEL_ENV=development
ENV BABEL_ENV $BABEL_ENV

# Build the UI
RUN yarn build

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
