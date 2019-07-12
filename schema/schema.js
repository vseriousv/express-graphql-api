const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// const users =  [
    // {id: 1, firstName: 'Bran', lastName: 'Stark'},
    // {id: 2, firstName: 'John', lastName: 'Snow'},
    // {id: 3, firstName: 'Briena', lastName: 'Tart'},
    // {id: 4, firstName: 'Daineris', lastName: 'Targarien'},
    // {id: 5, firstName: 'Batya', lastName: 'Dragons'}
// ];

// const articles =  [
//     {id: 1, title: 'Немного о главном', description: 'Пару слов о главном', numberLastDate: 50, authorID: 1},
//     {id: 2, title: 'Статья два', description: 'Важная статья', numberLastDate: 32, authorID: 1},
//     {id: 3, title: 'Еще одна статья', description: 'Это третья статья', numberLastDate: 28, authorID: 2},
//     {id: 4, title: '4 статьи это уже норм', description: 'Нормально так 4 статьи', numberLastDate: 20, authorID: 2},
//     {id: 5, title: 'Ну и на этом мы закончим', description: 'Последняя статья номер 5', numberLastDate: 5, authorID: 3},
//     {id: 6, title: 'а вот нет не закончим', description: 'Еще одна статья после последней', numberLastDate: 5, authorID: 4},
//     {id: 7, title: 'Давайте уже заканчивать статья 7', description: 'седьмая', numberLastDate: 5, authorID: 4},
//     {id: 8, title: 'Ну закончили или нет?!', description: 'фух, уже восемь статей', numberLastDate: 5, authorID: 5},
//     {id: 9, title: 'номер девять', description: 'ну и наконец последняя', numberLastDate: 5, authorID: 5}
// ];

const UsersType = new GraphQLObjectType({
    name: 'users',
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        articles: {
            type: new GraphQLList(ArticlesType),
            resolve(parent, args) {
                return articles.filter(article => article.authorID == parent.id);
            }
        }
    })
});

const ArticlesType = new GraphQLObjectType({
    name: 'articles',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        namberLastDate: {type: GraphQLInt},
        authorID: {
            type: UsersType,
            resolve(parent, args){
                return users.find(user => user.id == parent.id)
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
                return users.find(user => user.id == args.id);
            }
        },
        article: {
            type: ArticlesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return articles.find(article => article.id == args.id);
            }
        },
        users: {
            type: new GraphQLList(UsersType),
            resolve(parent, args) {
                return users;
            }
        },
        articles: {
            type: new GraphQLList(ArticlesType),
            resolve(parent, args) {
                return articles;
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: Query
})