const express = require('express')
const app = express()
const port = 3093
const bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw({ type: 'application/*' }))

let counter = 0

app.post('/face', (req, res) => {
  console.log(req.body);
  switch (counter) {
    case 0:
      res.send({ status: 'OK', callname: "太郎さん" });
      break
    case 1:
      res.send({ status: 'OK', callname: "次郎さん" });
      break
  }
  counter++
  counter = counter % 2
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})