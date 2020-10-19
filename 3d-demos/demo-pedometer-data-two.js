// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';

// 📊 LOAD XML DATA ----------------------------------------
// Do not forget to load the D3 Framework in your HTML file!

d3.xml("../sources/demo-data/HealthData-StepCount-Demo.xml").then(function (data) {
  var xml = data.documentElement.getElementsByTagName("Record");
  var currentSteps;

  // 🌐 GLOBAL VARIABLES -------------------------- 

  var camera, scene, renderer;
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

    var fov = 70;
    var aspect = window.innerWidth / window.innerHeight;
    var near = 0.01;
    var far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 19;
    camera.position.y = 20;

    // 🌇 SCENE SETTING -------------------------- 

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    scene.fog = new THREE.Fog(0xFFFFFF, 15, 35);

    // 🔶 HELPER CUBES ✅ ----------------------- 

    //helper();

    // 👇 YOUR 3D OBJECTS ✅ ----------------------- 

    var loopCount = 1499; // starts with 0
    var loopCountShift = 0;

    var boxPositionX = 0;
    var boxPositionZ = 0;

    for (var i = 0 + loopCountShift; i <= loopCount + loopCountShift; i++) {

      currentSteps = xml.innerHTML = xml[i].getAttribute("value");

      var boxSizeX = 1;
      var boxSizeY = currentSteps / 100;
      var boxSizeZ = 1;

      var boxDistance = 1;
      var boxMaxRowItems = 30;

      var brightness = currentSteps;
      brightness = "rgb(" + Math.round(brightness / 1) + "," + Math.round(brightness / 4) + "," + Math.round(brightness / 4) + ")";

      var geometry = new THREE.BoxGeometry(boxSizeX, boxSizeY, boxSizeZ);
      var material = new THREE.MeshPhysicalMaterial({
        color: brightness,
        reflectivity: 1,
        refractionRatio: 1,
        roughness: 1,
        metalness: 0.7,
        clearcoat: 0,
        side: THREE.DoubleSide,
        clearcoatRoughness: 1,
        transmission: 0,
        opacity: 0.7,
        transparent: true
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = boxPositionX;
      mesh.position.y = boxSizeY / 2;
      mesh.position.z = boxPositionZ;
      groupedObjectsA.add(mesh);

      var boxRowBreak = boxMaxRowItems * (boxSizeX + boxDistance);

      console.log('boxRowBreak: ' + boxRowBreak);

      boxPositionX = boxPositionX + boxDistance + boxSizeX;
      if (boxPositionX >= boxRowBreak) {
        boxPositionX = 0;
        boxPositionZ = boxPositionZ + boxDistance + boxSizeZ;
      }

      console.log('🔸 Data row: ' + i + ' |  Steps: ' + currentSteps + ' | Brightness: ' + brightness + ' | boxPositionX: ' + boxPositionX);
    }

    groupedObjectsA.position.x = -boxRowBreak/2;
    groupedObjectsA.position.z = -boxPositionZ/2;

    // 🌞 LIGHT SETTINGS -------------------------- 

    var light = new THREE.PointLight(0xFF44FF, 1, 2000);
    light.position.set(0, 0, 210);
    scene.add(light);

    var light = new THREE.PointLight(0xff9933, 2, 2000);
    light.position.set(0, -211, 50);
    scene.add(light);

    var light = new THREE.PointLight(0xff0077, 2, 2000);
    light.position.set(-211, 0, 50);
    scene.add(light);

    var light = new THREE.PointLight(0x344ff, 1, 2000);
    light.position.set(0, 211, 50);
    scene.add(light);

    var light = new THREE.PointLight(0x3399ff, 1, 2000);
    light.position.set(211, 0, 50);
    scene.add(light);




    // 👉 🌇 MAKE IT VISIBLE -------------------------- 

    scene.add(groupedObjectsA);

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
    camera.position.y = 10 * Math.cos(phi) + 10;
    camera.position.z = 10 * Math.sin(phi) * Math.sin(theta) + 10;
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

});