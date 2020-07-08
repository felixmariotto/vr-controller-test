
function GameControl() {

	var params = {
		isGamePaused: true,
		isSlowed: false,
		gameStartTime: undefined
	};

	var intervalToken;

	//

	document.addEventListener('keydown', () => {

		start();

	});

	//

	function start() {

		if ( getElapsedGameTime() < 1000 ) return

		if ( !params.isGamePaused ) {
			endGame();
		};

		setTimeout(()=> {

			assetManager.emptyBallsMesh();
			assetManager.setSphereBasicMaterial();
			params.isGamePaused = false ;
			params.gameStartTime = Date.now();

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

		const time = getElapsedGameTime();

		screens.printTime( time );
		screens.printBestScore( time );

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