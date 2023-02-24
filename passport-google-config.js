const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./mongoose-config");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/auth/google/callback",
			scope: ["profile"],
			state: true,
		},
		async function verify(refreshToken, accessToken, profile, done) {
			try {
				const user = await User.findById({ _id: profile.id });
				if (user) {
					return done(null, user, { message: "user found" });
				} else {
					const newUser = new User({
						_id: profile.id,
						proPic: profile._json.picture,
						username: profile.displayName,
						alias: "",
						aliasImg: "",
					});
					const user = await newUser.save();
					return done(null, user, { message: "user created" });
				}
			} catch (err) {
				console.log(err.message);
				return done(err, false);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById({ _id: id });
		return done(null, user);
	} catch (err) {
		console.log(err.message);
		return done(err, false);
	}
});
