require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", "false");
mongoose.connect(
	`mongodb+srv://admin-moinak:ezioauditoredefirenze@clusterv2.g2smmdo.mongodb.net/reactSecretsDB`,
	{
		useNewUrlParser: true,
	}
);

const userSchema = mongoose.Schema({
	_id: Number,
	proPic: String,
	username: String,
	alias: String,
	secrets: [
		{
			secret: String,
			comments: [
				{
					id: Number,
					alias: String,
					aliasImg: String,
					comment: String,
				},
			],
		},
	],
	aliasImg: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
