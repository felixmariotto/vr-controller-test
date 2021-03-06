
var assetManager ;

var scene, renderer, camera, stats, gltfLoader, clock, gameControl, audio, screens;
var cannonWorld, animate;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var gameSpeed = 1 ;

// LISTENERS

window.addEventListener('load', function() {
	main();
});

window.addEventListener( 'resize', onWindowResize, false );

// MAIN FUNCTION

function main() {

	clock = new THREE.Clock();

	// SCENE

	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0x555555 );

	// CUBEMAP

    var path = '../assets/skybox/';
    var format = '.png';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;

    scene.background = reflectionCube;

	// CAMERA

	camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
	camera.position.set( 3.1, 1.5, 3.1 );
	camera.lookAt( 0, 1, 0 );
	scene.add( camera );

	// LIGHTS

	var hemLight = new THREE.AmbientLight( 0xffffff, 0.8 ); // soft white light
	scene.add( hemLight );

	// RENDERER

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.autoClear = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.GammaEncoding;
	renderer.gammaFactor = 2.2;
	renderer.xr.enabled = true;
	document.body.appendChild( renderer.domElement );

	var vrButton = VRButton.createButton( renderer );
	document.body.appendChild( vrButton );
	vrButton.addEventListener('click', ()=> {
		audio = Audio();
	});

	// CANNON JS

	cannonWorld = new CANNON.World();
	// cannonWorld.gravity.set(0, -9.82, 0 ); // m/s²

	//

	gltfLoader = new THREE.GLTFLoader();

	//

	assetManager = AssetManager();
	animationManager = AnimationManager();
	animate = Animate();
	gameControl = GameControl();
	screens = Screens();

	//

	renderer.setAnimationLoop( loop );

};

// RESIZE

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};