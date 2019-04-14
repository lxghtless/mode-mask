const defaultOptions = {
	autoBuild: true
};

const calcSum = nums => {
	return nums.reduce((total, num) => total + num);
};

class ModeMask {
	constructor(values, options = defaultOptions) {
		if (!Array.isArray(values)) {
			throw new TypeError('ModeMask values must be []');
		}

		if (values.length === 0) {
			throw new TypeError('ModeMask values length must be gt 0');
		}

		this._values = values;
		this._mask = {};
		if (options.autoBuild) {
			this.build();
		}
	}

	get values() {
		return this._values;
	}

	get mask() {
		return this._mask;
	}

	indexOf(index) {
		return this.mask[index];
	}

	build() {
		const vals = this.values;
		const valsLength = vals.length;
		let combo = '';
		let combos = [];
		let pw2s = [];
		let map = {};
		const valLen = 2 ** valsLength;

		for (let i = 0; i < valLen; i++) {
			combo = '';
			combos = [];
			pw2s = [];
			map = {};
			for (let j = 0; j < valsLength; j++) {
				const pw2 = i & (2 ** j);

				if (pw2) {
					combo += vals[j];
					combos.push(vals[j]);
					pw2s.push(pw2);
					map[vals[j]] = pw2;
				}
			}

			if (combo !== '') {
				const sum = calcSum(pw2s);
				const maskIndexItem = {
					sum,
					values: combos,
					nums: pw2s,
					map
				};

				this._mask[sum] = maskIndexItem;
			}
		}

		return this;
	}
}

module.exports = ModeMask;
