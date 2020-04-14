
function AnimationManager() {

	// BALL CHARGING ANIMATION

	ballChargingAnims = [];

	const BALL_CHARGING_CORE_RADIUS = assetManager.BALL_RADIUS ;
	const BALL_CHARGING_PARTICLE_NUMBER = 5 ;
	const BALL_CHARGING_PARTICLE_RADIUS = assetManager.BALL_RADIUS / 2 ;
	const BALL_CHARGING_PARTICLE_DISTANCE = 0.05 ;
	const BALL_CHARGING_PARTICLE_COLOR = 0xff0000 ;
	const BALL_CHARGING_ANIM_DURATION = 5000; //ms

	createBallChargingAnim()

	function createBallChargingAnim( callbackWhenFinished ) {

		var globalContainer = new THREE.Group();
		globalContainer.position.copy( assetManager.GAME_SPHERE_CENTER );
		globalContainer.userData.localTime = BALL_CHARGING_ANIM_DURATION;
		globalContainer.userData.callbackWhenFinished = callbackWhenFinished;
		globalContainer.userData.coreFinalSize = BALL_CHARGING_CORE_RADIUS;
		scene.add( globalContainer );

		var particleMaterial = new THREE.MeshLambertMaterial({ color: BALL_CHARGING_PARTICLE_COLOR });

		var core = new THREE.Mesh(
			new THREE.SphereBufferGeometry( BALL_CHARGING_CORE_RADIUS, 6, 6 ),
			particleMaterial
		);

		globalContainer.add( core );
		globalContainer.userData.core = core ;

		for ( let i=0 ; i<BALL_CHARGING_PARTICLE_NUMBER ; i++ ) {

			let particle = new THREE.Mesh(
					new THREE.SphereBufferGeometry( BALL_CHARGING_PARTICLE_RADIUS, 6, 6 ),
					particleMaterial
				);
			particle.position.x += BALL_CHARGING_PARTICLE_DISTANCE;

			let particleContainer = new THREE.Group();
			particleContainer.rotation.y += ( (2 * Math.PI) / BALL_CHARGING_PARTICLE_NUMBER ) * i ;

			particleContainer.add( particle );
			globalContainer.add( particleContainer );
			ballChargingAnims.push( globalContainer );
			
		};

	};

	function deleteBallChargingAnim( globalContainer ) {

		globalContainer.traverse((child)=>{
			if ( child.material ) child.material.dispose();
			if ( child.mesh ) child.mesh.dispose();
		});

		scene.remove( globalContainer );

		ballChargingAnims.splice( ballChargingAnims.indexOf( globalContainer ), 1 );

	};

	// FUNCTIONS

	function update( delta ) {

		ballChargingAnims.forEach( (globalContainer)=> {

			globalContainer.children.forEach((child)=> {
				child.rotation.y += 0.03 ;
			});

			globalContainer.rotation.x += 0.01 ;
			globalContainer.rotation.z += 0.01 ;

			globalContainer.userData.localTime -= delta * 1000 ;

			globalContainer.userData.core.scale.setScalar(
				( BALL_CHARGING_ANIM_DURATION - globalContainer.userData.localTime ) /
				BALL_CHARGING_ANIM_DURATION
			);

			if ( globalContainer.userData.localTime < 0 ) {

				setTimeout(()=>{

					deleteBallChargingAnim( globalContainer );
					if ( globalContainer.userData.callbackWhenFinished ) {
						globalContainer.userData.callbackWhenFinished();
					};

				}, 0 );
			};

		});

	};

	return {
		update,
		createBallChargingAnim
	};

};