var config	= {};

config.mongo_url	= 					process.env.MONGOLAB_URI ||
  					  					process.env.MONGOHQ_URL	||
										'mongodb://localhost/openplaza';
											
module.exports = config;