// Set up global vars
var camera, scene, renderer, object, controls
var fieldOfView = 75;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPane = 1;
var farClippingPane = 2000;

// create a scene object
var scene = new THREE.Scene();

// create a camera to view the scene
var camera =  new THREE.PerspectiveCamera( fieldOfView, aspect, nearClippingPane, farClippingPane );

camera.position.z = 15;
scene.add( camera );

// create a renderer
var renderer = new THREE.WebGLRenderer( {
	antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaOutput = true;

document.body.appendChild( renderer.domElement );

// add orbit controls to the camera
controls = new THREE.OrbitControls( camera );
controls.target.set( 0, 0, 0 );
controls.update();

// add ambient light
var ambientLight = new THREE.AmbientLight( 0xffffff, .2 );
scene.add( ambientLight );
// add point light
var pointLight = new THREE.PointLight( 0xffcc66, 0.6 );
camera.add ( pointLight );

// load an environment map
var envMap = new THREE.CubeTextureLoader()
	.setPath('assets/')
	.load( ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
// set as skybox
scene.background = envMap;

/*
 create a loading manager and handlkers
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
	console.log( item, loaded, total );
};
// load complete
manager.onLoad = function() {
	console.log("Finished loading models & textures");
};

// textures
textures = [];
textureAssets = [
	{"file":"assets/sword/German_Bastard_Sword_DIFFUSE.jpg", "name": "diffuse"},
	{"file":"assets/sword/German_Bastard_Sword_SPECULAR.jpg", "name": "specular"},
	{"file":"assets/sword/German_Bastard_Sword_NORMALMAP.jpg", "name": "normal"},
];
*/

// load glTF model / scene
var loader = new THREE.GLTFLoader();
loader.load( 'assets/pony/scene.gltf', function( gltf ) {
	// hndkle loaded file here
	gltf.scene.traverse ( function ( child ) {
		if ( child.isMesh) {
			child.material.envMap = envMap;
		}
	});
	// adjust position and scale
	gltf.scene.scale.set( .005, .005, .005 );
	gltf.scene.position.y = -1;
	scene.add (gltf.scene);
})
/* assign each loaded txture to a texture object
textureAssets.forEach(function(t) {
	textures[t.name] = new THREE.Texture();
	var loader = new THREE.ImageLoader( manager );
	loader.load( t.file, function( image ) {
		textures[t.name].image = image;
		textures[t.name].needsUpdate = true;
	});
});
*/

/* load in tne OBJ model
var loader = new THREE.OBJLoader( manager );
loader.load( 'assets/sword/German_Bastard_Sword.obj', function ( obj) {
	// handle loaded file here
	console.log(object);
	object=obj;
	object.traverse( function( child ) {
		if ( child instanceof THREE.Mesh ) {
			// assign tedxtures here
			child.mterial = new THREE.MeshPhysicalMaterial(
				{ 
					map:textures["diffuse"],
					specularMap:textures["specular"],
					normalMap:textures["normal"], envMap: envMap
				});
		}
	});
	// adjust position and scale
	object.position.set( 5, 0, 0 );
	object.rotation.z=Math.PI/180*70;
	object.scale.set( .25, .25, .25 );
	scene.add( object );
});
*/

// render the scene
var animate = function () {
	requestAnimationFrame( animate );
	if ( object ) {
		object.rotation.x+=.01;
	}
	renderer.render( scene, camera );
}
animate();


// window resize handler
/*
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
*/
