// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';
import { EffectComposer } from '../sources/three.js-master/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../sources/three.js-master/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from '../sources/three.js-master/examples/jsm/postprocessing/GlitchPass.js';
import { HalftonePass } from '../sources/three.js-master/examples/jsm/postprocessing/HalftonePass.js';
import { AfterimagePass } from '../sources/three.js-master/examples/jsm/postprocessing/AfterimagePass.js';
import { UnrealBloomPass } from '../sources/three.js-master/examples/jsm/postprocessing/UnrealBloomPass.js';



// 🌐 GLOBAL VARIABLES -------------------------- 

var camera, scene, renderer, composer;
var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
var lon = 0, lat = 0;
var phi = 0, theta = 0;
var loopCount = 124;
var loopCountShift = 0;
var posX = 0;
var posY = 0;
var posZ = 0;
var distance = 0.2;
var newRow = loopCount / 5 * distance;
var glitchPass;

// 🌐 GROUPS SETTING -------------------------- 

var groupedObjectsA = new THREE.Group();
var groupedObjectsB = new THREE.Group();

// 🚀 RUN MAIN FUNCTIONS -------------------------- 

init();
animate();

// 🎯 MAIN FUNCTION -------------------------- 

function init() {

  // 🎥 CAM SETTING -------------------------- 

  camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 0.02, 55);
  camera.position.z = 0;
  camera.position.x = 0;
  camera.position.y = 0;

  // 🌇 SCENE SETTING -------------------------- 

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 15, 35);

  // 🔶 HELPER CUBES ✅ ----------------------- 

  //helper();

  // 👇 YOUR 3D OBJECTS ✅ ----------------------- 

  for (var i = 0; i <= 100; i++) {
    var cubePosX = Math.random() * 10;
    var cubePosY = Math.random() * 10;
    var cubePosZ = Math.random() * 10;

    var geometry = new THREE.BoxGeometry(0.06, 0.01, 60.05);
    var material = new THREE.MeshPhysicalMaterial({
      color: "#AAAAAA",
      reflectivity: 1,
      refractionRatio: 1,
      roughness: 0,
      metalness: 0,
      clearcoat: 1,
      side: THREE.DoubleSide,
      clearcoatRoughness: 0,
      transmission: 0,
      opacity: 1,
      transparent: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = cubePosX - 5;
    mesh.position.y = cubePosY - 5;
    mesh.position.z = cubePosZ - 5;
    groupedObjectsB.add(mesh);
  }

  var loader = new THREE.FontLoader();

  loader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) {

    var geometry = new THREE.TextGeometry('connect', {
      font: font,
      size: 0.4,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.02,
      bevelOffset: 0.01,
      bevelSegments: 6
    });

    var material = new THREE.MeshPhysicalMaterial({
      color: "#AAAAAA",
      reflectivity: 1,
      refractionRatio: 1,
      roughness: 0,
      metalness: 0,
      clearcoat: 1,
      side: THREE.DoubleSide,
      clearcoatRoughness: 0,
      transmission: 0,
      opacity: 1,
      transparent: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -1.2;
    mesh.position.y = 0;
    mesh.position.z = 0;
    groupedObjectsA.add(mesh);

  });

  loader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) {

    var geometry = new THREE.TextGeometry('@ C Y B E R S P A C E', {
      font: font,
      size: 0.15,
      height: 0.01,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0.01,
      bevelOffset: 0.00,
      bevelSegments: 6
    });

    var material = new THREE.MeshPhysicalMaterial({
      color: "#AAAAAA",
      reflectivity: 1,
      refractionRatio: 1,
      roughness: 0,
      metalness: 0,
      clearcoat: 1,
      side: THREE.DoubleSide,
      clearcoatRoughness: 0,
      transmission: 0,
      opacity: 1,
      transparent: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -0.7;
    mesh.position.y = -0.3;
    mesh.position.z = 0.1;
    groupedObjectsA.add(mesh);

  });

  // 🌞 LIGHT SETTINGS -------------------------- 

  var light = new THREE.PointLight(0xFF0033, 2, 30);
  light.position.set(10, 10, 10);
  scene.add(light);

  var light = new THREE.PointLight(0x00FF00, 2, 100);
  light.position.set(10, 3, -10);
  scene.add(light);

  // 👉 🌇 MAKE IT VISIBLE -------------------------- 

  scene.add(groupedObjectsA, groupedObjectsB);



  // 🎛 RENDER SETTINGS -------------------------- 

  renderer = new THREE.WebGLRenderer({ antialias: true });

  composer = new EffectComposer(renderer);

  var renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);


  var params = {
    exposure: 1.7,
    bloomStrength: 2.4,
    bloomThreshold: 0,
    bloomRadius: 0.5
  };
  var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  composer.addPass(bloomPass);

  glitchPass = new GlitchPass();
  composer.addPass(glitchPass);


  var params = {
    shape: 1,
    radius: 8,
    rotateR: Math.PI / 12,
    rotateB: Math.PI / 12,
    rotateG: Math.PI / 12,
    scatter: 0,
    blending: 0.1,
    blendingMode: 1,
    greyscale: false,
    disable: false
  };
  var halftonePass = new HalftonePass(window.innerWidth, window.innerHeight, params);
  composer.addPass(halftonePass);

  composer.setPixelRatio(window.devicePixelRatio / 1.5);
  composer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio / 1.5);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 2.3;
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
  lat = Math.max(- 85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(-lon);
  camera.position.z = 10 * Math.sin(phi) * Math.cos(theta);
  camera.position.y = 10 * Math.cos(phi);
  camera.position.x = 10 * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(scene.position);

  rotateObject(groupedObjectsA, Math.sin(0.1), 0.3, 0);
  rotateObject(groupedObjectsB, 0, 0, Math.tan(0.5));

  renderer.render(scene, camera);
  composer.render();
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
  camera.fov = THREE.MathUtils.clamp(fov, 1, 175);
  camera.updateProjectionMatrix();
}

// 🔄 Rotation funktion --------------------

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}

/// 🔶 These cubes help you to get an orientation in space -------------------------- 

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

  helperloader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) { var geometry = new THREE.TextGeometry('X', { font: font, size: 0.2, height: 0.1, }); var material = new THREE.MeshNormalMaterial(); var helperTxt = new THREE.Mesh(geometry, material); helperTxt.position.x = 2.5; helperTxt.position.y = 0; helperTxt.position.z = 0; scene.add(helperTxt); });
  helperloader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) { var geometry = new THREE.TextGeometry('Y', { font: font, size: 0.2, height: 0.1, }); var material = new THREE.MeshNormalMaterial(); var helperTxt = new THREE.Mesh(geometry, material); helperTxt.position.x = 0; helperTxt.position.y = 2.5; helperTxt.position.z = 0; scene.add(helperTxt); });
  helperloader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) { var geometry = new THREE.TextGeometry('Z', { font: font, size: 0.2, height: 0.1, }); var material = new THREE.MeshNormalMaterial(); var helperTxt = new THREE.Mesh(geometry, material); helperTxt.position.x = 0; helperTxt.position.y = 0; helperTxt.position.z = 2.5; scene.add(helperTxt); });

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