
function GameControl() {

	var settings = {
        'speed':20,
        'friction':0.1
      }

	const gui = dat.GUIVR.create( 'Empty GUI' );
	
	gui.position.set(-0.5, 0, 0);

	gui.add(settings, 'speed')
	gui.add(settings, 'friction')

	scene.add( gui );

	dat.GUIVR.enableMouse(camera);

	// Add right Vive controller
	const guiInput = dat.GUIVR.addInputObject( assetManager.controllerRight.mesh );
	scene.add( guiInput );

};