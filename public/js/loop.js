
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	animate.update( delta );

	renderer.render( scene, camera );

};