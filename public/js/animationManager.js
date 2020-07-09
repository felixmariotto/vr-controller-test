
function AnimationManager() {

	// BALL CHARGING ANIMATION

	let ballChargingAnim;

	const BALL_CHARGING_CORE_RADIUS = assetManager.BALL_RADIUS ;
	const BALL_CHARGING_PARTICLE_NUMBER = 3 ;
	const BALL_CHARGING_PARTICLE_RADIUS = assetManager.BALL_RADIUS / 3 ;
	const BALL_CHARGING_START_DISTANCE = 0.01 ;
	const BALL_CHARGING_END_DISTANCE = 0.035 ;
	const BALL_CHARGING_ANIM_DURATION = 4000; //ms

	function createBallChargingAnim( color, callbackWhenFinished ) {

		if ( ballChargingAnim ) deleteBallChargingAnim();

		var globalContainer = new THREE.Group();
		globalContainer.position.copy( assetManager.GAME_SPHERE_CENTER );
		globalContainer.userData.localTime = BALL_CHARGING_ANIM_DURATION;
		globalContainer.userData.callbackWhenFinished = callbackWhenFinished;
		globalContainer.userData.coreFinalSize = BALL_CHARGING_CORE_RADIUS;
		scene.add( globalContainer );

		var particleMaterial = new THREE.MeshLambertMaterial({ color: color });

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
			particle.position.x += BALL_CHARGING_START_DISTANCE;

			let particleContainer = new THREE.Group();
			particleContainer.rotation.y += ( (2 * Math.PI) / BALL_CHARGING_PARTICLE_NUMBER ) * i ;

			particleContainer.add( particle );
			globalContainer.add( particleContainer );

			ballChargingAnim = globalContainer;
			
		};

	};

	function deleteBallChargingAnim() {

		ballChargingAnim.traverse((child)=>{
			if ( child.material ) child.material.dispose();
			if ( child.mesh ) child.mesh.dispose();
		});

		scene.remove( ballChargingAnim );

		ballChargingAnim = undefined;

	};

	// FUNCTIONS

	let popBall;

	function update( delta ) {

		// construct new ball if nothing is blocking

		if ( popBall ) {

			const isBlocking = assetManager.balls.reduce( (isBlocking, ball) => {

				if (
					ball.mesh.position.distanceTo( assetManager.GAME_SPHERE_CENTER ) <
					( assetManager.BALL_RADIUS * 2 )
				) {
					
					return true
					
				} else {

					return isBlocking

				};

			}, false );

			if ( !isBlocking ) {

				if ( ballChargingAnim.userData.callbackWhenFinished ) {
					ballChargingAnim.userData.callbackWhenFinished();
				};

				deleteBallChargingAnim();

				popBall = false

			};

		};

		// update ball charging anim

		if ( !ballChargingAnim ) return

		ballChargingAnim.userData.localTime -= delta * 1000 ;

		let i = ( BALL_CHARGING_ANIM_DURATION - ballChargingAnim.userData.localTime ) /
				BALL_CHARGING_ANIM_DURATION;

		if ( !popBall ) ballChargingAnim.userData.core.scale.setScalar( i );

		ballChargingAnim.children.forEach((child)=> {

			child.rotation.y += 0.2 ;

			if ( child.children.length > 0 ) {

				if ( !popBall ) child.children[ 0 ].position.x = (
					(( BALL_CHARGING_END_DISTANCE - BALL_CHARGING_START_DISTANCE ) * i ) +
					BALL_CHARGING_START_DISTANCE
				);

				if ( !popBall ) child.children[ 0 ].scale.setScalar( i );

			};

		});

		ballChargingAnim.rotation.x += 0.05 ;
		ballChargingAnim.rotation.z += 0.05 ;

		if ( ballChargingAnim.userData.localTime < 0 ) {

			popBall = true;

		};

	};

	return {
		update,
		createBallChargingAnim
	};

};