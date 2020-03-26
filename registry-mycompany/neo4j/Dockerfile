FROM neo4j:4.0.2

ENV NEO4J_AUTH=neo4j/letmein

ENV APOC_VERSION 4.0.0.4
ENV APOC_URI https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/${APOC_VERSION}/apoc-${APOC_VERSION}-all.jar
RUN wget -P /var/lib/neo4j/plugins ${APOC_URI}

ENV GRAPHQL_VERSION 3.5.15.5
ENV GRAPHQL_URI https://github.com/neo4j-graphql/neo4j-graphql/releases/download/${GRAPHQL_VERSION}/neo4j-graphql-${GRAPHQL_VERSION}.jar
RUN wget -P /var/lib/neo4j/plugins ${GRAPHQL_URI}

RUN chown neo4j /var/lib/neo4j/plugins/* -Rf
EXPOSE 7474 7473 7687

CMD ["neo4j"]
