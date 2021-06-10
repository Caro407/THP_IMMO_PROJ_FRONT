const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

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

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        url: 'http://localhost:3000',
      },
      images: {
        domains: ['localhost'],
      }
    }
  }

  return {
    env: {
      url: configs.api,
    },
    images: {
      domains: ['thp-immo-project-stage.herokuapp.com'],
    }
  }
}

export default configs;
