
function GameControl() {

	var params = {
		isGamePaused: false,
		isSlowed: false
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

		if ( failureBall ) {

			if ( audio ) audio.playFailure( failureBall );
			assetManager.markFailureBall( failureBall );
			assetManager.setSphereFailureMaterial();

		};

		if ( intervalToken ) clearInterval( intervalToken );
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