
function GameControl() {

	var params = {
		isGamePaused: false
	};

	function start() {

		assetManager.emptyBallsMesh();

		setTimeout(()=> {
			params.isGamePaused = false ;
		}, 0 );

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