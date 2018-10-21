// Set up global vars
var fieldOfView = 75;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPane = .1;
var farClippingPane = 1000;

var cube;

// create a scene object
var scene = new THREE.Scene();

// create a camera to view the scene
var camera =  new THREE.PerspectiveCamera( fieldOfView, aspect, nearClippingPane, farClippingPane );
// move camera back
camera.position.z=15;

// create a renderer
var renderer = new THREE.WebGLRenderer( {
	antialias: true
})
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// create a £D object
var geometry = new THREE.TorusKnotBufferGeometry( 4, .5, 60, 60, 13, 10 );

// create a material 
var material = new THREE.MeshStandardMaterial();
/*
var material = new THREE.MeshNormalMaterial({
	wireframe:true
});
*/

// create a mesh from the geometry and material
var myobject = new THREE.Mesh( geometry, material );
myobject.castShadow = true;

// add the cube to the scene
scene.add( myobject );

/* create an ambient light
var light = new THREE.AmbientLight(0xffeec, .4);
scene.add( light );
light.position.set(3, 4, 15);
*/

// create a primary spotlight
var light = new THREE.SpotLight(0xfffff, .6);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500;
scene.add( light );
light.position.set(3, 4, 15);

// create a secondary spotlight
var seclight = new THREE.SpotLight(0xf0000, .4);
seclight.castShadow = true;
seclight.shadow.mapSize.width = 2048;
seclight.shadow.mapSize.height = 2048;
seclight.shadow.camera.near = 0.1;
seclight.shadow.camera.far = 500;
scene.add( seclight );
seclight.position.set(-5, 15, 5);

// Create a ground plane
var planeGeometry = new THREE.PlaneBufferGeometry( 500, 500, 32, 32 );
var planeMaterial = new THREE.MeshStandardMaterial( {
	color: 0xeeaa33
});
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = Math.PI/180*-90;
plane.position.y = -6;
plane.receiveShadow = true;
scene.add( plane );

// Create a back wall
var planeGeometry2 = new THREE.PlaneBufferGeometry( 500, 500, 32, 32 );
var planeMaterial2 = new THREE.MeshStandardMaterial( {
	color: 0xeeaa33
});
var plane2 = new THREE.Mesh( planeGeometry, planeMaterial );
plane2.position.z = -50;
plane2.receiveShadow = true;
scene.add( plane2 );


// render the scene
var animate = function () {
	requestAnimationFrame( animate );
	myobject.rotation.x += 0.01;
	myobject.rotation.y += 0.03;
	// Update renderer to use shadow map
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.render( scene, camera );
}
animate();


// window resize handler
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerheight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

