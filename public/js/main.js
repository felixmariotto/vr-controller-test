
window.addEventListener('load', function() {
	main();
})

var scene, renderer, camera, stats;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var controllerRight, controllerLeft ;

function main() {

	var background = new THREE.CubeTextureLoader()
		.setPath( 'https://test-threejs-vr.s3.us-east-2.amazonaws.com/assets/milkyway-cube/' )
		.load( [ 'dark-s_px.jpg', 'dark-s_nx.jpg', 'dark-s_py.jpg', 'dark-s_ny.jpg', 'dark-s_pz.jpg', 'dark-s_nz.jpg' ] );

	scene = new THREE.Scene();
	scene.background = background;

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
	camera.position.set( 0, 1.6, 3 );
	scene.add( camera );

	// room

	room = new THREE.LineSegments(
					new THREE.BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
					new THREE.LineBasicMaterial( { color: 0x808080 } )
				);
				scene.add( room );

	// lensflare
	var loader = new THREE.TextureLoader();
	var texture0 = loader.load( "https://test-threejs-vr.s3.us-east-2.amazonaws.com/assets/lensflare0.png" );
	var texture3 = loader.load( "https://test-threejs-vr.s3.us-east-2.amazonaws.com/assets/lensflare3.png" );

	var lensflare = new THREE.Lensflare();
	lensflare.position.set( 0, 0, 10000 );
	lensflare.addElement( new THREE.LensflareElement( texture0, 500, 0 ) );
	lensflare.addElement( new THREE.LensflareElement( texture3, 60, 0.6 ) );
	lensflare.addElement( new THREE.LensflareElement( texture3, 70, 0.7 ) );
	lensflare.addElement( new THREE.LensflareElement( texture3, 120, 0.9 ) );
	lensflare.addElement( new THREE.LensflareElement( texture3, 70, 1 ) );
	scene.add( lensflare );

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

	function Hand() {
		return (
			new THREE.Mesh(
				new THREE.SphereBufferGeometry( 0.1, 8, 8 ),
				new THREE.MeshNormalMaterial()
			)
		);
	};

	controllerRight.add( Hand() );
	controllerLeft.add( Hand() );

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