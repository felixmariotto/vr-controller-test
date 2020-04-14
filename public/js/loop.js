
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	animate.update( delta );
	animationManager.update( delta );

	renderer.render( scene, camera );

};