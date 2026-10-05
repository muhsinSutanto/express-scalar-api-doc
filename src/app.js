import express from 'express'
import { apiReference } from '@scalar/express-api-reference'
import { openApiDocument } from './openapi.js'
import { healthRouter } from './routes/health.js'
import { usersRouter } from './routes/users.js'

export function createApp() {
  const app = express()

  app.use(express.json())

  app.get('/', (_req, res) => {
    res.redirect('/docs')
  })

  app.get('/openapi.json', (_req, res) => {
    res.json(openApiDocument)
  })

  app.use(
    '/docs',
    apiReference({
      url: '/openapi.json',
      theme: 'purple',
      metaData: {
        title: 'Express Scalar API',
        description: 'Dokumentasi API interaktif',
      },
    }),
  )

  app.use(healthRouter)
  app.use(usersRouter)

  app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.path} tidak ditemukan` })
  })

  return app
}
