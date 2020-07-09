
function AssetManager() {

	// min and max init speed for new balls
	const MIN_BALL_VELOCITY = 0.1 ;
	const MAX_BALL_VELOCITY = 0.2 ;

	const BALL_RADIUS = 0.025;

	const FAILURE_BALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xff0000 });

	// game zone
	const GAME_SPHERE_RADIUS = 0.3;
	const GAME_SPHERE_CENTER = new THREE.Vector3( 0, 1, -0.5 );

	// those two are used to avoid accidentally pop several balls in one racket hit
	var lastBallPop = 0;
	const BALL_POP_MIN_SPAN = 500; // ms

	var controllerRight, controllerLeft ;
	var balls = [];

	// GROUND

	/*

	const plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( 30, 30 ),
		new THREE.MeshBasicMaterial({ color: 0x8a281d })
	);

	plane.rotation.x = -Math.PI / 2;

	scene.add( plane );

	*/

	var loader = new THREE.GLTFLoader().load('https://vr-games-host.s3.eu-west-3.amazonaws.com/projects/zen_tennis/game_assets/dune.glb', (glb) => {

		const model = glb.scene;

		model.position.y -= 0.1;
		model.rotation.y = Math.PI;

		scene.add( model );

	});

	// ROOM

	matLine = new THREE.LineMaterial({
		color: 0x00abba,
		linewidth: 0.005, // in pixels
	});

	//

	var roomGeometry = new THREE.LineGeometry();
	roomGeometry.setPositions([
		-2, 0, -2,
		2, 0, -2,
		2, 0, 2,
		1.5, 0, 2,
		1.5, 2, 2,
		0.5, 2, 2,
		0.5, 0, 2,
		-2, 0, 2,
		-2, 0, -0.5,
		-2, 2, -0.5,
		-2, 2, -1.5,
		-2, 0, -1.5,
		-2, 0, -2,
	]);

	room = new THREE.Line2( roomGeometry, matLine );
	room.computeLineDistances();
	room.scale.set( 1, 1, 1 );
	scene.add( room );

	//

	var roofGeometry = new THREE.LineGeometry();
	roofGeometry.setPositions([
		-2, 2.5, -2,
		2, 2.5, -2,
		2, 2.5, 2,
		-2, 2.5, 2,
		-2, 2.5, -2,
	]);

	roof = new THREE.Line2( roofGeometry, matLine );
	roof.computeLineDistances();
	roof.scale.set( 1, 1, 1 );
	scene.add( roof );

	//

	var window1Geometry = new THREE.LineGeometry();
	window1Geometry.setPositions([
		2, 1.2, 0.5,
		2, 2.0, 0.5,
		2, 2.0, -0.5,
		2, 1.2, -0.5,
		2, 1.2, 0.5
	]);

	window1 = new THREE.Line2( window1Geometry, matLine );
	window1.computeLineDistances();
	window1.scale.set( 1, 1, 1 );
	scene.add( window1 );

	// GAME SPHERE

	// materials

	var uniforms = { 'widthFactor': { value: 1 } };

	var gameSphereMaterial = new THREE.ShaderMaterial({

		uniforms: uniforms,
		vertexShader: shaders.vertexShader,
		fragmentShader: shaders.fragmentShader,
		side: THREE.DoubleSide

	});

	gameSphereMaterial.extensions.derivatives = true;

	//

	var gameSphereFailureMaterial = new THREE.ShaderMaterial({

		uniforms: uniforms,
		vertexShader: shaders.vertexShader,
		fragmentShader: shaders.fragmentShaderRed,
		side: THREE.DoubleSide

	});

	gameSphereFailureMaterial.extensions.derivatives = true;

	// geometry

	var sphereGeometry = new THREE.IcosahedronBufferGeometry( GAME_SPHERE_RADIUS, 1 );
	sphereGeometry.deleteAttribute( 'normal' );
	sphereGeometry.deleteAttribute( 'uv' );

	setupAttributes( sphereGeometry );

	gameSphereMesh = new THREE.Mesh( sphereGeometry, gameSphereMaterial );
	gameSphereMesh.position.copy( GAME_SPHERE_CENTER );

	scene.add( gameSphereMesh );

	function setupAttributes( geometry ) {

		var vectors = [
			new THREE.Vector3( 1, 0, 0 ),
			new THREE.Vector3( 0, 1, 0 ),
			new THREE.Vector3( 0, 0, 1 )
		];

		var position = geometry.attributes.position;
		var centers = new Float32Array( position.count * 3 );

		for ( var i = 0, l = position.count; i < l; i ++ ) {

			vectors[ i % 3 ].toArray( centers, i * 3 );

		}

		geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

	};

	// CONTROLLERS

	controllerRight = {
		mesh: renderer.xr.getController(0)
	};

	controllerLeft = {
		mesh: renderer.xr.getController(1)
	};

	[ controllerRight, controllerLeft ].forEach( (controller)=> {

		controller.mesh.addEventListener( 'connected', function ( event ) {

			// https://www.w3.org/TR/webxr/#xrinputsource-interface
			controller.inputSource = event.data;

		});

		//

		controller.body = new CANNON.Body({
			mass: 0.1,
			position: new CANNON.Vec3(
				controller.mesh.position.x,
				controller.mesh.position.y,
				controller.mesh.position.z
			),
			velocity: new CANNON.Vec3( 0, 0, 0 ),
			fixedRotation: true
		});

		var shape = new CANNON.Cylinder( 0.1, 0.1, 0.01, 20 );
		var shapeQuaternion = new CANNON.Quaternion();
		shapeQuaternion.setFromEuler( 0, Math.PI / 2, 0, "XYZ" );
		controller.body.addShape( shape, null, shapeQuaternion );

		cannonWorld.addBody( controller.body );

		//

		controller.helper = CANNON.Demo.prototype.addVisual( controller.body );

		scene.add( controller.helper );

		//

		controller.mesh.addEventListener('selectstart', ()=>{
			gameControl.start();
		});

		controller.mesh.addEventListener('squeezestart', ()=>{
			gameControl.start();
		});

	});

	scene.add( controllerRight.mesh, controllerLeft.mesh );

	// FUNCTIONS

	function addBall() {

		var newBallColor = 0xffffff * Math.random();

		animationManager.createBallChargingAnim( newBallColor, ()=>{

			// abort if game is paused
			if ( gameControl.params.isGamePaused ) return 

			// avoid accidental double-hits
			if ( lastBallPop + BALL_POP_MIN_SPAN > Date.now() ) return

			lastBallPop = Date.now();

			//

			var newVelocity = new CANNON.Vec3(
				Math.random() - 0.5,
				Math.random() - 0.5,
				Math.random() - 0.5
			);
			newVelocity.normalize();
			newVelocity.scale( MIN_BALL_VELOCITY + (Math.random() * ( MAX_BALL_VELOCITY - MIN_BALL_VELOCITY )), newVelocity );

			var ballMesh = new THREE.Mesh(
				new THREE.SphereBufferGeometry( BALL_RADIUS, 16, 16 ),
				new THREE.MeshLambertMaterial({ color: newBallColor })
			);

			var ball = {

				mesh: ballMesh,

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

			ball.body.customType = "ball" ;
			ball.body.rootMesh = ballMesh ;

			ball.body.addEventListener("collide",function(e){

				if ( audio ) audio.playBounce( e.target.rootMesh );

				if ( e.body.customType !== "ball" ) {

					// addBall();

				};

			});

			scene.add( ball.mesh );
			cannonWorld.addBody( ball.body );

			balls.push( ball );

		});

	};

	//

	function emptyBallsMesh() {

		for ( let i = balls.length -1 ; i > -1 ; i -- ) {

			scene.remove( balls[ i ].mesh );
			balls[ i ].mesh.geometry.dispose();
			balls[ i ].mesh.material.dispose();

			balls.pop();

		};

	};

	function emptyBallsPhysics() {

		balls.forEach( (ball)=> {

			setTimeout( ()=> {
				cannonWorld.removeBody( ball.body );
			}, 0 );

		});

	};

	//

	function markFailureBall( failureBall ) {

		failureBall.mesh.scale.setScalar( 1.2 );
		failureBall.mesh.material = FAILURE_BALL_MATERIAL;

	};

	function setSphereFailureMaterial() {
		gameSphereMesh.material = gameSphereFailureMaterial ;
	};

	function setSphereBasicMaterial() {
		gameSphereMesh.material = gameSphereMaterial ;
	};

	//

	return {
		BALL_RADIUS,
		GAME_SPHERE_CENTER,
		GAME_SPHERE_RADIUS,
		balls,
		addBall,
		emptyBallsMesh,
		emptyBallsPhysics,
		controllerRight,
		controllerLeft,
		markFailureBall,
		setSphereFailureMaterial,
		setSphereBasicMaterial
	};

};