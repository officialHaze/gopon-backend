const express = require("express");

const app = express();

const port = 5000;

app.listen(process.env.PORT || port, () => {
	console.log(`Server running on port ${port}`);
});
