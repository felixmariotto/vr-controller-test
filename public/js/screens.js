
function Screens() {

	var font;

	const fontMaterial = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: 0xffffff
	});

	const screnBackMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000
	});

	const frontScreen = new THREE.Group();
	frontScreen.position.set( 0, 2, -2.7 );
	frontScreen.scale.setScalar( 0.4 );
	frontScreen.name = 'front-screen'
	scene.add( frontScreen );

	// FRONT SCREEN BACKGROUND

	const frontBackground = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 6.5, 2, 0.1 ),
		screnBackMaterial
	);
	frontBackground.position.set( 0, 0, -0.15 )
	frontScreen.add( frontBackground );

	// FRONT SCREEN TEXT CONTAINERS

	const minContainer = [
		new THREE.Group(),
		new THREE.Group()
	];
	minContainer[0].position.x -= 1.6 ;
	minContainer[1].position.x -= 2.4 ;

	const secContainer = [
		new THREE.Group(),
		new THREE.Group()
	];
	secContainer[0].position.x -= 0.4 ;
	secContainer[1].position.x += 0.4 ;

	const centContainer = [
		new THREE.Group(),
		new THREE.Group()
	];
	centContainer[0].position.x += 1.6 ;
	centContainer[1].position.x += 2.4 ;

	frontScreen.add(
		minContainer[0],
		minContainer[1],
		secContainer[0],
		secContainer[1],
		centContainer[0],
		centContainer[1]
	);

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
		if ( min.length === 1 ) {
			min = '0' + min ;
		};

		var sec = '' + ( milli / 1000 );
		if ( sec.indexOf('.') > -1 ) {
			sec = sec.substring( 0, sec.indexOf( '.' ) );
		};
		sec = Number( sec ) % 60 + "";
		if ( sec.length === 1 ) {
			sec = '0' + sec ;
		};

		var cent = ( milli / 10 ).toFixed(0);
		cent = cent.substring( cent.length -2 );
		if ( cent.length === 1 ) {
			cent = '0' + cent ;
		};

		updateTimeContainer( minContainer[0], makeTextMesh( min[0], 1 ) );
		updateTimeContainer( minContainer[1], makeTextMesh( min[1], 1 ) );

		updateTimeContainer( secContainer[0], makeTextMesh( sec[0], 1 ) );
		updateTimeContainer( secContainer[1], makeTextMesh( sec[1], 1 ) );

		updateTimeContainer( centContainer[0], makeTextMesh( cent[0], 1 ) );
		updateTimeContainer( centContainer[1], makeTextMesh( cent[1], 1 ) );

	};

	function updateTimeContainer( container, newTextMesh ) {

		container.traverse( (child)=> {

			if ( child !== container ) {
				child.visible = false ;
			};

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

	//

	return {
		printTime
	};

};