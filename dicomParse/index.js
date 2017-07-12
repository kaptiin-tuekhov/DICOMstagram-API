const dicom = require('dicom-parser');
const dictionary = require('./data-dict');

module.exports = buffer => {
	const dataSet = dicom.parseDicom(buffer);
	const obj = dicom.explicitDataSetToJS(dataSet);
	const output = {};
	Object.keys(obj).forEach(key => {
		const dictKey = `(${key.slice(1, 5)},${key.slice(5)})`;
		try {
			const {name} = dictionary[dictKey];
			output[name] = obj[key];
		} catch (err) {
			output[key] = obj[key];
		}
	});
	return output;
};
