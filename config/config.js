const fs = require('fs');

function getPrivate() {
  if (process.env.privateKey) {
    return process.env.privateKey;
  }

  return fs.readFileSync('./config/devkey').toString();
}

function getPublic() {
  if (process.env.publicKey) {
    return process.env.publicKey;
  }

  return fs.readFileSync('./config/devkey.pem').toString();
}

// token Options
const tknOpt = {
  keys: {
    private: getPrivate(),
    public: getPublic(),
  },
  expireTime: 3600,
};

const hashOpt = {
  saltRounds: 8,
};

const cookieOpt = {
  maxAge: 3600000,
  secure: false,
  httpOnly: true,
}

const mongoConn = process.env.mongodb || "mongodb://localhost/thecatalog";

module.exports = {
  tknOpt,
  hashOpt,
  cookieOpt,
  mongoConn
};
