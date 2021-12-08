import express from 'express'
import path from 'path'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

const config = require('../config.json')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

app.get('/login', (req, res) => {
  const url = new URL(config.authUrl)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('client_id', config.clientId)
  url.searchParams.append('redirect_uri', config.redirectUri)
  url.searchParams.append('acr_values', 'urn:connectid.com.au:loa:ip1.5:al2 urn:connectid.com.au:loa:ip2.5:al2')
  url.searchParams.append('scope', 'openid profile')
  // claims param example
  // url.searchParams.append('claims', JSON.stringify({id_token: {email: null}, userinfo: {email: null}}))
  url.searchParams.append('state', uuidv4())

  res.redirect(url.toString())
})

app.get('/cb', async (req, res) => {
  const callbackUrl = new URL(`${req.protocol}://${req.hostname}:${port}${req.originalUrl}`)
  const code = callbackUrl.searchParams.get('code')

  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('client_secret', config.clientSecret)
  params.append('code', code!)
  params.append('client_id', config.clientId)
  params.append('redirect_uri', config.redirectUri)

  try {
    const tokenResponse = await axios.post(config.tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const userInfoResponse = await axios.get(config.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,
      },
    })

    res.send(userInfoResponse.data)
  } catch (e) {
    console.log('Error in the callback', e)
    res.sendFile(path.join(__dirname, '../public', 'error.html'))
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
