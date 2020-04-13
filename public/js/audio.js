
function Audio() {

	console.log('coucou')

	var audioLoader = new THREE.AudioLoader();
	var audioListener = new THREE.AudioListener();

	var bounce = new THREE.Audio( audioListener );

	audioLoader.load( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/bounce.ogg', (buffer)=> {
		bounce.setBuffer(buffer);
	});

	function playBounce() {
		bounce.play();
	};

	return {
		playBounce
	};

};