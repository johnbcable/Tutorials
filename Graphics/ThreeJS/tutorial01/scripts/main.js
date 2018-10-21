// Set up global vars
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
camera.position.z=5;

// create a renderer
var renderer = new THREE.WebGLRenderer( {
	antialias: true
})
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// create a £D object
var geometry = new THREE.BoxGeometry( 4, 2, .1 );

// create a material 
var material = new THREE.MeshNormalMaterial();
/*
var material = new THREE.MeshNormalMaterial({
	wireframe:true
});
*/

// create a mesh from the geometry and material
cube = new THREE.Mesh( geometry, material );

// add the cube to the scene
scene.add( cube );

// render the scene
var render = function () {
	requestAnimationFrame( render );

	/* set position
	cube.position.x=1;
	cube.position.z=.1;
	cube.position.y=-.1;

	// rotate the cube
	cube.rotation.y=Math.PI/180 * 45;
	cube.rotation.z=Math.PI/180 * -25;
	*/

	cube.rotation.x += 0.01;
	cube.rotation.z -= 0.01;
	cube.rotation.y -= 0.02;

	/*
	cube.position.x = 2 *Math.sin(cube.rotation.x);
	cube.position.z = 2 *Math.sin(cube.rotation.z);
	*/
	
	cube.position.x = .5 * Math.sin(cube.rotation.z);
	cube.position.z = 3 * Math.sin(cube.rotation.x + cube.rotation.y);

	renderer.render( scene, camera );	
};
render();

// window resize handler
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerheight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

