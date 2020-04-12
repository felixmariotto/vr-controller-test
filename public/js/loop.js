
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	animate( delta );

	renderer.render( scene, camera );

};