const User = require("./mongoose-config");

async function getSecrets() {
	try {
		const secrets = await User.find({});
		return secrets;
	} catch (err) {
		throw err;
	}
}

module.exports = getSecrets;
