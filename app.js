
const express = require( 'express' );
const path = require( 'path' );
const app = new express();
const PORT = process.env.PORT || 5050;


app.use(express.static('public'));

app
	.get('/', (req, res)=> {
		res.sendFile(path.join(__dirname + '/public/index.html'));
	})

	.listen(PORT, ()=> {
		console.log('App listening on port ' + PORT);
	})