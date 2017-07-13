'use strict';
const fs = require('fs');
const promise = require('bluebird');
const {send, buffer, createError} = require('micro');
const uuid = require('uuid/v4');
const dicomParse = require('./dicomParse');
const dynamoDBUpload = require('./dynamoDBUpload');
const magickImageConvert = require('./magickImageConvert');
const s3upload = require('./s3upload');

promise.promisifyAll(fs);

module.exports = async (req, res) => {
	const buf = await buffer(req, {limit: '5mb'});
	const id = uuid();
	const parseProm = parseAndUploadDB(buf, id);
	const convertProm = convertAndUploadS3(buf, id);
	try {
		await promise.all([parseProm, convertProm]);
		const dcmEraseProm = fs.unlinkAsync(`${id}.dcm`);
		const pngEraseProm = fs.unlinkAsync(`${id}.png`);
		await promise.all([dcmEraseProm, pngEraseProm]);
		send(res, 200, `created ${id}`);
	} catch (err) {
		throw createError(400, `Error: ${err.message}`, err);
	}
};

async function parseAndUploadDB(buffer, id) {
	try {
		const obj = dicomParse(buffer);
		return await dynamoDBUpload(obj, id);
	} catch (err) {
		throw new Error(err);
	}
}

async function convertAndUploadS3(buffer, id) {
	await fs.writeFileAsync(`${id}.dcm`, buffer);
	await magickImageConvert(`${id}.dcm`, `${id}.png`);
	return await s3upload(`${id}.png`);
}
