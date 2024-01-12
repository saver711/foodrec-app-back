module.exports = ({ env }) => ({
    'users-permissions': {
      enabled: true,
      config: {
        jwt: {
          expiresIn: process.env.JWT_SECRET_EXPIRES,
        },
      },
    },
  });