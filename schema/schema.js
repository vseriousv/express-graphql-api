const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;

const Users = require('../models/users');
const Articles = require('../models/articles');

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)},
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
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: UsersType,
            resolve(parent, args){
               // return users.find(user => user.id == parent.id)
               return Users.findById(parent.authorID);
            }
        }
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutattion',
    fields: {
        addUser: {
            type: UsersType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const user = new Users({
                    firstName: args.firstName,
                    lastName: args.lastName,
                });
                return user.save();
            }
        },
        addArticle: {
            type: ArticlesType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                authorID: {type: GraphQLID},
            },
            resolve(parent, args) {
                const user = new Articles({
                    title: args.title,
                    description: args.description,
                    authorID: args.authorID
                });
                return user.save();
            }
        },
        removeUser: {
            type: UsersType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Users.findByIdAndRemove(args.id);
            }
        },
        removeArticle: {
            type: ArticlesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Articles.findByIdAndRemove(args.id);
            }
        },
        updateUser: {
            type: UsersType,
            args: { 
                id: { type: GraphQLID },
                firstName: {type: new GraphQLNonNull(GraphQLString) },
                lastName: {type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Users.findByIdAndUpdate(
                    args.id,
                    { $set: { firstName: args.firstName, lastName: args.lastName} },
                    { new: true }
                );
            }
        },
        updateArticle: {
            type: ArticlesType,
            args: { 
                id: { type: GraphQLID },
                title: {type: new GraphQLNonNull(GraphQLString) },
                description: {type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Articles.findByIdAndUpdate(
                    args.id,
                    { $set: { title: args.title, description: args.description} },
                    { new: true }
                );
            }
        },
    }
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
    query: Query,
    mutation: Mutation,
})