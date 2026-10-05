export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Express Scalar API',
    version: '1.0.0',
    description:
      'Contoh REST API yang didokumentasikan dengan Scalar. Endpoint Users memakai penyimpanan di memori dan akan reset setiap server dijalankan ulang.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development',
    },
  ],
  tags: [
    { name: 'Health', description: 'Status layanan' },
    { name: 'Users', description: 'Kelola data pengguna' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        operationId: 'getHealth',
        summary: 'Cek status layanan',
        responses: {
          200: {
            description: 'Layanan berjalan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Health' },
              },
            },
          },
        },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        operationId: 'listUsers',
        summary: 'Daftar pengguna',
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: false,
            description: 'Filter nama atau email (tidak peka huruf besar/kecil)',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Daftar pengguna',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        operationId: 'createUser',
        summary: 'Buat pengguna',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Pengguna dibuat',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: {
            description: 'Data tidak valid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        operationId: 'getUser',
        summary: 'Detail pengguna',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Pengguna ditemukan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          404: {
            description: 'Pengguna tidak ditemukan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      patch: {
        tags: ['Users'],
        operationId: 'updateUser',
        summary: 'Perbarui pengguna',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserPatch' },
            },
          },
        },
        responses: {
          200: {
            description: 'Pengguna diperbarui',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: {
            description: 'Data tidak valid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          404: {
            description: 'Pengguna tidak ditemukan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Users'],
        operationId: 'deleteUser',
        summary: 'Hapus pengguna',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          204: { description: 'Pengguna dihapus' },
          404: {
            description: 'Pengguna tidak ditemukan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Health: {
        type: 'object',
        required: ['status', 'timestamp'],
        properties: {
          status: { type: 'string', examples: ['ok'] },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
      User: {
        type: 'object',
        required: ['id', 'name', 'email'],
        properties: {
          id: { type: 'integer', examples: [1] },
          name: { type: 'string', examples: ['Ayu Pratama'] },
          email: { type: 'string', format: 'email', examples: ['ayu@example.com'] },
        },
      },
      UserInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', minLength: 1, examples: ['Budi Santoso'] },
          email: { type: 'string', format: 'email', examples: ['budi@example.com'] },
        },
      },
      UserPatch: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
        },
      },
      Error: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
