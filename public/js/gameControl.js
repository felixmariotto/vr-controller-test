
function GameControl() {

	var params = {
		isGamePaused: true,
		isSlowed: false,
		gameStartTime: undefined
	};

	var intervalToken;

	//

	function start() {

		if ( !params.isGamePaused ) {
			endGame();
		}; 

		setTimeout(()=> {

			assetManager.emptyBallsMesh();
			assetManager.setSphereBasicMaterial();
			params.isGamePaused = false ;
			params.gameStartTime = Date.now();
			screens.printTime( 0 );

			assetManager.addBall();

			if ( !intervalToken ) {
				intervalToken = setInterval(()=> {
					assetManager.addBall();
				}, 10000);
			};

		}, 0 );

	};

	//

	function endGame( failureBall ) {

		screens.printTime( getElapsedGameTime() );
		screens.purge();

		if ( failureBall ) {
			if ( audio ) audio.playFailure( failureBall );
			assetManager.markFailureBall( failureBall );
			assetManager.setSphereFailureMaterial();
		};

		if ( intervalToken ) {
			clearInterval( intervalToken );
			intervalToken = undefined ;
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

	function getElapsedGameTime() {
		return Date.now() - params.gameStartTime;
	};

	//

	return {
		start,
		endGame,
		params,
		setSpeedSlow,
		setSpeedNormal,
		getElapsedGameTime
	};

};