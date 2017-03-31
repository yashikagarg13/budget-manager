module.exports = {
  facebookAuth: {
    display: "popup",
    clientID: "1544447702285346", // your App ID
    clientSecret: "2f94bd32ce637d81220903cbc7c467eb", // your App Secret
    callbackURL: "http://localhost:8080/api/authenticate/facebook/callback",
    profileFields: ['id', 'displayName', 'email'],
  },
  googleAuth: {
    clientID: "928341289393-m2uakjnrv94oem0lddt93913vtteg42d.apps.googleusercontent.com",
    clientSecret: "6rwlMo8AaYBk0xYySjMilHm-",
    callbackURL: "http://localhost:8080/api/authenticate/google/callback",
  }
}