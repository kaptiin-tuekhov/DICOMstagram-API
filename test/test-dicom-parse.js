/* eslint import/no-extraneous-dependencies: "off",
no-use-extend-native/no-use-extend-native: "off" */
const fs = require('fs');
const Promise = require('bluebird');
const test = require('ava');
const dicomParse = require('../dicomParse');

Promise.promisifyAll(fs);

test('returns parsed dicom', async t => {
	const buff = await fs.readFileAsync('FluroWithDisplayShutter.dcm');
	t.snapshot(dicomParse(buff)); // eslint-disable-line ava/use-t-well
});
