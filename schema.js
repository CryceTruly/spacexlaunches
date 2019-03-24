const {GraphQLObjectType,GraphQLInt,GraphQLSchema,GraphQLList,GraphQLString,GraphQLBoolean}=require('graphql');
const axios=require('axios');
const LaunchType=new GraphQLObjectType({
    name:'Launch',
    fields:()=>({
        flight_number:{type:GraphQLInt},
        flight_number: {
            type: GraphQLInt
        },
        mission_name: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLString
        },
        launch_success: {
            type: GraphQLBoolean
        },
        rocket:{
            type:RocketType
        }
        })
});

// ROCKET TYPE

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {
            type: GraphQLString
        },
        rocket_name: {
            type: GraphQLString
        },
        rocket_type: {
            type: GraphQLString
        }
    })
});

// root query

const RootQuery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        launches:{
            type:GraphQLList(LaunchType),
            resolve(parent,args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res=>res.data)
            }
        }

        ,
        launch:{
            type:LaunchType,
            args:{
                flight_number:{type:GraphQLInt}
            },
            resolve(parent,args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res=>res.data)
            }
        },

         rockets: {
                 type: GraphQLList(RocketType),
                 resolve(parent, args) {
                     return axios.get('https://api.spacexdata.com/v3/rockets')
                         .then(res => res.data)
                 }
             }

             ,
             rocket: {
                 type: RocketType,
                 args: {
                     id: {
                         type: GraphQLInt
                     }
                 },
                 resolve(parent, args) {
                     return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                         .then(res => res.data)
                 }
             },

    }
});


module.exports=new GraphQLSchema({
    query:RootQuery
});