const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

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
      url: 'https://thp-immo-project-stage.herokuapp.com',
    },
    images: {
      domains: ['thp-immo-project-stage.herokuapp.com'],
    }
  }
}
