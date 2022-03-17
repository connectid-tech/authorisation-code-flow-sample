# 🔗 authorisation-code-flow-sample
This project is a Node.js/Express app that implements the OpenID Connect (OIDC) Authorisation Code Flow. 

## Running on your machine
First thing you need to do is update your `config.json` file with your Client ID, Redirect URI and Secret:
```json
{
  "authUrl": "https://broker.sandbox.connectid.com.au/broker/oidc/authorization",
  "tokenUrl": "https://broker.sandbox.connectid.com.au/broker/oidc/token",
  "userInfoUrl": "https://broker.sandbox.connectid.com.au/broker/oidc/userinfo",
  "clientId": "YOUR_CLIENT_ID",
  "redirectUri": "YOUR_REDIRECT_URI",
  "clientSecret": "YOUR_CLIENT_SECRET"
}
```

Then install the project dependencies:

```
npm i
```

After the dependencies are installed you can run the app executing:

```
npm start
```

It will start the app on `http://localhost:8080`. Once the app is loaded on your browser you should see a login button.

When the login button is clicked the app will be redirected to the Identity Provider Selection page. Follow the steps below to proceed:

1. Select the `Reference ISP` provider.
1. Log in with our test identity credentials.
1. Agree sharing the data on the consent page.

The app should show a json with the user requested data. E.g.:

```json
{
  "sub": "201092f0-9720-4a91-9ff5-cc411621bb22",
  "aud": "paCo4LGT7VeCdwx88wzQxQ",
  "birthdate": "1982-07-25",
  "prefix": "Dr",
  "iss": "https://broker.sandbox.connectid.com.au/broker",
  "name": "Dr Jessica Anne Miller",
  "middle_name": "Anne",
  "given_name": "Jessica",
  "consent": {
    "type": "web",
    "timestamp": "2021-11-29T00:30:39.749Z",
    "granted": "ongoing"
  },
  "family_name": "Miller"
}
```
If there is any error during the process the app will log to terminal and display an error page with the message:

```
There was an internal error. Check the log.
```
