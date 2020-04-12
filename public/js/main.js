
window.addEventListener('load', function() {
	main();
});

var scene, renderer, camera, stats, gltfLoader, clock;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const FAST_BALL_SPEED = 0.5;
const SLOW_BALL_SPEED = 0.2;
const GAME_SPHERE_RADIUS = 0.5;

var controllerRight, controllerLeft ;
var sphereSpace;
var balls = [];
var ballSpeed = FAST_BALL_SPEED;
var gameSpeed = 1 ;

function main() {

	clock = new THREE.Clock();

	//

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x555555 );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
	camera.position.set( 0, 1.6, 3 );
	scene.add( camera );

	// room

	room = new THREE.LineSegments(
			new THREE.BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
			new THREE.LineBasicMaterial( { color: 0x808080 } )
		);
	scene.add( room );

	// game sphere

	sphereSpace = new THREE.Group();
	sphereSpace.position.z -= 0.5;
	sphereSpace.position.y += 1;
	scene.add( sphereSpace );

	
	sphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry(GAME_SPHERE_RADIUS, 16, 16),
			new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00e5ff })
		);
	
	sphereSpace.add( sphere );
	

	//


	/*
	var uniforms = { 'widthFactor': { value: 2 } };

	var material = new THREE.ShaderMaterial({

		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.DoubleSide

	});

	material.extensions.derivatives = true;

	var geometry = new THREE.SphereBufferGeometry(GAME_SPHERE_RADIUS, 16, 16);

	geometry.deleteAttribute( 'normal' );
	geometry.deleteAttribute( 'uv' );

	setupAttributes( geometry );

	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.set( 40, 0, 0 );

	sphereSpace.add( sphere );
	*/

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
	// renderer.shadowMap.enabled = true;
	renderer.outputEncoding = THREE.GammaEncoding;
	renderer.gammaFactor = 2.2;
	renderer.xr.enabled = true;
	document.body.appendChild( renderer.domElement );

	document.body.appendChild( VRButton.createButton( renderer ) );

	//

	controllerRight = renderer.xr.getController(0);
	controllerLeft = renderer.xr.getController(1);

	scene.add( controllerRight, controllerLeft );

	controllerRight.addEventListener('selectstart', ()=>{
		addBall();
	});

	controllerRight.addEventListener('squeezestart', ()=>{
		ballSpeed = SLOW_BALL_SPEED;
	});

	controllerRight.addEventListener('squeezeend', ()=>{
		ballSpeed = FAST_BALL_SPEED;
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
		glb.scene.rotation.x -= Math.PI / 3.5;
		controller.add( glb.scene );
	};

	//

	window.addEventListener( 'resize', onWindowResize, false );

	//

	// addBall();

	renderer.setAnimationLoop( loop );

};



function addBall() {

	var ballMesh = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.02, 8, 8),
			new THREE.MeshLambertMaterial({ color: 0xffffff * Math.random() })
		);
	ballMesh.userData.velocity = new THREE.Vector3(
			Math.random(),
			Math.random(),
			Math.random()
		);

	sphereSpace.add( ballMesh );
	balls.push( ballMesh );

};



function setupAttributes( geometry ) {

	var vectors = [
		new THREE.Vector3( 1, 0, 0 ),
		new THREE.Vector3( 0, 1, 0 ),
		new THREE.Vector3( 0, 0, 1 )
	];

	var position = geometry.attributes.position;
	var centers = new Float32Array( position.count * 3 );

	for ( var i = 0, l = position.count; i < l; i ++ ) {

		vectors[ i % 3 ].toArray( centers, i * 3 );

	}

	geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

};



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};