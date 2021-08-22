function parseHexData(data: string): number {
	const arr = data.split(' ');

	if (arr[1].charAt(0) === 'f') {
		const x = parseInt(
			'0xffff' + arr[1].toString() + arr[0].toString(),
			16
		);

		return -((~x + 1) * 0.0625);
	} else if (arr[1].charAt(0) === '0') {
		return (
			parseInt('0x0000' + arr[1].toString() + arr[0].toString(), 16) *
			0.0625
		);
	}

	throw new Error('Cannot parse data');
}

function parseDecimalData(data: string) {
	const arr = data.split('\n');

	if (arr[0].indexOf('YES') > -1) {
		const output = data.match(/t=(-?(\d+))/);

		if (output == null) {
			return 0;
		}

		return Math.round(+output[1] / 100) / 10;
	} else if (arr[0].indexOf('NO') > -1) {
		throw new Error('Cannot get temperature');
	}
	
	throw new Error('Cannot get temperature');
}

const parsers = {
	hex: parseHexData,
	decimal: parseDecimalData,
	default: parseDecimalData
} as const;

export interface IParseDataOptions {
	parser?: keyof typeof parsers;
}

export function parseData(
	data: string,
	options?: IParseDataOptions
) {
	const parser = options?.parser ?? 'default';

	return parsers[parser](data);
}
