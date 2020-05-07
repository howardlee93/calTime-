// todo_model.js


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
	user: {
    	type: Schema.Types.ObjectId,
    	ref: 'users'
  	},
  	todo: {
    	type: String,
    	required: true
  	},
  	date: {
    	type: Date,
    	default: Date.now
  	},
  	title:{
  		type: String,
      	required: true

  	},
  	time:{
  		type: String,
  		required: true
  	},
  	details:{
  		type: String,
  		required: true 
  	}

});


module.exports = Event = mongoose.model('events', EventSchema);