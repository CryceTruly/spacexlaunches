const express=require('express');
const graphqlHTTP=require('express-graphql');
const cors=require('cors');
const app=express();



//cors middleware
app.use(cors())


const schema=require('./schema.js');
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));


//port
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('Server running'))
