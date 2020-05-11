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
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// load an environment map
var envMap = new THREE.CubeTextureLoader()
	.setPath('assets/')
	.load( ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

scene.background = envMap;

// create a loop fort object creation
for(i=0; i<=num; i++) {
	// create a 3D Torus knot object
	var geometry = new THREE.SphereBufferGeometry( 1, 30, 30 );

	// create a Physical material with the loaded texture and environment map
	var material = new THREE.MeshPhysicalMaterial( { envMap:envMap, metalness:1.0, roughness:0.0 });

	// create object
	var object = new THREE.Mesh( geometry, material );

	// set random position
	object.position.set(Math.random() * 20.0 -10.0, Math.random() * 20 -10.0, Math.random() * 20 -10.0 );

	// calc distance as a constant and assign to object
	var a = new THREE.Vector3 ( 0, 0, 0 );
	var b = object.position;
	var d = a.distanceTo( b );
	object.distance = d;

	// define two random but constantn angles in radians
	object.radians = Math.random() * 360 * Math.PI/180;				// Initial angle
	object.radians2 = Math.random() * 360 * Math.PI/180;			// Initial angle

	// add object to the scene and to the array
	scene.add( object );
	objects.push ( object );

}

// render the scene
var animate = function () {
	requestAnimationFrame( animate );
	for ( i=0; i<=num; i++) {
		var o = objects[i];
		// update angle of rotation for the object
		if (i % 2 == 0) {
			o.radians += .01;
			o.radians2 += .01;
		} else {
			o.radians -= .01;
			o.radians2 -= .01;
		}
		o.position.x = (Math.cos(o.radians) * o.distance);
		o.position.z = (Math.sin(o.radians) * o.distance);
		o.position.y = (Math.sin(o.radians2) * o.distance * .5);
	}
	renderer.render( scene, camera );
}
animate();


// window resize handler
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerheight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.addEventListener( 'mousedown', onDocumentMouseDown, false);

document.addEventListener( 'mousemove', onDocumentMouseMove, false);

document.addEventListener( 'touchstart', onDocumentTouchStart, false);

function onDocumentMouseDown( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera ( mouse, camera );
	// check for intersecting objects
	var intersects = raycaster.intersectObjects( objects, true );
	if (intersects.length > 0) {
		active = intersects[0].object;			// get the first obejct intersected
		// change its material to a random colour
		active.material.color.setHex( Math.random() * 0xffffff );
	}
}

function onDocumentMouseMove( event ) {
	// event.preventDefault();
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera ( mouse, camera );
	// check for intersecting objects
	var intersects = raycaster.intersectObjects( objects, true );
	if (intersects.length > 0) {
		document.body.style.cursor = "pointer";		// change cursor to a pointer
		// change its material to a random colour
	} else {
		document.body.style.cursor = "default";	
	}
}

function onDocumentTouchStart (event) {
	if (event.touches.length === 1) {
		event.preventDefault();
		mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera ( mouse, camera );
		// check for intersecting objects
		var intersects = raycaster.intersectObjects( objects, true );
		if (intersects.length > 0) {
			active = intersects[0].object;			// get the first obejct intersected
			// change its material to a random colour
			active.material.color.setHex( Math.random() * 0xffffff );
		}

	}
}
