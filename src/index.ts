'use strict';

import * as FS from 'fs';
import * as Util from 'util';
import * as Parsers from './parsers';

const readFile = Util.promisify(FS.readFile);

const W1_FILE = '/sys/bus/w1/devices/w1_bus_master1/w1_master_slaves';

export async function getSensors(): Promise<string[]> {
	const data = await readFile(W1_FILE, 'utf8');

	const parts = data.split('\n');

	parts.pop();

	return parts;
}

export async function getTemperature(
	sensor: string,
	options?: Parsers.IParseDataOptions 
): Promise<number> {
	const data = await readFile(
		`/sys/bus/w1/devices/${sensor}/w1_slave`,
		'utf8'
	);

	return Parsers.parseData(data, options);
}
