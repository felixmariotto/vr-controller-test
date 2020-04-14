
function Screens() {

	const fontMaterial = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: 0xffffff
	});

	const screnBackMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000
	});

	const frontScreen = new THREE.Group();
	frontScreen.position.set( 0, 1, -3 );
	scene.add( frontScreen );

	// FRONT SCREEN BACKGROUND

	const frontBackground = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 2, 2, 0.1 ),
		screnBackMaterial
	);
	frontBackground.position.set( 0, 0, 0 )
	frontScreen.add( frontBackground );

	//

	var loader = new THREE.FontLoader();
	loader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/transformers.min.json', (font)=> {

		console.log( font );

		var shapes = font.generateShapes( '1:12:75', 1 );

		var geometry = new THREE.ShapeBufferGeometry( shapes );

		geometry.computeBoundingBox();

		var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

		geometry.translate( xMid, 0, 0 );

		text = new THREE.Mesh( geometry, fontMaterial );
		text.position.z = - 1;
		frontScreen.add( text );

	});

};