
function Audio() {

	console.log('coucou')

	var audioLoader = new THREE.AudioLoader();
	var audioListener = new THREE.AudioListener();
	camera.add( audioListener );

	var bounce = new THREE.PositionalAudio( audioListener );

	audioLoader.load( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/bounce.ogg', (buffer)=> {
		bounce.setBuffer(buffer);
	});

	function playBounce( emmiter ) {

		emmiter.add( bounce );

		setTimeout(()=>{

			bounce.play();
			
		}, 0 );

	};

	return {
		playBounce
	};

};