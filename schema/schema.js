const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean} = graphql;

const Users = require('../models/users');
const Articles = require('../models/articles');
const Contacts = require('../models/contacts');
const ComponentNavbar = require('../models/component_navbar');
const Sections = require('../models/sections');
const Pages = require('../models/pages');

//КОЛЛЕКЦИЯ СТРАНИЦ САЙТА
const PagesType = new GraphQLObjectType({
    name: 'Pages',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        text: {type: new GraphQLNonNull(GraphQLString)},
        sectionID: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)}
    })
});
//КОЛЛЕКЦИЯ РАЗДЕЛОВ САЙТА
const SectionsType = new GraphQLObjectType({
    name: 'Sections',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        viewMagaMenu: {type: new GraphQLNonNull(GraphQLBoolean)},
        pages: {
            type: new GraphQLList(PagesType),
            resolve(parent, args) {
                return Pages.find({ sectionID: parent.id });
            }
        }
    })
});
//КОЛЛЕКЦИЯ ПОЛЬЗОВАТЕЛЕЙ
const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)},
        articles: {
            type: new GraphQLList(ArticlesType),
            resolve(parent, args) {
                return Articles.find({ authorID: parent.id });
            }
        }
    })
});
//КОЛЛЕКЦИЯ СТАТЕЙ
const ArticlesType = new GraphQLObjectType({
    name: 'Articles',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: UsersType,
            resolve(parent, args){
               return Users.findById(parent.authorID);
            }
        }
    }),
});
//КОЛЛЕКЦИЯ КОНТАКТОВ
const ContactsType = new GraphQLObjectType({
    name: 'Contacts',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLString)},
        context_1: {type: new GraphQLNonNull(GraphQLString)},
        context_2: {type: new GraphQLNonNull(GraphQLString)}
    })
});
//КОЛЛЕКЦИЯ КОМПОНЕНТОВ
const ComponentNavbarType = new GraphQLObjectType({
    name: 'components',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        menu_items: {
            type: new GraphQLList(NavbarType)
        }
    }),
});
//ТИП NAVBAR
const NavbarType = new GraphQLObjectType({
    name: 'navbar',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        child: {type: new GraphQLNonNull(GraphQLString)},
        link: {type: new GraphQLNonNull(GraphQLString)}
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
        pages: {
            type: new GraphQLList(PagesType),
            resolve(parent, args) {
                return Pages.find({});
            }
        },
        sections: {
            type: new GraphQLList(SectionsType),
            resolve(parent, args) {
                return Sections.find({});
            }
        },
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
        },
        contacts: {
            type: new GraphQLList(ContactsType),
            resolve(parent, args) {
                return Contacts.find({});
            }
        },
        componentNavbar: {
            type: new GraphQLList(ComponentNavbarType),
            resolve(parent,args) {
                return ComponentNavbar.find({});
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})