const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const Users = require('../models/users');
const Articles = require('../models/articles');

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        articles: {
            type: new GraphQLList(ArticlesType),
            resolve(parent, args) {
                //return articles.filter(article => article.authorID == parent.id);
                return Articles.find({ authorID: parent.id });
            }
        }
    })
});

const ArticlesType = new GraphQLObjectType({
    name: 'Articles',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        author: {
            type: UsersType,
            resolve(parent, args){
               // return users.find(user => user.id == parent.id)
               return Users.findById(parent.authorID);
            }
        }
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: {
            type: UsersType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Users.findById(args.id);
            }
        },
        article: {
            type: ArticlesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Articles.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UsersType),
            resolve(parent, args) {
                return Users.find({});
            }
        },
        articles: {
            type: new GraphQLList(ArticlesType),
            resolve(parent, args) {
                return Articles.find({});
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: Query
})