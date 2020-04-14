
function Screens() {

	const fontMaterial = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: 0xffffff
	});

	const screnBackMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000
	});

	const frontScreen = new THREE.Group();
	frontScreen.position.set( 0, 2, -3 );
	scene.add( frontScreen );

	// FRONT SCREEN BACKGROUND

	const frontBackground = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 5, 2, 0.1 ),
		screnBackMaterial
	);
	frontBackground.position.set( 0, 0, -0.15 )
	frontScreen.add( frontBackground );

	//

	var loader = new THREE.FontLoader();
	loader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/transformers.min.json', (font)=> {

		console.log( font );

		var shapes = font.generateShapes( '1:12:75', 1 );

		var geometry = new THREE.ShapeBufferGeometry( shapes );

		geometry.computeBoundingBox();

		var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		var yMid = - 0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );

		geometry.translate( xMid, yMid, 0 );

		text = new THREE.Mesh( geometry, fontMaterial );
		frontScreen.add( text );

	});

};