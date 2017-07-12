const {DynamoDB} = require('aws-sdk');

const {ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION} = process.env;
const params = {
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
	region: REGION
};
const db = new DynamoDB.DocumentClient(params);

module.exports = (dicomObj, imageName) => db.put({
	TableName: 'dicomStagram',
	Item: {
		id: imageName,
		headers: dicomObj
	}
}).promise();
