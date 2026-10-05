import { createApp } from './app.js'

const port = Number(process.env.PORT) || 3000
const app = createApp()

app.listen(port, () => {
  console.log(`API          http://localhost:${port}`)
  console.log(`Dokumentasi  http://localhost:${port}/docs`)
  console.log(`OpenAPI      http://localhost:${port}/openapi.json`)
})
