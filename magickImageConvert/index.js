const {spawn} = require('child_process');

const magickImageConvert = (input, output) => new Promise((resolve, reject) => {
	const child = spawn('magick', [input, output]);
	const err = [];
	child.on('exit', code => {
		if (code === 0) {
			resolve();
		} else {
			reject({
				message: err.join(`\n`)
			});
		}
	});
	child.stderr.on('data', data => {
		err.push(data);
	});
});

module.exports = magickImageConvert;
