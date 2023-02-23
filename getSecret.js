const User = require("./mongoose-config");

async function getSecret(id, index) {
	try {
		const user = await User.findById({ _id: id });
		const datas = {
			secret: user.secrets[index].secret,
			aliasImg: user.aliasImg,
			alias: user.alias,
			comments: user.secrets[index].comments,
		};
		return datas;
	} catch (err) {
		throw err;
	}
}

module.exports = getSecret;
