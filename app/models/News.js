var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({ 
	_id: Schema.Types.ObjectId,
	author: String,
	comment_text: String,
	created_at: Date,
	created_at_i: Number,
	num_comments: Number,
	objectID: String,
	parent_id: Number,
	points: Number,
	story_id: Number,
	story_text: String,
	story_title: String,
	story_url: String,
	title: String,
	url: String,
	_highlightResult: Schema.Types.Mixed,
	_tags: []
});

newsSchema.pre('save', function(next){
	this._id = new mongoose.Types.ObjectId();
	next();
});

module.exports = mongoose.model('News', newsSchema);