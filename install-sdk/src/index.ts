import express from 'express'
import bodyParser from 'body-parser'
import {
  run as runTailwindRecipe,
} from './recipes/tailwind'

const app = express()
app.use(bodyParser.json())
const port = 8080

// {
//   recipe: 'prisma',
//   data: { ... }
// }


app.post('/', (req, res) => {
  console.log(req.body)
  //const { recipe, data }: { recipe: string, data: any } = req.body

  runTailwindRecipe()




  res.send('Done')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
