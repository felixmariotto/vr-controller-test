
function Audio() {

	var audioLoader = new THREE.AudioLoader();
	var audioListener = new THREE.AudioListener();
	camera.add( audioListener );

	var bounce = new THREE.PositionalAudio( audioListener );
	var failure = new THREE.PositionalAudio( audioListener );

	audioLoader.load( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/bounce.ogg', (buffer)=> {
		bounce.setBuffer( buffer );
		sound.setRefDistance( 3 );
	});

	audioLoader.load( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/failure.mp3', (buffer)=> {
		failure.setBuffer( buffer );
		sound.setRefDistance( 3 );
	})

	//

	function playBounce( emitter ) {

		emitter.add( bounce );

		setTimeout(()=>{

			failure.play();

		}, 0 );

	};

	function playFailure( emitter ) {

		emitter.mesh.add( failure );

		setTimeout(()=> {

			bounce.play();

		}, 0 );

	};

	//

	return {
		playBounce,
		playFailure
	};

};