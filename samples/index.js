// @ts-check

const sensor = require('../dist');

async function run() {
	const ids = await sensor.getSensors();

	console.log('Sensor IDs', ids);

	for await (const id of ids) {
		console.log(
			'Sensor ',
			id,
			' (decimal) :',
			await sensor.getTemperature(id)
		);

		console.log(
			'Sensor ',
			id,
			' (hex) :',
			await sensor.getTemperature(id, { parser: 'hex' })
		);
	}
}

run();
