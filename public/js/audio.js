
function Audio() {

	var audioLoader = new THREE.AudioLoader();
	var audioListener = new THREE.AudioListener();
	camera.add( audioListener );

	var bounce = new THREE.PositionalAudio( audioListener );
	var failure = new THREE.PositionalAudio( audioListener );

	audioLoader.load( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/bounce.ogg', (buffer)=> {
		bounce.setBuffer( buffer );
	});

	audioLoader.load( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/failure.ogg', (buffer)=> {
		failure.setBuffer( buffer );
	})

	//

	function playBounce( emitter ) {

		emitter.add( bounce );

		setTimeout(()=>{

			bounce.play();

		}, 0 );

	};

	function playFailure( emitter ) {

		emitter.mesh.add( failure );

		setTimeout(()=> {

			failure.play();

		}, 0 );

	};

	//

	return {
		playBounce,
		playFailure
	};

};