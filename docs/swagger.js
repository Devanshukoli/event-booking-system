import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Booking System API',
      version: '1.0.0',
      description: 'API for managing events, bookings, and user authentication',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
            },
          },
        },
        Event: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Event ID',
            },
            name: {
              type: 'string',
              description: 'Event name',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Event date',
            },
            capacity: {
              type: 'integer',
              description: 'Total capacity',
            },
            availableSeats: {
              type: 'integer',
              description: 'Available seats',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Booking ID',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            event: {
              $ref: '#/components/schemas/Event',
            },
            seats: {
              type: 'integer',
              description: 'Number of seats booked',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            password: {
              type: 'string',
              description: 'User password',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT token',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        CreateEventRequest: {
          type: 'object',
          required: ['name', 'date', 'capacity'],
          properties: {
            name: {
              type: 'string',
              description: 'Event name',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Event date (YYYY-MM-DD)',
            },
            capacity: {
              type: 'integer',
              minimum: 1,
              description: 'Event capacity',
            },
          },
        },
        UpdateEventRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Event name',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Event date (YYYY-MM-DD)',
            },
            capacity: {
              type: 'integer',
              minimum: 1,
              description: 'Event capacity',
            },
          },
        },
        EventsResponse: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: 'Total number of events',
            },
            page: {
              type: 'integer',
              description: 'Current page',
            },
            limit: {
              type: 'integer',
              description: 'Items per page',
            },
            events: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Event',
              },
            },
          },
        },
        BookingsResponse: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: 'Total number of bookings',
            },
            bookings: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Booking',
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['../routes/*.js'], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;