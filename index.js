//#region needed modules region
const express = require("express"),
	{ createServer } = require("http"),
	{ join } = require("path");
//#endregion

//#region initializing
const app = express(),
	PORT = process.env.PORT || 8000,
	// FIXME: ???
	server = createServer(app),
	io = require("socket.io")(server);
//#endregion

//#region get method
app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "index.html"));
});
//#endregion

//#region socket.io
io.on("connection", socket => {
	socket.on("chat message", msg => {
		io.emit("chat message", msg);
	});
});

server.listen(PORT, () => {
	console.log("http://localhost:" + PORT);
});
