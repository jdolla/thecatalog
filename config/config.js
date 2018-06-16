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
  expireTime: 1800,
};

const hashOpt = {
  saltRounds: 8,
};

module.exports = {
  tknOpt,
  hashOpt,
};
