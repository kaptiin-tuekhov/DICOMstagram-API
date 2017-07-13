'use strict';

const fs = require('fs');
const promise = require('bluebird');
const listen = require('test-listen');
const micro = require('micro');
const test = require('ava');
const got = require('got');

promise.promisifyAll(fs);
require('async-to-gen/register')({includes: /index\.js$/});
const app = require('./'); // eslint-disable-line import/order

test('service', async t => {
	const service = micro(app);
	const url = await listen(service);
	const buffer = await fs.readFileAsync('FluroWithDisplayShutter.dcm');
	const res = await got.post(url, {
		body: buffer
	});
	t.is(res.statusCode, 200);
});

test('parse error', async t => {
	const service = micro(app);
	const url = await listen(service);
	const buffer = await fs.readFileAsync('CR-MONO1-10-chest.dcm');
	try {
		await got.post(url, {
			body: buffer
		});
	} catch (err) {
		const actual = err.response.body;
		t.true(actual === 'Error: dicomParser.readPart10Header: DICM prefix not found at location 132 - this is not a valid DICOM P10 file.');
	}
});

test('convert error', async t => {
	const service = micro(app);
	const url = await listen(service);
	const buffer = await fs.readFileAsync('image-000001.dcm');
	try {
		await got.post(url, {
			body: buffer
		});
	} catch (err) {
		const actual = err.response.body;
		t.true(actual.includes('unable to open image'));
	}
});
