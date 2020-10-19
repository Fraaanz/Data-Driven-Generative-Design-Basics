// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';

// 🌐 GLOBAL VARIABLES -------------------------- 

var camera, scene, renderer;
var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
var lon = 0, lat = 0;
var phi = 0, theta = 0;

// 🌐 GROUPS SETTING -------------------------- 

var groupedObjectsA = new THREE.Group();
var lightA;

var yourObject;
var yourObjects = document.getElementsByTagName('p');

var soundAllowed = function (stream) {

  window.persistAudioStream = stream;
  var audioContent = new AudioContext();
  var audioStream = audioContent.createMediaStreamSource(stream);
  var analyser = audioContent.createAnalyser();
  audioStream.connect(analyser);
  analyser.fftSize = 1024;
  var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  // 🚀 RUN MAIN FUNCTIONS -------------------------- 

  init();
  animate();

  // 🎯 MAIN FUNCTION -------------------------- 

  function init() {

    // 🎥 CAM SETTING -------------------------- 

    var fov = 70;
    var aspect = window.innerWidth / window.innerHeight;
    var near = 0.01;
    var far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 0;

    // 🌇 SCENE SETTING -------------------------- 

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 5, 25);

    // 🔶 HELPER CUBES ✅ ----------------------- 

    //helper();

    // 👇 YOUR 3D OBJECTS ✅ ----------------------- 

    for (var i = 0; i < 255; i++) {

      var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
      var material = new THREE.MeshPhysicalMaterial({
        color: "rgb(0, 0, 0)",
        reflectivity: 1,
        refractionRatio: 1,
        roughness: 0,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transmission: 0,
        opacity: 1,
        transparent: true
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = -2;
      mesh.position.y = 0;
      mesh.position.z = -10 + i/12;
      mesh.name = i;
      groupedObjectsA.add(mesh);

    }

    // 🌞 LIGHT SETTINGS -------------------------- 

    var lightA = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    var lightB = new THREE.AmbientLight( 0x404040 );


    // 👉 🌇 MAKE IT VISIBLE -------------------------- 

    scene.add(groupedObjectsA, lightA, lightB);

    // 🎛 RENDER SETTINGS -------------------------- 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio / 1);
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
    lon += 0;
    lat = Math.max(- 85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);
    camera.position.x = 10 * Math.sin(phi) * Math.cos(theta);
    camera.position.y = 10 * Math.cos(phi);
    camera.position.z = 10 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(scene.position);

    analyser.getByteFrequencyData(frequencyArray);
    var adjustedLength;

    // this loop modifies your objects
    for (var i = 0; i < 255; i++) {

      adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
      var object = scene.getObjectByName(i);
      object.scale.set( adjustedLength/20, adjustedLength/20, 1 );
      object.material.color.set( "rgb(" + Math.round(adjustedLength/2) + ", " + Math.round(adjustedLength/3.5) + ", " + Math.round(adjustedLength*2) + ")" );
    }

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

}

var soundNotAllowed = function (error) {
  h.innerHTML = "You must allow your microphone.";
  console.log(error);
}
navigator.getUserMedia({ audio: true }, soundAllowed, soundNotAllowed);