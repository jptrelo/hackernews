// Dependencies
var mongoose = require('mongoose');
var request = require('request');
var _ = require('lodash');
var News = require('../models/News.js');

var url = 'https://hn.algolia.com/api/v1/';

exports.index = function(req, res){
	
	findAll(News, function(err, data) {
		if(err) return res.status(500).send(err.message);
		res.render('index', {news: data});
	});
};

exports.fillin = function(req, res){
	
	request.get({ url: url + 'search_by_date?query=nodejs' }, function(error, response, body) { 
		if(error) return res.status(500).send(error.message);
		if(response.statusCode == 200) { 
			var obj = JSON.parse(body);
			var news = _.get(obj, 'hits', null);

			if (!_.isNull(news)) {
				News.create(news, function(error, docs) {
					if(error) return res.status(500).send(error.message);
					res.status(200).json(docs); 
				});
				
			}
			
		} 
	}); 

};

function findAll(model, done){
	News.find({}).sort({created_at: -1}).exec(function(err, news) {
		if(err) return done(err, null);
		return done(null, news);
	});
}

//GET - Return all registers
exports.findAll = function(req, res) {
	findAll(News, function(err, data) {
		if(err) return res.status(500).send(err.message);
		res.status(200).json(data);
	});
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
	News.findById(req.params.id, function(err, neww) {
		if(err) return res.status(500).send(err.message);
		res.status(200).json(neww);
	});
};

//POST - Insert a new register
exports.add = function(req, res) {
	var neww = new News({
		name: req.body.name
	});
	neww.save(function(err, neww) {
		if(err) return res.status(500).send(err.message);
		res.status(200).json(neww);
	});
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	News.findById(req.params.id, function(err, neww) {
		var neww = new News({
			name: req.body.name
		});
		neww.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).json(neww);
		});
	});
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
	News.findById(req.params.id, function(err, neww) {
		neww.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};