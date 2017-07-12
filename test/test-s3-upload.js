const fs = require('fs');
const promise = require('bluebird');
const {S3} = require('aws-sdk');
const test = require('ava');
const s3Upload = require('../s3upload');

promise.promisifyAll(fs);
const {ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION} = process.env;
const params = {
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
	region: REGION
};
const s3 = new S3(params);

test('Should not throw', t => t.notThrows(s3Upload('s3test.png')));

test.after('cleanup', t => t.notThrows(s3.deleteObject({
	Bucket: 'np-dicom-pngs',
	Key: 's3test.png'
}).promise()));
