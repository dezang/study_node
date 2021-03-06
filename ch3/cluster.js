var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
	// 워커 생성
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('death', function(worker) {
		console.log('worker' + worker.pid + 'died');
	});
} else {
	// 워커가 HTTP 서버 생성
	http.Server(function(req, res) {
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(8000);
}