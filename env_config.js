const env = process.env.ENV || 'production';

const configs = {
  development: {
    api: 'http://localhost:3005/',
  },
  staging: {
    api: 'https://thp-immo-project-stage.herokuapp.com/',
  },
  production: {
    api: 'https://thp-immo-project.herokuapp.com/',
  },
}[env];

export default configs;
