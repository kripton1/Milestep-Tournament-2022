const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = "ZUJmQYDirwBf64FXhI3QDojvS9Yq8I62";
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const ivr = iv.toString("hex");
  const content = encrypted.toString("hex");
  return ivr+'/'+content;
};

const decrypt = (hash) => {
  const ivr = hash.split('/')[0];
  const content = hash.split('/')[1];

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivr, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
