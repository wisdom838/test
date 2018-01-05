const express = require('express');
var cors = require('cors');
var path = require('path');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser')
const conf = require('./config/config.js');
const cons = require('./config/constants.js');
const msg = require('./config/messages.js');
const dbConnection = require('./config/ums_dbconnect.js')
var expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const userchat = require('./controller/services/app/chat/userchat.js').Userchat
const app = express();
app.use(function (req, res, next) {
	console.log(req.headers.host)
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	next();
});
app.use(bodyParser.urlencoded({
	limit: '25mb',
	parameterLimit: 100000,
	extended: false
}));

app.use(bodyParser.json({
	limit: '25mb'
}));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use(basicAuth(basic_auth));
//Uses a custom response body function
var customBodyAuth = basicAuth({
	users: basic_auth,
	unauthorizedResponse: getUnauthorizedResponse
})
app.use(fileUpload());
var server;
if (envType == "bijibbiz" || envType == "bijibin" || envType == "bijibcom" || envType == "hospservices") {
	// console.log(server_cert_config)
	server = require('https').createServer(server_cert_config, app);
} else {
	server = require('http').createServer(app);
}
var io = require('socket.io')(server);
var rooms = {};
io.on('connection', function (socket) {
	var groupName = socket.handshake.query.group
	var room_exist = io.sockets.adapter.rooms[groupName]
	if (typeof groupName != undefined && typeof room_exist != undefined) {
		console.log("Group Created:" + groupName)
		socket.join(groupName);
	}
	socket.on("send_msg", function (obj) {
		console.log(obj)
		var user_id = obj.from_uid;
		var to_id = obj.to_uid;
		var msg = obj.msg;
		var img_path = obj.img_path;
		var audio_path = obj.audio_path;
		var video_path = obj.video_path;
		var media_type = obj.media_type;
		if (typeof media_type != "" && typeof user_id != "" && typeof to_id != "" && ((msg != "" && media_type == 4 || media_type == 5) || (img_path != "" && media_type == 1) || (audio_path != "" && media_type == 2) || (video_path != "" && media_type == 3))) {
			socket.broadcast.to(groupName).emit("msg", obj);
			Userchat.InsertMediaDetails(obj);
		}
	})
});
function getUnauthorizedResponse(req) {
	return req.auth ?
		('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
		{ "status": false, "msg": "No credentials provided" }
}

//var corsOptions = {		
//credentials: true		
//}	
//app.use(cors(corsOptions));

app.get("/", function (req, res) {
	res.send("API Working")
})

var routeUser = require('./routes/route_user');
app.use('/user', customBodyAuth, routeUser);

var routeApp = require('./routes/route_app');
app.use('/app', customBodyAuth, routeApp);

var routeAlerts = require('./routes/route_alerts');
app.use('/alerts', customBodyAuth, routeAlerts);

var routeCommon = require('./routes/route_common');
app.use('/common', customBodyAuth, routeCommon);

var hospitality = require('./routes/route_hospitality');
app.use('/hospitality', customBodyAuth, hospitality);

var callBack = require('./routes/route_callback');
app.use('/aws', callBack);

global.db = (global.db ? global.db : dbConnection);

server.listen(SERVER_PORT, function () {
	console.log("... port %d in %s mode", server.address().port, app.settings.env);
	console.log('listening on ' + SERVER_PORT)
})
module.exports = app;