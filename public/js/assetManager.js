
function AssetManager() {

	const GAME_SPHERE_RADIUS = 0.5;
	const BALL_RADIUS = 0.02;

	// Create a sphere

	world = new CANNON.World();
	world.gravity.set(0, 0, -9.82); // m/s²

	sphereBody = new CANNON.Body({
	   mass: 5, // kg
	   position: new CANNON.Vec3(0, 0, 1), // m
	   shape: new CANNON.Sphere( BALL_RADIUS )
	});
	world.addBody(sphereBody);

	// Create a plane
	var groundBody = new CANNON.Body({
	    mass: 0 // mass == 0 makes the body static
	});
	var groundShape = new CANNON.Plane();
	groundBody.addShape(groundShape);
	world.addBody(groundBody);

	visibleSphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry(BALL_RADIUS, 8, 8),
			new THREE.MeshNormalMaterial()
		);

	scene.add( visibleSphere );

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


}