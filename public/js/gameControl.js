
var guiInputHelper ;

function GameControl() {

	var settings = {
        'speed':20,
        'friction':0.1
      }

	const gui = dat.GUIVR.create( 'Empty GUI' );
	
	gui.position.set(-0.5, 0, 0);

	gui.add(settings, 'speed').listen();
	gui.add(settings, 'friction').listen();

	scene.add( gui );

	gui.position.set( 1, 0.9, -1 );
	gui.rotation.x -= Math.PI / 6 ;

	dat.GUIVR.enableMouse( camera );

	// console.log( assetManager.controllerRight.mesh )

	guiInputHelper = dat.GUIVR.addInputObject( assetManager.controllerRight.mesh )
	scene.add( guiInputHelper );

	console.log( guiInputHelper )

};