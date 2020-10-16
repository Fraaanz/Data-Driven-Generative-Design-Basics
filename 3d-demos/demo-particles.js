// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';

// 🌐 GLOBAL VARIABLES -------------------------- 

var camera, scene, renderer, points;
var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
var lon = 0, lat = 0;
var phi = 0, theta = 0;

// 🌐 GROUPS SETTING -------------------------- 

var groupedObjectsA = new THREE.Group();

// 🚀 RUN MAIN FUNCTIONS -------------------------- 

init();
animate();

// 🎯 MAIN FUNCTION -------------------------- 

function init() {

  // 🎥 CAM SETTING -------------------------- 

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 110);
  camera.position.z = 5;

  // 🌇 SCENE SETTING -------------------------- 

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 0, 25);

  // 🔶 HELPER CUBES ✅ ----------------------- 

  helper();

  // 👇 YOUR 3D OBJECTS ✅ ----------------------- 




  var particles = 1000000;

  var geometry = new THREE.BufferGeometry();

  var positions = [];
  var colors = [];

  var color = new THREE.Color();

  var n = 1000, n2 = n / 2; // particles spread in the cube

  for ( var i = 0; i < particles; i ++ ) {

    // positions

    var x = (Math.random() * n - n2);
    var y = (Math.random() * n - n2);
    var z = (Math.random() * n - n2);

    positions.push( x/50, y/50, z/50);

    // colors

    var vx = ( x / n ) + 0.5;
    var vy = ( y / n ) + 0.5;
    var vz = ( z / n ) + 0.5;

    color.setRGB( vx, vy, vz );

    colors.push( color.r, color.g, color.b );

  }

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

  geometry.computeBoundingSphere();
  

  var material = new THREE.PointsMaterial( { size: 0.02, vertexColors: true } );

  points = new THREE.Points( geometry, material );
  scene.add( points );


  // 🌞 LIGHT SETTINGS -------------------------- 



  // 👉 🌇 MAKE IT VISIBLE -------------------------- 

  scene.add(groupedObjectsA);

  // 🎛 RENDER SETTINGS -------------------------- 

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio / 2);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 4.3;
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  // 🐭 PART OF MOUSE CONTOLL -------------------------- 

  document.addEventListener('mousedown', onDocumentMouseDown, true);
  document.addEventListener('wheel', onDocumentMouseWheel, false);

}

// 🔄 ANIMATION SETTINGS -------------------------- 

function animate() {
  requestAnimationFrame(animate);

  // MOUSE 
  lon += .15;
  lat = Math.max(- 85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);
  camera.position.x = 10 * Math.sin(phi) * Math.cos(theta);
  camera.position.y = 10 * Math.cos(phi);
  camera.position.z = 10 * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// 🐭 PART OF MOUSE CONTOLL -------------------------- 

function onDocumentMouseDown(event) {
  event.preventDefault();
  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;
  onPointerDownLon = lon;
  onPointerDownLat = lat;
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
}

// 🐭 PART OF MOUSE CONTOLL -------------------------- 

function onDocumentMouseMove(event) {
  lon = (event.clientX - onPointerDownPointerX) * 0.1 + onPointerDownLon;
  lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
}

// 🐭 PART OF MOUSE CONTOLL -------------------------- 

function onDocumentMouseUp() {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
}

// 🐭 PART OF MOUSE CONTOLL -------------------------- 

function onDocumentMouseWheel(event) {
  var fov = camera.fov + event.deltaY * 0.05;
  camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
  camera.updateProjectionMatrix();
}

// 🔶 These cubes help you to get an orientation in space -------------------------- 

function helper() {

  var helperObj, geometry, material;
  var helperObjSize = 0.1;
  var helperSize = 3;
  var helperloader = new THREE.FontLoader();

  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = 0; helperObj.position.y = 0; helperObj.position.z = 0; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = -helperSize; helperObj.position.y = -helperSize; helperObj.position.z = helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = -helperSize; helperObj.position.y = helperSize; helperObj.position.z = helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = helperSize; helperObj.position.y = helperSize; helperObj.position.z = helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = helperSize; helperObj.position.y = helperSize; helperObj.position.z = -helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = helperSize; helperObj.position.y = -helperSize; helperObj.position.z = -helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = helperSize; helperObj.position.y = -helperSize; helperObj.position.z = helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = -helperSize; helperObj.position.y = helperSize; helperObj.position.z = -helperSize; scene.add(helperObj);
  geometry = new THREE.BoxGeometry(helperObjSize, helperObjSize, helperObjSize); material = new THREE.MeshNormalMaterial(); helperObj = new THREE.Mesh(geometry, material);
  helperObj.position.x = -helperSize; helperObj.position.y = -helperSize; helperObj.position.z = -helperSize; scene.add(helperObj);
  
  helperloader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) { var geometry = new THREE.TextGeometry('X', {font: font, size: 0.2, height: 0.1, }); var material = new THREE.MeshNormalMaterial(); var helperTxt = new THREE.Mesh(geometry, material); helperTxt.position.x = 2.5; helperTxt.position.y = 0; helperTxt.position.z = 0; scene.add(helperTxt); });
  helperloader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) { var geometry = new THREE.TextGeometry('Y', {font: font, size: 0.2, height: 0.1, }); var material = new THREE.MeshNormalMaterial(); var helperTxt = new THREE.Mesh(geometry, material); helperTxt.position.x = 0; helperTxt.position.y = 2.5; helperTxt.position.z = 0; scene.add(helperTxt); });
  helperloader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) { var geometry = new THREE.TextGeometry('Z', {font: font, size: 0.2, height: 0.1, }); var material = new THREE.MeshNormalMaterial(); var helperTxt = new THREE.Mesh(geometry, material); helperTxt.position.x = 0; helperTxt.position.y = 0; helperTxt.position.z = 2.5; scene.add(helperTxt); });

  var dir = new THREE.Vector3(0, 1, 0);
  dir.normalize();
  var origin = new THREE.Vector3(0, 0, 0);
  var length = 2;
  var hex = 0x00ff00;
  var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);

  var dir = new THREE.Vector3(1, 0, 0);
  dir.normalize();
  var origin = new THREE.Vector3(0, 0, 0);
  var length = 2;
  var hex = 0x0000ff;
  var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);

  var dir = new THREE.Vector3(0, 0, 1);
  dir.normalize();
  var origin = new THREE.Vector3(0, 0, 0);
  var length = 2;
  var hex = 0xff0000;
  var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);
}