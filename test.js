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

test(async t => {
	const service = micro(app);
	const url = await listen(service);
	const buffer = await fs.readFileAsync('FluroWithDisplayShutter.dcm');
	const res = await got.post(url, {
		body: buffer
	});
	t.is(res.statusCode, 200);
});
