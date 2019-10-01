const test = require('ava');
const ModeMask = require('.');

test('ModeMask instance includes expected', t => {
	const modes = {
		READ: 1,
		WRITE: 2,
		DELETE: 4,
		AUTO_CREATE: 8
	};

	const modeMask = new ModeMask(Object.keys(modes));

	// Expected modes
	t.truthy(modeMask.indexOf(modes.READ));
	t.truthy(modeMask.indexOf(modes.WRITE));
	t.truthy(modeMask.indexOf(modes.DELETE));
	t.truthy(modeMask.indexOf(modes.AUTO_CREATE));
});

test('ModeMask instance includes expected modes combinations', t => {
	const modes = {
		READ: 1,
		WRITE: 2,
		DELETE: 4,
		AUTO_CREATE: 8
	};

	const modeMask = new ModeMask(Object.keys(modes));

	// Expected mode combinations
	t.truthy(modeMask.indexOf(modes.READ + modes.DELETE));
	t.truthy(modeMask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE));
	t.truthy(modeMask.indexOf(modes.READ + modes.WRITE + modes.AUTO_CREATE));
});

test('ModeMask instance does\'t include unexpected modes', t => {
	const modes = {
		READ: 1,
		WRITE: 2,
		DELETE: 4,
		AUTO_CREATE: 8
	};

	const modeMask = new ModeMask(Object.keys(modes));

	// Unexpected mode
	t.falsy(modeMask.indexOf(modes.READ + modes.DELETE + 16));
});

test('ModeMask instance should not build if autoBuild: false in options', t => {
	const modes = {
		READ: 1,
		WRITE: 2,
		DELETE: 4,
		AUTO_CREATE: 8
	};

	const modeMask = new ModeMask(Object.keys(modes), {autoBuild: false});

	// Expected modes before build
	t.falsy(modeMask.indexOf(modes.READ));
	t.falsy(modeMask.indexOf(modes.WRITE));
	t.falsy(modeMask.indexOf(modes.DELETE));
	t.falsy(modeMask.indexOf(modes.AUTO_CREATE));

	modeMask.build();

	// Expected modes after build
	t.truthy(modeMask.indexOf(modes.READ));
	t.truthy(modeMask.indexOf(modes.WRITE));
	t.truthy(modeMask.indexOf(modes.DELETE));
	t.truthy(modeMask.indexOf(modes.AUTO_CREATE));
});

test('ModeMask throws when values is not an array', t => {
	const error = t.throws(() => new ModeMask('not-an-array'), TypeError);

	t.is(error.message, 'ModeMask values must be []');
});

test('ModeMask throws when values is an empty array', t => {
	const error = t.throws(() => new ModeMask([]), TypeError);

	t.is(error.message, 'ModeMask values length must be gt 0');
});
