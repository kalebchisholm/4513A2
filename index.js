const express = require("express");
const mongoose = require("mongoose");
const movieRouter = require("./routers/movieRouter");

// Connect to MongoDB database
mongoose
	.connect("mongodb+srv://kaleb:oTZ0Q94KHLou8CxG@4513a2.foe9qfz.mongodb.net/4513a2?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		const app = express()
    app.use('/api', movieRouter);

		app.listen(8080, () => {
			console.log("Server has started!")
		})
	});