
var dataEx = [
    ['1 Visit', 352000],
    ['2 Visits', 88000],
    ['3+ Visits', 42000]
  ],
  len = dataEx.length,
  sum = 0,
  minHeight = 0.05,
  data = [];

//specify your percent of prior visit value manually here:

var perc = [100, 25, 48];

for (var i = 0; i < len; i++) {
  sum += dataEx[i][1];
}

for (var i = 0; i < len; i++) {
  var t = dataEx[i],
    r = t[1] / sum;
  data[i] = {
    name: t[0],
    y: (r > minHeight ? t[1] : sum * minHeight),
    percent: perc[i], // <----- this here is manual input
    //percent: Math.round(r * 100),    <--- this here is mathematical
    label: t[1]
  }
}
console.log(dataEx, data)



var renderer = new THREE.WebGLRenderer();
var w = 300;
var h = 200;
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45, // Field of view
  w / h, // Aspect ratio
  0.1, // Near
  10000 // Far
);
controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 15);
camera.lookAt(new THREE.Vector3(0, 60, 0));
controls.target.set(0, 10, 0);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(20, 20, 20);
scene.add(light);
var light1 = new THREE.AmbientLight(0x808080);
light1.position.set(20, 20, 20);
scene.add(light1);
var light2 = new THREE.PointLight(0xFFFFFF);
light2.position.set(-20, 20, -20);
scene.add(light2);
var light3 = new THREE.PointLight(0xFFFFFF);
light3.position.set(-20, -20, -20);
scene.add(light3);

function makeCanvasTexture(color, text) {
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  var ctx = canvas.getContext('2d');
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = "30px Arial";
  ctx.fillText(text, (canvas.width / 2) | 0, (canvas.height / 2) | 0);

  var tex = new THREE.Texture(canvas)
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function makePlane(color, text, percent, position) {
  var geom = new THREE.PlaneGeometry(1, 1);
  var material = new THREE.MeshLambertMaterial({
    color: 'white',
    side: THREE.DoubleSide,
    map: makeCanvasTexture(color, text)
  });
  var npct = percent / 100;
  material.map.repeat.set(1, npct);
  material.map.offset.set(0, 0.5 * (1 - npct));
  var mesh = new THREE.Mesh(geom, material);

  mesh.position.y = position;
  mesh.scale.y *= percent / 100;
  return mesh;
}

renderer.setClearColor(0xdddddd, 1);
var root = new THREE.Object3D();
scene.add(root);
root.scale.multiplyScalar(10);
var yOffset = 0;
var colors = ['red', 'green', 'yellow']
for (var i = 0; i < data.length; i++) {
  yOffset += data[i].percent / 200
  var plane = makePlane(colors[i], data[i].name, data[i].percent, yOffset);
  root.add(plane);
  yOffset += data[i].percent / 200
  yOffset += 0.05
}

(function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  var pnow = performance.now()*0.001;
  controls.target.y = (Math.sin(pnow)*10)+10
})();
