const User = require("./mongoose-config");

async function updateComment(index, idOfPost, idOfCommentator, alias, aliasImg, comment) {
	const postId = parseInt(idOfPost);
	const commentatorId = parseInt(idOfCommentator);
	try {
		const user = await User.findById({ _id: postId });
		user.secrets[index].comments.push({
			id: commentatorId,
			alias: alias,
			aliasImg: aliasImg,
			comment: comment,
		});
		await User.findOneAndUpdate({ _id: postId }, user);
		const updatedUser = await User.findById({ _id: postId });
		return updatedUser.secrets[index].comments;
	} catch (err) {
		throw err;
	}
}

module.exports = updateComment;
