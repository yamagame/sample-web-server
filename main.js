const { spawn } = require('child_process')
const express = require('express')
const app = express()
const port = 3093
const bodyParser = require('body-parser');

const childProcess = spawn('./detect.sh', [])

let latestFace = "なし"

childProcess.stdout.on('data', (chunk) => {
  let last = "なし"
  const t = chunk.toString().split("\n")
  t.filter(v => {
    return v != ""
  }).forEach(v => {
    last = v.trim()
  })
  latestFace = last
})

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw({ type: 'application/*' }))

let counter = 0

app.post('/face', (req, res) => {
  res.send({ status: 'OK', facename: latestFace });
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
