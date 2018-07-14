import path from 'path'
import express from 'express'
import cors from 'cors'

import router from './router'

const app = express()

const assets = express.static(path.join(__dirname, '../'))

app.use(cors())
app.use(assets)

app.get('*', router)

const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
