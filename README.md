# Record-Listing
Record-Listing is a sample application to validate requests and fetch records from a Mongo database using Mongoose.

![NodeJS Workflow](https://github.com/ercang/record-listing/blob/main/.github/workflows/node.js.yml/badge.svg)


You can check the demo at [link will be updated].


## How to run
```
# Run tests
npm run test

# Run linter
npm run lint

# Start server
npm start

```

## How to run in a Docker container
This application can be run in a docker container. Dockerfile is already provided.

```
# create docker image
docker build -t recordlisting .

# run docker image
docker run -p 3000:80 -d recordlisting

```
