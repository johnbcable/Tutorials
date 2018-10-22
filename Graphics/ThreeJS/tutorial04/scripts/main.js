// Set up global vars
var objects=[];				// collection of objects
var num=20; 				// number of objects
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var fieldOfView = 45;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPane = .1;
var farClippingPane = 1000;

var cube;

// create a scene object
var scene = new THREE.Scene();

// create a camera to view the scene
var camera =  new THREE.PerspectiveCamera( fieldOfView, aspect, nearClippingPane, farClippingPane );
// move camera back
camera.position.set( 0.0, -1.0, 10.0 );
camera.rotation.y=.5;

// create a renderer
var renderer = new THREE.WebGLRenderer( {
	antialias: true
});
renderer.setPixelRation( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// load an environment map
var envMap = new THREE.CubeTextureLoader()
	.setPath('assets/')
	.load( ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
// create a 3D Torus knot object
// var geometry = new THREE.TorusKnotBufferGeometry( 1, .4, 60, 60 );

// create a 3D Torus knot object
var geometry = new THREE.SphereBufferGeometry( 2, 60, 60 );

// load texture
var texture = new THREE.TextureLoader().load("assets/rock_01_diffusion.jpg");
// set some texture properties
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 1 );

// create a material with the loaded texture
//var material = new THREE.MeshBasicMaterial( { map: texture });

// create a Lambert material with the loaded texture
// var material = new THREE.MeshLambertMaterial( { map: texture });

// create a Phong material with the loaded texture
// var material = new THREE.MeshPhongMaterial( { map: texture, specular: 0x333333, reflectivity:1.0 });

// create a Physical material with the loaded texture and environment map
var material = new THREE.MeshPhysicalMaterial( { map: texture, envMap:envMap, metalness:1.0, roughness:0.2 });

// apply environment map to scene
scene.background = envMap;

// create an ambient light
var light = new THREE.AmbientLight( 0xffeecc, .4 );
scene.add( light );

// create a directional light
var dirlight = new THREE.DirectionalLight( 0xffdd99, 1.9 );
scene.add( dirlight );
dirlight.position.set( -10, 10, 0 );

// create a mesh from the geometry and material
var object = new THREE.Mesh( geometry, material );
object.castShadow = true;

// add the cube to the scene
scene.add( object );

// render the scene
var animate = function () {
	requestAnimationFrame( animate );
	object.rotation.x += 0.01;
	object.rotation.y += 0.03;
	renderer.render( scene, camera );
}
animate();


// window resize handler
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerheight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

