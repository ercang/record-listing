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


## Project Overview

The application uses JOI for input validation and it uses Mongoose for the database connection. All tests are implemented and these can be found in the /test folder. **Code coverage for tests is %98.**

### Server class
It implements the server class. It initializes objects for schema validation and database connection. Also starts the HTTP server for accepting requests. This class implements the HTTP server related functionality and uses RecordsFetcher class.

### MongooseDBAccess
DB Access class is written with Mongoose. It is possible to implement this layer with another technology when required. It is the actual class that retrieves records.

### RecordModel
Model and schema definition for record data

### RecordsFetcher
This uses a DB access object and schema validator to fetch records. It is possible to pass a different DB access object to make it work with different database technologies. This class is used by the Server class.

### SchemaValidator
This class validates a request input. It uses JOI for validation. Any future validation related methods can be added to this class.

## How to run in a Docker container
This application can be run in a docker container. Dockerfile is already provided.

```
# create docker image
docker build -t recordlisting .

# run docker image
docker run -p 3000:80 -d recordlisting

```
