
function GameControl() {

	var params = {
		isGamePaused: false
	};

	function start() {

		params.isGamePaused = false ;
		assetManager.emptyBalls();

	};

	function endGame() {

		params.isGamePaused = true ;
		assetManager.emptyBallsPhysics();

	};

	return {
		start,
		endGame,
		params
	};

};