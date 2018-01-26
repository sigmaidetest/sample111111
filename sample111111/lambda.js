let AWS = require('aws-sdk');
const s3 = new AWS.S3();
let connectionManager = require('./ConnectionManager');
let SL = require('@slappforge/slappforge-sdk');
const rds = new SL.AWS.RDS(connectionManager);
exports.handler = function (event, context, callback) {

	// Replace the query with the actual query
	// You can pass the existing connection to this function.
	// A new connection will be created if it's not present as the third param 
	// You must always end the DB connection after it's used
	rds.query({
		instanceIdentifier: 'test3',
		query: 'Inert?',
		inserts: ["dsadasd", 1]
	}, function (error, results, connection) {
		if (error) {
			console.log("Error occurred");
			throw error;
		} else {
			console.log("Success")
			console.log(results);
		}

		connection.end();
	});

	s3.listObjects({
		'Bucket': 'auth.test.adroitlogic.com',
		'MaxKeys': 10,
		'Prefix': ''
	}).promise()
		.then(data => {
			console.log(data);           // successful response
			/*
			data = {
			 Contents: [
				{
				   ETag: "\\"70ee1738b6b21e2c8a43f3a5ab0eee71\\"",
				   Key: "example1.jpg",
				   LastModified: <Date Representation>,
				   Owner: {
					  DisplayName: "myname",
					  ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
				   },
				   Size: 11,
				   StorageClass: "STANDARD"
				},
				{...}
			*/
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});

	callback(null, 'Successfully executed');
}