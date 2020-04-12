
function AssetManager() {

	const FAST_BALL_SPEED = 0.5;
	const SLOW_BALL_SPEED = 0.2;
	var ballSpeed = FAST_BALL_SPEED;

	const GAME_SPHERE_RADIUS = 0.5;

	var controllerRight, controllerLeft ;
	var sphereSpace;
	var balls = [];

	// GRID ROOM

	room = new THREE.LineSegments(
			new THREE.BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
			new THREE.LineBasicMaterial( { color: 0x808080 } )
		);

	scene.add( room );

	// GAME SPHERE

	sphereSpace = new THREE.Group();
	sphereSpace.position.set( 0, 1, -0.5 );

	scene.add( sphereSpace );

	sphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry(GAME_SPHERE_RADIUS, 16, 16),
			new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00e5ff })
		);
	
	sphereSpace.add( sphere );

	// CONTROLLERS

	controllerRight = renderer.xr.getController(0);
	controllerLeft = renderer.xr.getController(1);

	scene.add( controllerRight, controllerLeft );

	gltfLoader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket.glb', (glb)=> {
		addRacketToController( glb, controllerLeft );
	});

	gltfLoader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket.glb', (glb)=> {
		addRacketToController( glb, controllerRight );
	});

	function addRacketToController( glb, controller ) {
		glb.scene.scale.setScalar( 0.35 );
		glb.scene.rotation.x -= Math.PI / 3.5;
		controller.add( glb.scene );
	};

	// CONTROLLERS EVENTS
	// events : select, selectstart, selectend, squeeze, squeezestart, squeezeend, end

	controllerRight.addEventListener('selectstart', ()=>{
		addBall();
	});

	controllerRight.addEventListener('squeezestart', ()=>{
		ballSpeed = SLOW_BALL_SPEED;
	});

	controllerRight.addEventListener('squeezeend', ()=>{
		ballSpeed = FAST_BALL_SPEED;
	});

	// FUNCTIONS

	function addBall() {

		var ballMesh = new THREE.Mesh(
				new THREE.SphereBufferGeometry(0.02, 8, 8),
				new THREE.MeshLambertMaterial({ color: 0xffffff * Math.random() })
			);

		ballMesh.userData.velocity = new THREE.Vector3(
				Math.random(),
				Math.random(),
				Math.random()
			);

		sphereSpace.add( ballMesh );
		balls.push( ballMesh );

	};

	return {
		balls
	};

};