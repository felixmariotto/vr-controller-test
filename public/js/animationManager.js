
function AnimationManager() {

	// BALL CHARGING ANIMATION

	const BALL_CHARGING_PARTICLE_NUMBER = 10 ;
	const BALL_CHARGING_PARTICLE_RADIUS = 0.01 ;
	const BALL_CHARGING_PARTICLE_DISTANCE = 0.1 ;
	const BALL_CHARGING_PARTICLE_COLOR = 0xff0000 ;

	var ballChargingContainer = new THREE.Group();
	ballChargingContainer.position.copy( assetManager.GAME_SPHERE_CENTER );
	scene.add( ballChargingContainer );

	var particleMaterial = new THREE.MeshLambertMaterial({ color: BALL_CHARGING_PARTICLE_COLOR });

	for ( let i=0 ; i<BALL_CHARGING_PARTICLE_NUMBER ; i++ ) {

		let particle = new THREE.Mesh(
				new THREE.SphereBufferGeometry( BALL_CHARGING_PARTICLE_RADIUS, 6, 6 ),
				particleMaterial
			);
		particle.position.x += BALL_CHARGING_PARTICLE_DISTANCE;

		let particleContainer = new THREE.Group();
		particleContainer.rotation.y += ( (2 * Math.PI) / (BALL_CHARGING_PARTICLE_NUMBER + 1) ) * i ;
		console.log( ballChargingContainer.rotation.y )

		particleContainer.add( particle );
		ballChargingContainer.add( particleContainer );
		
	};

	// FUNCTIONS

	function update( delta ) {

		ballChargingContainer.children.forEach((child)=> {
			child.rotation.y += 0.1 ;
		});

		ballChargingContainer.rotation.x += 0.01 ;
		ballChargingContainer.rotation.z += 0.01 ;

	};

	return {
		update
	};

};