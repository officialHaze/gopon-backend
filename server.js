require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const getSecrets = require("./getSecrets");
const uploadSecret = require("./uploadSecret");
const getSecret = require("./getSecret");
const updateComment = require("./updateComment");

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(
	session({
		secret: "thisismysecret.",
		saveUninitialized: false,
		resave: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
require("./passport-google-config");

app.get("/", (req, res) => {
	res.redirect("http://localhost:3000");
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/fail" }),
	(req, res) => {
		res.redirect("http://localhost:3000/dashboard");
	}
);

app.get("/authenticate", (req, res) => {
	res.cookie(
		"connect.sid",
		"s%3AD4-gwM98hIoJISUN9NcyLCzh6Vapg-sV.D5H9dwKNx8HXQ%2Ftf42RynKVtxtjV2USz3tTxZrmOXMk",
		{ sameSite: "None", secure: false }
	);

	if (req.isAuthenticated()) {
		res.send(true);
	} else {
		res.send(false);
	}
});

app.get("/secrets", (req, res) => {
	getSecrets()
		.then((secrets) => {
			res.send(secrets);
		})
		.catch((err) => {
			throw err;
		});
});

app.get("/user", (req, res) => {
	console.log(req.user);
	res.cookie(
		"connect.sid",
		"s%3AD4-gwM98hIoJISUN9NcyLCzh6Vapg-sV.D5H9dwKNx8HXQ%2Ftf42RynKVtxtjV2USz3tTxZrmOXMk",
		{ sameSite: "None", secure: false }
	);
	res.send(req.user);
});

app.get("/userProfileImg", (req, res) => {
	if (req.user !== undefined) {
		const { proPic } = req.user;
		res.send(proPic);
	}
});

app.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			console.log("logout failed");
			res.send(false);
		} else {
			console.log("user logged out successfully");
			res.send(true);
		}
	});
});

app.post("/upload-secret", (req, res) => {
	const { alias, secret, id, aliasImg } = req.body;
	uploadSecret(alias, secret, id, aliasImg)
		.then((isUploaded) => {
			res.send(isUploaded);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/getSecret", async (req, res) => {
	const { id, index } = req.body;
	try {
		const datas = await getSecret(id, index);
		res.send(datas);
	} catch (err) {
		throw err;
	}
});

app.post("/postComment", async (req, res) => {
	try {
		const { index, idOfPost, idOfCommentator, alias, aliasImg, comment } = req.body;
		const comments = await updateComment(
			index,
			idOfPost,
			idOfCommentator,
			alias,
			aliasImg,
			comment
		);
		res.send(comments);
	} catch (err) {
		throw err;
	}
});

app.listen(process.env.PORT || port, () => {
	console.log(`Server running on port ${port}`);
});
