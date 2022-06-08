# FHIR Client

Powered by Vue.js and Bootstrap 5 (offline)

## Steps

1 - Run server
2 - Run client

## How to run server

To run a local FHIR server we need to have docker installed and running
Once intalled the server can be run with

Pull latest server image and install. Run once

```
docker pull hapiproject/hapi:latest
```

Create and run container using downloaded image

```
docker run -p 8080:8080 hapiproject/hapi
```

This will spin up a web server that runs a spring boot server.
More on the server can be found on its [official documentation](https://hapifhir.io/hapi-fhir/docs/)

NB: The server persists data on a temp memory that does not persist across reboots

## How to run client

To run the client we need to have node.js installed and yarn
Once intalled the client can be run with

```
yarn
yarn serve
```

This will spin up a web server that runs vue.js on development mode
The code is live and reflects changes on save in this mode
