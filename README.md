# GRANDstack Starter

This project is a starter for building a [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) application. There are two components to the starter, the UI application (a React app) and the API app (GraphQL server).

[![Hands On With The GRANDstack Starter](http://img.youtube.com/vi/rPC71lUhK_I/0.jpg)](http://www.youtube.com/watch?v=rPC71lUhK_I "Hands On With The GRANDstack Starter")

## Quickstart

### Docker Building images

#### Neo4J image
`docker build -t registry-mycompany-neo4j registry-mycompany/neo4j`

>   neo4j:3.5 \
    APOC_VERSION 3.5.0.1 \
    GRAPHQL_VERSION 3.5.0.1

>   **WARNING**
    \
    \
    This image has a peculiarity \
    \
    **ENV NEO4J_AUTH=neo4j/letmein** \
    \
    This means the password for neo4j is already 'letmein' \
    I **strongly** recommend you to change this! \
    and then change the variable NEO4J_PASSWORD \
    in the api container at docker-compose.yml


#### NodeJS image
`docker build -t registry-mycompany-neo4j registry-mycompany/neo4j`

>   NODE_VERSION 10.14.2 \
    YARN_VERSION 1.12.3 \
    SO: debian:jessie-slim \
    Final image size: 185MB


### Docker Compose

`docker-compose up -d`

>   jwilder/nginx-proxy:latest \
    api and ui use 80 port

### Extra steps

#### Changing your hosts (MAC AND LINUX)
You need to go to your /etc/hosts file and put the lines below:

```
127.0.0.1   mycompany-proxy.local.com \
127.0.0.1   mycompany-neo4j.local.com \
127.0.0.1   mycompany-api.local.com \
127.0.0.1   mycompany-ui.local.com
```

Now you can use the full address, and not the lame localhost:port

#### Changing neo4j password:

Go to: http://mycompany-neo4j.local.com:7474  
In order to change the neo4j password  

```
Username: neo4j
password: neo4j
```  

just create a new password and then change the variable  
NEO4J_PASSWORD  
in the api container at docker-compose.yml

`docker-compose up -d`

#### Seeding data into DB

`docker exec -it mycompany-api.local.com yarn run seedDb`

### Neo4j

You need a Neo4j instance, e.g. a [Neo4j Sandbox](http://neo4j.com/sandbox), a local instance via [Neo4j Desktop](https://neo4j.com/download), [Docker](http://hub.docker.com/_/neo4j) or a [Neo4j instance on AWS, Azure or GCP](http://neo4j.com/developer/guide-cloud-deployment) or [Neo4j Cloud](http://neo4j.com/cloud)

For schemas using the  `@cypher` directive (as in this repo) via [`neo4j-graphql-js`](https://github.com/neo4j-graphql/neo4j-graphql-js), you need to have the [APOC library](https://github.com/neo4j-contrib/neo4j-apoc-procedures) installed, which should be automatic in Sandbox, Cloud and is a single click install in Neo4j Desktop. If when using the Sandbox / cloud you encounter an issue where an error similar to `Can not be converted to long: org.neo4j.kernel.impl.core.NodeProxy, Location: [object Object], Path: users` appears in the console when running the React app, try installing and using Neo4j locally instead.

#### Sandbox 

A good, but old, tutorial can be found here: https://www.youtube.com/watch?v=rPC71lUhK_I


See [the project releases](https://github.com/BrenoMazieiro/grand-stack-starter/releases) for the changelog.

This project is licensed under the Apache License v2.
Copyright (c) 2018 Neo4j, Inc.
