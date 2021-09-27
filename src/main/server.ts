import { mongoHelper } from '../infra/db/mongodb'
import { config as dotenv } from 'dotenv'
import app from './config/app'
dotenv()
mongoHelper.connect(process.env.MONGOURL)
  .then(async () => {
    app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
})
.catch(console.error)