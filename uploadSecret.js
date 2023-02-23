const User = require("./mongoose-config");

async function uploadSecret(alias, secret, id, aliasImg) {
	const Intid = parseInt(id);
	try {
		if (alias === "")
			await User.findByIdAndUpdate(
				{ _id: Intid },
				{
					alias: `user:${id}`,
					aliasImg: aliasImg,
					$push: { secrets: { secret: secret } },
				}
			);
		else
			await User.findByIdAndUpdate(
				{ _id: Intid },
				{ alias: alias, aliasImg: aliasImg, $push: { secrets: { secret: secret } } }
			);

		return true;
	} catch (err) {
		throw err;
	}
}

module.exports = uploadSecret;
