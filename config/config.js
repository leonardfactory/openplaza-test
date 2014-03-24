var config	= {};

config.mongo_url	= config.mongo_url	= 	process.env.MONGOLAB_URI ||
  					  						process.env.MONGOHQ_URL;
											
module.exports = config;