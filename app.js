const express = require('express');
const config = require('./src/configs/configs');
const { ApolloServer } = require('apollo-server-express')
// TODO mongoose
const mongoose = require('mongoose')

const mongoDataMethods = require('./src/controllers/dataMethods')
//TODO apollo server
const typeDefs = require('./src/schemas/schema')
const resolvers = require('./src/graphql/resolvers')
const app = express();

// 

// TODO connect mongodb
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        console.log('🍀 connected data mongodb ✅')
    })
    .catch((error) => {
        console.log('error data mongodb ❌')
        process.exit(1)
    });
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
})
server.applyMiddleware({ app })


// TODO get(/) and start server
app.get('/', async (req, res) => {
    res.json("hello world!");
})

app.listen(config.server.port, () => {
    console.log(`🚀 Express server started on port: ${config.server.port} ✅ `);
    console.log(`🚀 ApolloServer already at` + ` http://localhost:${config.server.port}${server.graphqlPath} ✅ ✅ `)
    console.log(`🚀 Server already a http://${config.server.hostname}:${config.server.port} ✅ ✅ ✅`)
    console.log(`🚀 https://cloud.mongodb.com/v2/6069bc834e865c6b1f43a400#metrics/replicaSet/6069bd87ed7de870c1f0ebe8/explorer `)
})
