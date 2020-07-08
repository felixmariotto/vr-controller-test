
function Screens() {

	/////////
	// Menu
	/////////

	const menu = new ThreeMeshUI.Block({
		height: 1.1,
		width: 2.6,
		backgroundColor: new THREE.Color( 0x000000 ),
		backgroundOpacity: 1,
		contentDirection: 'row-reverse'
	});

	menu.position.set( 0, 0.9, -2.7 );

	scene.add( menu );

	//

	const pictureContainer = new ThreeMeshUI.Block({
		height: 1.1,
		width: 1.3,
		backgroundOpacity: 0,
		justifyContent: 'center'
	});

	menu.add( pictureContainer );

	//

	new THREE.TextureLoader().load('https://vr-games-host.s3.eu-west-3.amazonaws.com/projects/zen_tennis/game_assets/zen_tennis_instruction.png', (texture) => {

		const instruction = new ThreeMeshUI.Block({
			height: 0.8,
			width: 0.8,
			backgroundTexture: texture
		});

		pictureContainer.add( instruction );

	})

	//

	const textContainer = new ThreeMeshUI.Block({
		height: 1.1,
		width: 1.3,
		backgroundOpacity: 0,
		fontFamily: '../assets/Roboto-msdf.json',
		fontTexture: '../assets/Roboto-msdf.png',
		alignContent: 'left',
		padding: 0.1,
		interLine: 0.12,
		justifyContent: 'center'
	});

	menu.add( textContainer );

	//

	textContainer.add(

		new ThreeMeshUI.Text({
			content: "Zen Tennis",
			fontSize: 0.15
		}),

		new ThreeMeshUI.Text({
			fontSize: 0.07,
			content: "\nKeep the balls inside the grid."
		}),

		new ThreeMeshUI.Text({
			fontSize: 0.07,
			content: "\nPress any key to start."
		})

	)

	//////////
	// Timer
	//////////

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

		[minContainer[0],
		minContainer[1],
		secContainer[0],
		secContainer[1],
		centContainer[0],
		centContainer[1]].forEach( (container)=> {

			['0','1','2','3','4','5','6','7','8','9'].forEach( (digit)=> {

				var digitMesh = makeTextMesh( digit, 1 );
				digitMesh.visible = false ;
				digitMesh.name = digit;
				container.add( digitMesh );

			});

		});

		//

		setTimeout( ()=> {
			printTime( 0 );
		}, 0 );

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

		updateTimeContainer( minContainer[0], min[0] );
		updateTimeContainer( minContainer[1], min[1] );

		updateTimeContainer( secContainer[0], sec[0] );
		updateTimeContainer( secContainer[1], sec[1] );

		updateTimeContainer( centContainer[0], cent[0] );
		updateTimeContainer( centContainer[1], cent[1] );

	};

	function updateTimeContainer( container, text ) {

		container.traverse( (child)=> {
			if ( child !== container ) {
				child.visible = false ;
			};
		});

		container.traverse( (child)=> {
			if ( child.name === text ) {
				child.visible = true ;
			};
		});

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