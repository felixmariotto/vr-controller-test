
window.addEventListener('load', function() {
	main();
})

var scene, renderer, camera, stats, gltfLoader;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var controllerRight, controllerLeft ;

function main() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
	camera.position.set( 0, 1.6, 3 );
	scene.add( camera );

	// room

	room = new THREE.LineSegments(
					new THREE.BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
					new THREE.LineBasicMaterial( { color: 0x808080 } )
				);
				scene.add( room );

	//

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 0, 1 );
	scene.add( light );
	light.target.position.set( 0, 0, - 2 );
	scene.add( light.target );

	var hemLight = new THREE.AmbientLight( 0xffffff, 0.8 ); // soft white light
	scene.add( hemLight );

	//

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.autoClear = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.xr.enabled = true;
	document.body.appendChild( renderer.domElement );

	document.body.appendChild( VRButton.createButton( renderer ) );

	//

	controllerRight = renderer.xr.getController(0);
	controllerLeft = renderer.xr.getController(1);

	scene.add( controllerRight, controllerLeft );

	var handMaterial = new THREE.MeshLambertMaterial()

	function Hand() {
		return (
			new THREE.Mesh(
				new THREE.SphereBufferGeometry( 0.1, 8, 8 ),
				handMaterial
			)
		);
	};

	controllerRight.addEventListener('selectstart', ()=>{
		handMaterial.color = new THREE.Color( 0x000000 );
	});

	controllerRight.addEventListener('squeezestart', ()=>{
		handMaterial.color = new THREE.Color( 0x00ff00 );
	});

	/*
	session.addEventListener( 'select', onSessionEvent );
	session.addEventListener( 'selectstart', onSessionEvent );
	session.addEventListener( 'selectend', onSessionEvent );
	session.addEventListener( 'squeeze', onSessionEvent );
	session.addEventListener( 'squeezestart', onSessionEvent );
	session.addEventListener( 'squeezeend', onSessionEvent );
	session.addEventListener( 'end', onSessionEnd );
	*/

	//

	gltfLoader = new THREE.GLTFLoader();

	gltfLoader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket.glb', (glb)=> {
		addRacketToController( glb, controllerLeft );
	});

	gltfLoader.load('https://test-threejs-vr.s3.us-east-2.amazonaws.com/racket.glb', (glb)=> {
		addRacketToController( glb, controllerRight );
	});

	function addRacketToController( glb, controller ) {
		glb.scene.scale.setScalar( 0.35 );
		glb.scene.rotation.x -= Math.PI / 2;
		controller.add( glb.scene );
	};

	//

	window.addEventListener( 'resize', onWindowResize, false );

	//

	renderer.setAnimationLoop( loop );

};



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};