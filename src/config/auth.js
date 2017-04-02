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
  },
  sendEmail: {
    auth: {
      type: "OAuth2",
      user: "kygclub4u@gmail.com",
      clientId: "928341289393-m2uakjnrv94oem0lddt93913vtteg42d.apps.googleusercontent.com",
      clientSecret: "6rwlMo8AaYBk0xYySjMilHm-",
      refreshToken: "1/QJ5sZCEzMEUwqU7M69Vbe00MbHofgyXPAveIZrwSPz8",
      accessToken: "ya29.GlshBJ7vFZQUaSsk9wSVx92UVQv2oAaXuEF9j0qdiE7oyTw_fy6WuxOXImelFXjc2pHV-_ElbrroYlz9TF48iQgaOtKBHdZGaJ8icYrYkIIg9swwvuE8fns4_Esz",
      expires: 1484314697598,
    },
    senderName: "KYGClub",
  },
}