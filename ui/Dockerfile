#In production you wouldn't serve the UI like this.
FROM node:10.15.2

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy in the source code
COPY . .

# Build the UI
RUN yarn build

# Tell `react-scripts` that it's not supposed
# to open a browser for us, because the proxy means
# we expose a different port to run on, mapping
# requests back into this container manually.
ENV BROWSER none

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
