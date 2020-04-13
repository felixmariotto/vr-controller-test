
function GameControl() {

	/*
	setInterval(()=> {

		start();

		assetManager.addBall();
		assetManager.addBall();
		assetManager.addBall();
		assetManager.addBall();
		assetManager.addBall();

	}, 1000 );
	*/

	function start() {

		assetManager.emptyBalls();

	};

	return {
		start
	};

};