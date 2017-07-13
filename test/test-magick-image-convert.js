/* eslint import/no-extraneous-dependencies: "off",
no-use-extend-native/no-use-extend-native: "off" */
const fs = require('fs');
const Promise = require('bluebird');
const test = require('ava');
const magickImageConvert = require('../magickImageConvert');

Promise.promisifyAll(fs);

test('it should convert properly', async t => {
	const convertProm = magickImageConvert('FluroWithDisplayShutter.dcm', 'test.png');
	t.notThrows(convertProm);
	await convertProm;
	const {size} = await fs.statAsync('test.png');
	console.log(size);
	t.true(size === 860456);
});

test('it should error', t => {
	const convertProm = magickImageConvert('image-000001.dcm', 'test.png');
	t.throws(convertProm);
});

test.after(async t => {
	await fs.unlinkAsync('test.png');
	t.throws(fs.statAsync('test.png'));
});
