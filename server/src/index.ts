import { app } from './app'
import { dbConnect } from './db/dbConnect'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((err: unknown) => {
    console.log(`Error white connecting to database!`, err)
  })
