const Sequelize = require('Sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
// ,{
//   logging: false
// });

//may need to add object with type later on
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['open', 'closed'],
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: {
    route(){
      return this.urlTitle
    }
  },
  }
);

Page.beforeValidate(function(page) {
  page.urlTitle = generateUrlTitle(page.title);
})

function generateUrlTitle(title) {
  if (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  else {
    return Math.random().toString(36).substring(2, 7);
  }
}

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: 'author'})

module.exports = {
  Page: Page,
  User: User,
  db: db
};
