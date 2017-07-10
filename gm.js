const gm = require("gm").subClass({
  imageMagick: true
});
const fs = require("fs");
const writeStream = fs.createWriteStream("test.png");
const errStream = fs.createWriteStream("err.txt")
gm("./image-000001.dcm").stream((err, stdout, stderr) => {
  if (err) console.log(err)
  stdout.pipe(writeStream);
  stderr.pipe(errStream);
})