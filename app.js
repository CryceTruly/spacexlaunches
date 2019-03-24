const express=require('express');
const graphqlHTTP=require('express-graphql');
const cors=require('cors');
const app=express();
const path=require("path");


//cors middleware
app.use(cors())


const schema=require('./schema.js');
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));

app.use(express.static('public'))
;
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'));

})

//port
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('Server running'))
