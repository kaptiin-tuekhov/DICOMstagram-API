/* eslint import/no-extraneous-dependencies: "off",
no-use-extend-native/no-use-extend-native: "off" */
const fs = require('fs');
const Promise = require('bluebird');
const test = require('ava');
const magickImageConvert = require('../magickImageConvert');

Promise.promisifyAll(fs);

test('it should convert properly', async t => {
	const convertProm = magickImageConvert('CR-MONO1-10-chest.dcm', 'test.png');
	t.notThrows(convertProm);
	await convertProm;
	const {size} = await fs.statAsync('test.png');
	t.true(size === 189328);
	const pngBuff = await fs.readFileAsync('test.png');
	t.snapshot(pngBuff.toString()); // eslint-disable-line ava/use-t-well
});

test('it should error', t => {
	const convertProm = magickImageConvert('nonexistantfile', 'neveroutput');
	t.throws(convertProm);
});

test.after(async t => {
	await fs.unlinkAsync('test.png');
	t.throws(fs.statAsync('test.png'));
});
