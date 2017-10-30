const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
var process = require('process');
var enableDestroy = require('server-destroy');


//parse the command line arguments - optionally with format
var arg = process.argv;
if (arg.length == 3) { //without format - default png 
	var url = arg.slice(2);
	var format = 'png';
} else if (arg.length == 4) { //with format  
	var url = arg.slice(2,3);
	var format = arg.slice(3);	
} else { //if there is too much arg, exit
	return console.log('arg length must be two or three. try again.');
}

//verify that format works and if jpeg, change 'jpeg' to 'jpg'
if (format == 'jpeg') {
	var ender = '.jpg';	
} else if (format == 'png') {
	var ender = '.png';
} else {
	return console.log('wrong format. must be png or jpeg');
}

console.log('converting ' + url + ' to an image with format: ' + format);

//perform screenshot taking of the url - save as image.* file format
(async () => {
	  const browser = await puppeteer.launch({args: ['--no-sandbox']});
	  const page = await browser.newPage();
	  await page.goto(String(url));
	  await page.screenshot({
		  path: 'ss' + ender,
		  fullPage: true});
	  await browser.close();
})();	

console.log('uploading the screenshot to the server')

var server = http.createServer(function(req, res) {
	fs.readFile('ss' + ender, function (err, content) {
		if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such file or page needs to be refreshed");    
        } else {
        	res.setHeader('Content-disposition', 'attachment; filename= ss' + ender);
            res.end(content, function () {
            	console.log('Download requested.');
            });
        }
    });
})
server.on('connection', function (socket) {socket.unref();});
server.listen('3000');
console.log('Now listening to port 3000 to respond to the download request. Server will be destroyed after 30 seconds.');
enableDestroy(server);
setTimeout(function(){
	server.destroy()
}, 30000);
