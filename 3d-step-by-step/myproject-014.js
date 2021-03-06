// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';

// 📊 LOAD CSV DATA ----------------------------------------
// Do not forget to load the D3 Framework in your HTML file!

d3.csv("../sources/demo-data/dwd-demo-data-small.csv").then(function (data) {

  // Display table in console
  // console.table(data);;

  // 🌐 GLOBAL VARIABLES -------------------------- 

  var camera, scene, renderer;
  var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
  var lon = 0, lat = 0;
  var phi = 0, theta = 0;

  // 🌐 GROUPS SETTING -------------------------- 

  var groupedObjectsA = new THREE.Group();
  //var groupedObjectsB = new THREE.Group();
  //var groupedObjectsC = new THREE.Group();

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

    // 🌇 SCENE SETTING -------------------------- 

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    scene.fog = new THREE.Fog(0xFFFFFF, 5, 15);

    // 🔶 HELPER CUBES ✅ ----------------------- 

    // helper();

    // 👇 YOUR 3D OBJECTS ✅ ----------------------- 

    for (var i = 0; i <= 250; i++) {
      // var cubePosX = data[i]["ALTITUDE"]/1000;
      var cubePosX = data[i]["LON"] - 10;
      var cubePosY = (data[i]["LAT"] * 1.4) - 71.5;
      var cubePosZ = data[i]["TEMP"] - 9;
      //var colorS = Math.round(data[i]["TEMP"] * 5);
      var cubeSize = (data[i]["RAIN"] - 442) / 500;

      // console.log("🎯 lat & long:" + cubePosY + " " + cubePosZ);
      // console.log("⛰ altitude: " + cubePosX);
      // console.log("🌡 max temp: " + cubePosX);
      // console.log("cubePosZ: " + cubePosZ);
      // console.log("colorS: " + colorS);

      var geometry = new THREE.TorusGeometry(cubeSize, cubePosZ / 50, 50, 50, 6.29);
      var material = new THREE.MeshPhysicalMaterial({
        color: "hsl(0, 0% , 100%)",//hsl(hue, saturation, lightness)
        reflectivity: 1,
        refractionRatio: 1,
        roughness: 0,
        metalness: 0,
        clearcoat: 1,
        //side: THREE.DoubleSide,
        clearcoatRoughness: 0,
        transmission: 0.2,
        opacity: 1,
        transparent: true
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = cubePosX;
      mesh.position.y = cubePosY;
      mesh.position.z = cubePosZ;
      mesh.name = 'mesh' + i;
      console.log('NAME: ' + mesh.name);
      groupedObjectsA.add(mesh);
    }

    // 🌞 LIGHT SETTINGS -------------------------- 

    var light = new THREE.PointLight(0xFFFFFF, 1, 2000);
    light.position.set(0, 0, 210);
    scene.add(light);

    var light = new THREE.PointLight(0xff9933, 2, 2000);
    light.position.set(0, -211, 50);
    scene.add(light);

    var light = new THREE.PointLight(0xff0077, 2, 2000);
    light.position.set(-211, 0, 50);
    scene.add(light);

    var light = new THREE.PointLight(0x33ffff, 1, 2000);
    light.position.set(0, 211, 50);
    scene.add(light);

    var light = new THREE.PointLight(0x3399ff, 1, 2000);
    light.position.set(211, 0, 50);
    scene.add(light);

    // 👉 🌇 MAKE IT VISIBLE -------------------------- 

    scene.add(groupedObjectsA);

    // 🎛 RENDER SETTINGS -------------------------- 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio / 2);
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

    for (var i = 0; i <= 250; i++) {
      var object = scene.getObjectByName('mesh' + i);
      rotateObject(object, Math.sin(i * 0.3), Math.cos(i * 0.2), 0);
    };

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

  // 🔄 Rotation funktion --------------------

  function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
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

});