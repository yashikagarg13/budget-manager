module.exports = {
  facebookAuth: {
    display: "popup",
    clientID: "1544447702285346", // your App ID
    clientSecret: "2f94bd32ce637d81220903cbc7c467eb", // your App Secret
    callbackURL: "http://localhost:8080/api/authenticate/facebook/callback",
    profileFields: ['id', 'displayName', 'email'],
  },

}