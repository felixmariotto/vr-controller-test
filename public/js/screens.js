
function Screens() {

	var font;
	var purge = [];

	const fontMaterial = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: 0xffffff
	});

	const screnBackMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000
	});

	const frontScreen = new THREE.Group();
	frontScreen.position.set( 0, 2, -2.7 );
	scene.add( frontScreen );

	// FRONT SCREEN BACKGROUND

	const frontBackground = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 6, 2, 0.1 ),
		screnBackMaterial
	);
	frontBackground.position.set( 0, 0, -0.15 )
	frontScreen.add( frontBackground );

	// FRONT SCREEN TEXT CONTAINERS

	const minContainer = new THREE.Group();
	minContainer.position.x -= 2 ;

	const secContainer = new THREE.Group();

	const centContainer = new THREE.Group();
	centContainer.position.x += 2 ;

	frontScreen.add( minContainer, secContainer, centContainer );

	// FONT LOADING

	var loader = new THREE.FontLoader();
	loader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket-game/transformers.min.json', (loadedFont)=> {

		font = loadedFont;

		//

		var separatorLeft = makeTextMesh( ':', 1 );
		var separatorRight = makeTextMesh( ':', 1 );
		separatorLeft.position.x -= 1 ;
		separatorRight.position.x += 1 ;

		frontScreen.add( separatorLeft, separatorRight );

		//

		printTime( 0 );

	});

	// FUNCTIONS

	function printTime( milli ) {

		if ( !font ) return

		var min = '' + ( milli / 60000 );
		if ( min.indexOf('.') > -1 ) {
			min = min.substring( 0, min.indexOf( '.' ) );
		};

		var sec = '' + ( milli / 1000 );
		if ( sec.indexOf('.') > -1 ) {
			sec = sec.substring( 0, sec.indexOf( '.' ) );
		};
		sec = Number( sec ) % 60 + "";

		var cent = ( milli / 10 ).toFixed(0);
		cent = cent.substring( cent.length -2 );

		updateTimeContainer( minContainer, makeTextMesh( min, 1 ) );
		updateTimeContainer( secContainer, makeTextMesh( sec, 1 ) );
		updateTimeContainer( centContainer, makeTextMesh( cent, 1 ) );

	};

	function updateTimeContainer( container, newTextMesh ) {

		container.traverse( (child)=> {

			if ( child !== container ) {
				purge.push( child );
				child.visible = false ;
			};

			/*
			container.remove( child );
			if (child.geometry) child.geometry.dispose();
			if (child.material) child.material.dispose();
			*/

		});

		container.add( newTextMesh );

	};

	function makeTextMesh( text, size ) {
		var shapes = font.generateShapes( text, size );
		var geometry = new THREE.ShapeBufferGeometry( shapes );
		geometry.computeBoundingBox();
		var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		var yMid = - 0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );
		geometry.translate( xMid, yMid, 0 );
		return new THREE.Mesh( geometry, fontMaterial );
	};

	return {
		printTime
	};

};