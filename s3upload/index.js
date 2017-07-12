const fs = require('fs');
const promise = require('bluebird');
const {S3} = require('aws-sdk');

promise.promisifyAll(fs);
const {ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION} = process.env;
const params = {
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
	region: REGION
};
const s3 = new S3(params);

module.exports = async filepath => {
	const buffer = await fs.readFileAsync(filepath);
	return s3.putObject({
		Bucket: 'np-dicom-pngs',
		Key: filepath,
		Body: buffer
	}).promise();
};
