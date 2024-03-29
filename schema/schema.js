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
const Allfiles = require('../models/allfiles');

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
//КОЛЛЕКЦИЯ ПОЛЬЗОВАТЕЛЕЙ
const AllFilesType = new GraphQLObjectType({
    name: 'Allfiles',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLString)},
        path: {type: new GraphQLNonNull(GraphQLString)}
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
        img: {
          type: AllFilesType,
          resolve(parent, args){
          return Allfiles.findById(parent.imgid);
        }},
        opsection: {
            type: OpsectionType,
            resolve(parent, args){
               return Opsection.findById(parent.opsectionid);
            }
        },
        titlepage: {type: GraphQLString},
        subtext_1: {type: GraphQLString},
        subtext_2: {type: GraphQLString},
        subtext_3: {type: GraphQLString},
        button_1: {type: GraphQLString},
        url_btn_1: {type: GraphQLString},
        button_2: {type: GraphQLString},
        url_btn_2: {type: GraphQLString},
        url: {type: GraphQLString},
    }),
});
//КОЛЛЕКЦИЯ БЛОКА ПРЕИМУЩЕСТВ ПРОДУКТОВОЙ СТРАНИЦЫ
const PrintsadvantagecardblockType = new GraphQLObjectType({
    name: 'Printsadvantagecardblocks',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        cart_1_img: {type: GraphQLString},
        cart_1_header: {type: GraphQLString},
        cart_1_text: {type: GraphQLString},
        cart_2_img: {type: GraphQLString},
        cart_2_header: {type: GraphQLString},
        cart_2_text: {type: GraphQLString},
        cart_3_img: {type: GraphQLString},
        cart_3_header: {type: GraphQLString},
        cart_3_text: {type: GraphQLString},
        url:{type: GraphQLString},
    }),
});
//КОЛЛЕКЦИЯ БЛОКА ПОРТФОЛИО ДЛЯ ПРОДУКТОВЫХ СТРАНИЦ
const ProductionportfoliocartType = new GraphQLObjectType({
    name: 'Productionportfoliocarts',
    fields: () => ({
        id: {type: GraphQLID},
        img: {type: GraphQLString},
        header: {type: GraphQLString},
        text: {type: GraphQLString},
        url: {type: GraphQLString}
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
        addPrintspreviewblock:{
          type: PrintspreviewblocksType,
          args: {
            imgid: {type: GraphQLString},
            opsectionid: {type: GraphQLString},
            titlepage: {type: GraphQLString},
            subtext_1: {type: GraphQLString},
            subtext_2: {type: GraphQLString},
            subtext_3: {type: GraphQLString},
            button_1: {type: GraphQLString},
            url_btn_1: {type: GraphQLString},
            button_2: {type: GraphQLString},
            url_btn_2: {type: GraphQLString},
            url: {type: GraphQLString},
          },
          resolve(parent, args) {
              const printspreviewblock = new Printspreviewblocks({
                imgid: args.imgid,
                opsectionid: args.opsectionid,
                titlepage: args.titlepage,
                subtext_1: args.subtext_1,
                subtext_2: args.subtext_2,
                subtext_3: args.subtext_3,
                button_1: args.button_1,
                url_btn_1: args.url_btn_1,
                button_2: args.button_2,
                url_btn_2: args.url_btn_2,
                url: args.url
              });
              return printspreviewblock.save();
          }
        },
        addPrintsadvantagecardblock:{
          type: PrintsadvantagecardblockType,
          args: {
            title: {type: GraphQLString},
            cart_1_img: {type: GraphQLString},
            cart_1_header: {type: GraphQLString},
            cart_1_text: {type: GraphQLString},
            cart_2_img: {type: GraphQLString},
            cart_2_header: {type: GraphQLString},
            cart_2_text: {type: GraphQLString},
            cart_3_img: {type: GraphQLString},
            cart_3_header: {type: GraphQLString},
            cart_3_text: {type: GraphQLString},
            url:{type: GraphQLString},
          },
          resolve(parent, args) {
              const printsadvantagecardblock = new Printsadvantagecardblocks({
                title: args.title,
                cart_1_img: args.cart_1_img,
                cart_1_header: args.cart_1_header,
                cart_1_text: args.cart_1_text,
                cart_2_img: args.cart_2_img,
                cart_2_header: args.cart_2_header,
                cart_2_text: args.cart_2_text,
                cart_3_img: args.cart_3_img,
                cart_3_header: args.cart_3_header,
                cart_3_text: args.cart_3_text,
                url: args.url
              });
              return printsadvantagecardblock.save();
          }
        },
        addProductionportfoliocart:{
          type: ProductionportfoliocartType,
          args: {
            img: {type: GraphQLString},
            header: {type: GraphQLString},
            text: {type: GraphQLString},
            url: {type: GraphQLString}
          },
          resolve(parent, args) {
              const productionportfoliocart = new Productionportfoliocarts({
                img: args.img,
                header: args.header,
                text: args.text,
                url: args.url
              });
              return productionportfoliocart.save();
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
        removePrintspreviewblock:{
          type: PrintspreviewblocksType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              return Printspreviewblocks.findByIdAndRemove(args.id);
          }
        },
        removePrintsadvantagecardblock:{
          type: PrintsadvantagecardblockType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              return Printsadvantagecardblocks.findByIdAndRemove(args.id);
          }
        },
        removeProductionportfoliocart:{
          type: ProductionportfoliocartType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              return Productionportfoliocarts.findByIdAndRemove(args.id);
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
        updateContactsPhone: {
          type: ContactsType,
          args: {
            id: { type: GraphQLID },
            title: {type: new GraphQLNonNull(GraphQLString) },
            type: {type: new GraphQLNonNull(GraphQLString) },
            context_1: {type: new GraphQLNonNull(GraphQLString) },
            context_2: {type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(parent, args) {
            return Contacts.findByIdAndUpdate(
              args.id,
              { $set: { title: args.title, type: args.type, context_1: args.context_1, context_2: args.context_2 } },
              { new: true }
            );
          }
        },
        updatePrintspreviewblock:{
          type: PrintspreviewblocksType,
          args: {
            id: { type: GraphQLID },
            imgid: {type: GraphQLString},
            opsectionid: {type: GraphQLString},
            titlepage: {type: GraphQLString},
            subtext_1: {type: GraphQLString},
            subtext_2: {type: GraphQLString},
            subtext_3: {type: GraphQLString},
            button_1: {type: GraphQLString},
            url_btn_1: {type: GraphQLString},
            button_2: {type: GraphQLString},
            url_btn_2: {type: GraphQLString},
            url: {type: GraphQLString},
          },
          resolve(parent, args) {
            return Printspreviewblocks.findByIdAndUpdate(
              args.id,
              { $set: { imgid: args.imgid,
                        opsectionid: args.opsectionid,
                        titlepage: args.titlepage,
                        subtext_1: args.subtext_1,
                        subtext_2: args.subtext_2,
                        subtext_3: args.subtext_3,
                        button_1: args.button_1,
                        url_btn_1: args.url_btn_1,
                        button_2: args.button_2,
                        url_btn_2: args.url_btn_2,
                        url: args.url}},
              { new: true }
            );
          }
        },
        updatePrintsadvantagecardblock:{
          type: PrintsadvantagecardblockType,
          args: {
            id: { type: GraphQLID },
            title: {type: GraphQLString},
            cart_1_img: {type: GraphQLString},
            cart_1_header: {type: GraphQLString},
            cart_1_text: {type: GraphQLString},
            cart_2_img: {type: GraphQLString},
            cart_2_header: {type: GraphQLString},
            cart_2_text: {type: GraphQLString},
            cart_3_img: {type: GraphQLString},
            cart_3_header: {type: GraphQLString},
            cart_3_text: {type: GraphQLString},
            url:{type: GraphQLString},
          },
          resolve(parent, args) {
            return Printsadvantagecardblocks.findByIdAndUpdate(
              args.id,
              { $set: {
                  title: args.title,
                  cart_1_img: args.cart_1_img,
                  cart_1_header: args.cart_1_header,
                  cart_1_text: args.cart_1_text,
                  cart_2_img: args.cart_2_img,
                  cart_2_header: args.cart_2_header,
                  cart_2_text: args.cart_2_text,
                  cart_3_img: args.cart_3_img,
                  cart_3_header: args.cart_3_header,
                  cart_3_text: args.cart_3_text,
                  url: args.url}},
              { new: true }
            );
          }
        },
        updateProductionportfoliocart:{
          type: ProductionportfoliocartType,
          args: {
            id: { type: GraphQLID },
            img: {type: GraphQLString},
            header: {type: GraphQLString},
            text: {type: GraphQLString},
            url: {type: GraphQLString}
          },
          resolve(parent, args) {
            return Productionportfoliocarts.findByIdAndUpdate(
              args.id,
              { $set: {
                img: args.img,
                header: args.header,
                text: args.text,
                url: args.url}},
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
        allfiles: {
            type: new GraphQLList(AllFilesType),
            resolve(parent, args) {
                return Allfiles.find({});
            }
        },
        imagefiles: {
          type: new GraphQLList(AllFilesType),
          args: { type: { type: GraphQLString } },
          resolve(parent, args) {
              return Allfiles.find({ type: args.type})
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
        printspreviewblocks: {
            type: new GraphQLList(PrintspreviewblocksType),
            resolve(parent, args) {
                return Printspreviewblocks.find({});
            }
        },
        printsadvantagecardblock: {
            type: PrintsadvantagecardblockType,
            args: { url: { type: GraphQLString } },
            resolve(parent, args) {
                return Printsadvantagecardblocks.findOne({ url: args.url})
            }
        },
        printsadvantagecardblocks: {
            type: new GraphQLList(PrintsadvantagecardblockType),
            resolve(parent, args) {
                return Printsadvantagecardblocks.find({})
            }
        },
        productionportfoliocart: {
            type: new GraphQLList(ProductionportfoliocartType),
            args: { url: { type: GraphQLString } },
            resolve(parent, args) {
                return Productionportfoliocarts.find({ url: args.url})
            }
        },
        productionportfoliocarts: {
            type: new GraphQLList(ProductionportfoliocartType),
            resolve(parent, args) {
                return Productionportfoliocarts.find({})
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
        contactsphone: {
            type: new GraphQLList(ContactsType),
            args: { type: { type: GraphQLString } },
            resolve(parent, args) {
                return Contacts.find({ type: args.type})
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
