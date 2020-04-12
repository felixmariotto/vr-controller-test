
function loop() {

	var time = performance.now() * 0.00002;
	// orbitGroup.rotation.y = time;

	renderer.render( scene, camera );

};