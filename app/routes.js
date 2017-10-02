// Dependencies
var NewsCtrl = require('./controllers/newsCtrl.js');

// Opens App Routes
module.exports = function(express,app) {

// HOME
app.get('/', NewsCtrl.index);

//API
var api = express.Router();
	//News
	api.route('/news') 
	.get(NewsCtrl.findAll)
	.post(NewsCtrl.add);
	api.route('/news/:id') 
	.get(NewsCtrl.findById)
	.put(NewsCtrl.update)
	.delete(NewsCtrl.delete);
	api.route('/fillin') 
	.get(NewsCtrl.fillin);
	app.use('/api/v1/', api);

};