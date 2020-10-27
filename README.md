# Record-Listing

![NodeJS Workflow](https://github.com/ercang/record-listing/workflows/Node.js%20CI/badge.svg)


Record-Listing is a sample application to validate requests and fetch records from a Mongo database using Mongoose.

You can check the demo at https://ercang-record-listing.herokuapp.com/

```
// End point
https://ercang-record-listing.herokuapp.com/records

// Example POST request
{
    "startDate": "2000-01-01",
    "endDate": "2020-01-01",
    "minCount": 2000,
    "maxCount": 3000
}
```

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
