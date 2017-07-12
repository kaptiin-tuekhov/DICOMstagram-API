const {spawn} = require('child_process');

const child = spawn('magick', ['CR-MONO1-10-chest.dc', 'test.png']);

child.on('exit', (code, signal) => {
	console.log(`child process exited with code ${code} and signal ${signal}`);
});

child.stderr.on('data', data => {
	console.log(`stderr: ${data}`);
});
