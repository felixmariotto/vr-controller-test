
function GameControl() {

	var params = {
		isGamePaused: false,
		isSlowed: false
	};

	//

	function start() {

		if ( !params.isGamePaused ) {
			endGame();
		}; 

		setTimeout(()=> {

			assetManager.emptyBallsMesh();
			assetManager.setSphereBasicMaterial();
			params.isGamePaused = false ;

			assetManager.addBall();

		}, 0 );

	};

	//

	function endGame( failureBall ) {

		if ( failureBall ) {

			if ( audio ) audio.playFailure( failureBall );
			assetManager.markFailureBall( failureBall );
			assetManager.setSphereFailureMaterial();

		};

		params.isGamePaused = true ;
		assetManager.emptyBallsPhysics();
		
	};

	//

	function setSpeedSlow() {
		params.isSlowed = true ;
	};

	function setSpeedNormal() {
		params.isSlowed = false ;
	};

	//

	return {
		start,
		endGame,
		params,
		setSpeedSlow,
		setSpeedNormal
	};

};