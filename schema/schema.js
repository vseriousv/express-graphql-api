const graphql = require('graphql');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
        GraphQLBoolean  } = graphql;

const Users = require('../models/users');
const Articles = require('../models/articles');
const Contacts = require('../models/contacts');
const ComponentNavbar = require('../models/component_navbar');
const ComponentAdvantage = require('../models/component_advantage');
const Sections = require('../models/sections');
const Pages = require('../models/pages');
const Mpslides = require('../models/mpslides');
const Opsection = require('../models/opsections');
const News = require('../models/news');
const Printspreviewblocks = require('../models/printspreviewblocks');
const Printsadvantagecardblocks = require('../models/printsadvantagecardblocks');
const Productionportfoliocarts = require('../models/productionportfoliocarts');

//КОЛЛЕКЦИЯ СЕКЦИЙ ДЛЯ МОДУЛЯ "НАША ПРОДУКЦИЯ"
const OpsectionType = new GraphQLObjectType({
    name: 'opsection',
    fields: () => ({
        id: {type: GraphQLID},
        section_id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        text: {type: new GraphQLNonNull(GraphQLString)},
        classNameActive: {type: new GraphQLNonNull(GraphQLString)},
        valueCart: {
            type: new GraphQLList(OpsectitemType)
        },
        className: {type: new GraphQLNonNull(GraphQLString)}
    }),
});
//КОЛЛЕКЦИЯ ДОЧЕРНИХ ОБЪЕКТОВ ДЛЯ МОДУЛЯ "НАША ПРОДУКЦИЯ"
const OpsectitemType = new GraphQLObjectType({
    name: 'opsecitem',
    fields: () => ({
        img: {type: new GraphQLNonNull(GraphQLString)},
        hCart: {type: new GraphQLNonNull(GraphQLString)},
        pText: {type: new GraphQLNonNull(GraphQLString)}
    }),
});
//КОЛЛЕКЦИЯ СЛАЙДОВ ГЛАВНОЙ СТРАНИЦЫ
const MpslidesType = new GraphQLObjectType({
    name: 'Mpslides',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        image: {type: new GraphQLNonNull(GraphQLString)},
        firstHeader: {type: new GraphQLNonNull(GraphQLString)},
        secondHeader: {type: new GraphQLNonNull(GraphQLString)},
        button: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)}
    })
});
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
//КОЛЛЕКЦИЯ НОВОСТЕЙ
const NewsType = new GraphQLObjectType({
    name: 'News',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        text: {type: new GraphQLNonNull(GraphQLString)},
        tags: {type: new GraphQLNonNull(GraphQLString)},
        dateTimeCreate: {type: new GraphQLNonNull(GraphQLString)},
        dateTimeUpdate: {type: new GraphQLNonNull(GraphQLString)},
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
const ComponentsType = new GraphQLObjectType({
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
//ТИП ПРЕИМУЩЕСТВ
const AdvantageType = new GraphQLObjectType({
    name: 'advantage',
    fields: () => ({
      images: {type: new GraphQLNonNull(GraphQLString)},
      title: {type: new GraphQLNonNull(GraphQLString)},
      item1: {type: new GraphQLNonNull(GraphQLString)},
      item11: {type: new GraphQLNonNull(GraphQLString)},
      item111: {type: new GraphQLNonNull(GraphQLString)},
      item2: {type: new GraphQLNonNull(GraphQLString)},
      item22: {type: new GraphQLNonNull(GraphQLString)},
      item222: {type: new GraphQLNonNull(GraphQLString)},
      item3: {type: new GraphQLNonNull(GraphQLString)},
      item33: {type: new GraphQLNonNull(GraphQLString)},
      item333: {type: new GraphQLNonNull(GraphQLString)},
      item4: {type: new GraphQLNonNull(GraphQLString)},
      item44: {type: new GraphQLNonNull(GraphQLString)},
      item444: {type: new GraphQLNonNull(GraphQLString)}
    }),
});
//КОЛЛЕКЦИЯ БЛОКА ПРИВЕТСТВИЯ НА СТРАНИЦЕ ПЕЧАТНОЙ ПРОДУКЦИИ
const PrintspreviewblocksType = new GraphQLObjectType({
    name: 'Printspreviewblocks',
    fields: () => ({
        id: {type: GraphQLID},
        img: {type: new GraphQLNonNull(GraphQLString)},
        opsection: {
            type: OpsectionType,
            resolve(parent, args){
               return Opsection.findById(parent.opsectionid);
            }
        },
        titlepage: {type: new GraphQLNonNull(GraphQLString)},
        subtext_1: {type: new GraphQLNonNull(GraphQLString)},
        subtext_2: {type: new GraphQLNonNull(GraphQLString)},
        subtext_3: {type: new GraphQLNonNull(GraphQLString)},
        button_1: {type: new GraphQLNonNull(GraphQLString)},
        url_btn_1: {type: new GraphQLNonNull(GraphQLString)},
        button_2: {type: new GraphQLNonNull(GraphQLString)},
        url_btn_2: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)}
    }),
});
//КОЛЛЕКЦИЯ БЛОКА ПРЕИМУЩЕСТВ ПРОДУКТОВОЙ СТРАНИЦЫ
const PrintsadvantagecardblockType = new GraphQLObjectType({
    name: 'Printsadvantagecardblocks',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: new GraphQLNonNull(GraphQLString)},
        cart_1_img: {type: new GraphQLNonNull(GraphQLString)},
        cart_1_header: {type: new GraphQLNonNull(GraphQLString)},
        cart_1_text: {type: new GraphQLNonNull(GraphQLString)},
        cart_2_img: {type: new GraphQLNonNull(GraphQLString)},
        cart_2_header: {type: new GraphQLNonNull(GraphQLString)},
        cart_2_text: {type: new GraphQLNonNull(GraphQLString)},
        cart_3_img: {type: new GraphQLNonNull(GraphQLString)},
        cart_3_header: {type: new GraphQLNonNull(GraphQLString)},
        cart_3_text: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)}
    }),
});
//КОЛЛЕКЦИЯ БЛОКА ПОРТФОЛИО ДЛЯ ПРОДУКТОВЫХ СТРАНИЦ
const ProductionportfoliocartType = new GraphQLObjectType({
    name: 'Productionportfoliocarts',
    fields: () => ({
        id: {type: GraphQLID},
        img: {type: new GraphQLNonNull(GraphQLString)},
        header: {type: new GraphQLNonNull(GraphQLString)},
        text: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)}
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutattion',
    fields: {
        addPages:{
        type: PagesType,
        args: {
          name: {type: new GraphQLNonNull(GraphQLString)},
          text: {type: new GraphQLNonNull(GraphQLString)},
          sectionID: {type: new GraphQLNonNull(GraphQLString)},
          url: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parent, args) {
          const page = new Pages({
            name: args.name,
            text: args.text,
            sectionID: args.sectionID,
            url: args.url,
          });
          return page.save();
        }
      },
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
        updatePage:{
          type: PagesType,
          args: {
            id: { type: GraphQLID },
            name: {type: new GraphQLNonNull(GraphQLString)},
            text: {type: new GraphQLNonNull(GraphQLString)},
            sectionID: {type: new GraphQLNonNull(GraphQLString)},
            url: {type: new GraphQLNonNull(GraphQLString)}
          },
          resolve(parent, args) {
            return Pages.findByIdAndUpdate(
              args.id,
              { $set: { name: args.name, text: args.text, sectionID: args.sectionID, url: args.url}},
              { new: true }
            );
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
        page: {
            type: PagesType,
            args: { url: { type: GraphQLString } },
            resolve(parent, args) {
                return Pages.findOne({ url: args.url})
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
        printspreviewblock: {
            type: PrintspreviewblocksType,
            args: { url: { type: GraphQLString } },
            resolve(parent, args) {
                return Printspreviewblocks.findOne({ url: args.url})
            }
        },
        printsadvantagecardblock: {
            type: PrintsadvantagecardblockType,
            args: { url: { type: GraphQLString } },
            resolve(parent, args) {
                return Printsadvantagecardblocks.findOne({ url: args.url})
            }
        },
        productionportfoliocart: {
            type: new GraphQLList(ProductionportfoliocartType),
            args: { url: { type: GraphQLString } },
            resolve(parent, args) {
                return Productionportfoliocarts.find({ url: args.url})
            }
        },
        news: {
            type: new GraphQLList(NewsType),
            resolve(parent, args) {
                return News.find({});
            }
        },
        mpslides: {
            type: new GraphQLList(MpslidesType),
            resolve(parent, args) {
                return Mpslides.find({});
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
            type: new GraphQLList(ComponentsType),
            resolve(parent,args) {
                return ComponentNavbar.find({});
            }
        },
        componentAdvantage: {
            type: AdvantageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ComponentAdvantage.findById(args.id);
            }
        },
        opsection: {
            type: new GraphQLList(OpsectionType),
            resolve(parent,args) {
                return Opsection.find({});
            }
        },
    })
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})
