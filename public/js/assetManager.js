
function AssetManager() {

	const FAST_BALL_SPEED = 0.5;
	const SLOW_BALL_SPEED = 0.2;

	const MIN_BALL_VELOCITY = 0.2 ;
	const MAX_BALL_VELOCITY = 0.6 ;

	const GAME_SPHERE_RADIUS = 0.5;
	const GAME_SPHERE_CENTER = new THREE.Vector3( 0, 1, -0.5 );

	const BALL_RADIUS = 0.02;

	var controllerRight, controllerLeft ;
	var balls = [];

	var params = {
		ballSpeed: FAST_BALL_SPEED
	};

	// GRID ROOM

	room = new THREE.LineSegments(
			new THREE.BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
			new THREE.LineBasicMaterial( { color: 0x808080 } )
		);

	scene.add( room );

	// GAME SPHERE

	sphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry(GAME_SPHERE_RADIUS, 16, 16),
			new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00e5ff })
		);

	sphere.position.copy( GAME_SPHERE_CENTER );
	
	scene.add( sphere );

	// CONTROLLERS

	controllerRight = {

		mesh: renderer.xr.getController(0),
		helper: new THREE.Mesh(
				new THREE.SphereBufferGeometry( 0.1, 16, 16 ),
				new THREE.MeshNormalMaterial()
			)

	};

	controllerLeft = {

		mesh: renderer.xr.getController(1),
		helper: new THREE.Mesh(
				new THREE.SphereBufferGeometry( 0.1, 16, 16 ),
				new THREE.MeshNormalMaterial()
			)

	};

	[ controllerRight, controllerLeft ].forEach( (controller)=> {

		controller.body = new CANNON.Body({
			mass: 0.1,
			position: new CANNON.Vec3(
				controller.mesh.position.x,
				controller.mesh.position.y,
				controller.mesh.position.z
			),
			shape: new CANNON.Sphere( 0.1 ),
			velocity: new CANNON.Vec3( 0, 0, 0 )
		});

		cannonWorld.addBody( controller.body );

		scene.add( controller.helper );

		// pointer

		var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

		var line = new THREE.Line( geometry );
		line.name = 'line';
		line.scale.z = 5;

		controller.mesh.add( line );

	});

	scene.add( controllerRight.mesh, controllerLeft.mesh );

	gltfLoader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket.glb', (glb)=> {
		addRacketToController( glb, controllerLeft );
	});

	gltfLoader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket.glb', (glb)=> {
		addRacketToController( glb, controllerRight );
	});

	function addRacketToController( glb, controller ) {
		glb.scene.scale.setScalar( 0.35 );
		glb.scene.rotation.x -= Math.PI / 3.5;
		controller.mesh.add( glb.scene );
	};

	// CONTROLLERS EVENTS
	// events : select, selectstart, selectend, squeeze, squeezestart, squeezeend, end

	addBall();

	controllerRight.mesh.addEventListener('selectstart', ()=>{
		addBall();
	});

	controllerRight.mesh.addEventListener('squeezestart', ()=>{
		params.ballSpeed = SLOW_BALL_SPEED;
	});

	controllerRight.mesh.addEventListener('squeezeend', ()=>{
		params.ballSpeed = FAST_BALL_SPEED;
	});

	// FUNCTIONS

	function addBall() {

		var newVelocity = new CANNON.Vec3(
			Math.random() - 0.5,
			Math.random() - 0.5,
			Math.random() - 0.5
		);
		newVelocity.normalize();
		newVelocity.scale( MIN_BALL_VELOCITY + (Math.random() * ( MAX_BALL_VELOCITY - MIN_BALL_VELOCITY )), newVelocity );

		var ball = {

			mesh: new THREE.Mesh(
				new THREE.SphereBufferGeometry( BALL_RADIUS, 8, 8 ),
				new THREE.MeshLambertMaterial({ color: 0xffffff * Math.random() })
			),

			body: new CANNON.Body({
				mass: 0.05, // kg
				position: new CANNON.Vec3(
					GAME_SPHERE_CENTER.x,
					GAME_SPHERE_CENTER.y,
					GAME_SPHERE_CENTER.z
				),
				shape: new CANNON.Sphere( BALL_RADIUS ),
				velocity: newVelocity
			})

		};

		scene.add( ball.mesh );
		cannonWorld.addBody( ball.body );

		balls.push( ball );

	};

	return {
		GAME_SPHERE_RADIUS,
		balls,
		params,
		controllerRight,
		controllerLeft
	};

};