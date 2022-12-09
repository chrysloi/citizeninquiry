const user = {
  '/api/users': {
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      description: 'Get all users',
      operationId: 'getUsers',
      produces: ['application/json'],
      parameters: [
        {
          name: 'userId',
          in: 'query',
          description: 'User ID',
          required: false,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'successful operation',
        },
        400: {
          description: 'Invalid ID supplied',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  '/api/users/createuser': {
    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Created user object',
          required: true,
        },
      ],
      responses: {
        201: {
          description: 'User created',
        },
        400: {
          description: 'Invalid input',
        },
        409: {
          description: 'User already exists',
        },
      },
    },
  },
};

module.exports = user;
