const test = require('ava');
const {DynamoDB} = require('aws-sdk');
const dynamoDBUpload = require('../dynamoDBUpload');

const {ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION} = process.env;
const params = {
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
	region: REGION
};
const db = new DynamoDB.DocumentClient(params);

test('upload', t => t.notThrows(dynamoDBUpload({
	sampleHeader: 'sampleValue'
}, 'test')));

test.after('cleanup', t => t.notThrows(db.delete({
	TableName: 'dicomStagram',
	Key: {
		id: 'test'
	}
}).promise().catch(err => console.error(err))));
