
function GameControl() {

	var params = {
		isGamePaused: false
	};

	function start() {

		assetManager.emptyBallsMesh();
		assetManager.setSphereBasicMaterial();

		setTimeout(()=> {
			params.isGamePaused = false ;
		}, 0 );

	};

	function endGame( failureBall ) {

		if ( audio ) audio.playFailure( failureBall );
		params.isGamePaused = true ;
		assetManager.emptyBallsPhysics();
		assetManager.markFailureBall( failureBall );
		assetManager.setSphereFailureMaterial();
		
	};

	return {
		start,
		endGame,
		params
	};

};