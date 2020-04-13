
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

	function endGame( failureBall ) {

		if ( audio ) audio.playFailure( failureBall );
		params.isGamePaused = true ;
		assetManager.emptyBallsPhysics();
		assetManager.markFailureBall( failureBall );
		
	};

	return {
		start,
		endGame,
		params
	};

};