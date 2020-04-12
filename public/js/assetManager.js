
function AssetManager() {

	// room

	room = new THREE.LineSegments(
			new THREE.BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
			new THREE.LineBasicMaterial( { color: 0x808080 } )
		);
	scene.add( room );

	// game sphere

	sphereSpace = new THREE.Group();
	sphereSpace.position.z -= 0.5;
	sphereSpace.position.y += 1;
	scene.add( sphereSpace );

	
	sphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry(GAME_SPHERE_RADIUS, 16, 16),
			new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00e5ff })
		);
	
	sphereSpace.add( sphere );

	/////////////////////
	///    CONTROLLERS
	/////////////////////

	//

	controllerRight = renderer.xr.getController(0);
	controllerLeft = renderer.xr.getController(1);

	scene.add( controllerRight, controllerLeft );

	controllerRight.addEventListener('selectstart', ()=>{
		addBall();
	});

	controllerRight.addEventListener('squeezestart', ()=>{
		ballSpeed = SLOW_BALL_SPEED;
	});

	controllerRight.addEventListener('squeezeend', ()=>{
		ballSpeed = FAST_BALL_SPEED;
	}); 

	/*
	session.addEventListener( 'select', onSessionEvent );
	session.addEventListener( 'selectstart', onSessionEvent );
	session.addEventListener( 'selectend', onSessionEvent );
	session.addEventListener( 'squeeze', onSessionEvent );
	session.addEventListener( 'squeezestart', onSessionEvent );
	session.addEventListener( 'squeezeend', onSessionEvent );
	session.addEventListener( 'end', onSessionEnd );
	*/

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

	//

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

};