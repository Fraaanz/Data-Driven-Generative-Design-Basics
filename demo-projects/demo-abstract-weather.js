
// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';

// 📊 LOAD JSON DATA ----------------------------------------
// Do not forget to load the D3 Framework in your HTML file!

d3.json("../sources/demo-data/weather.json").then(function (data) {

  // max 92 data sets in this weather JSON

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

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.02, 55);
    camera.position.z = 0;
    camera.position.y = 0;

    // 🌇 SCENE SETTING -------------------------- 

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    scene.fog = new THREE.Fog(0xFFFFFF, 16, 26);

    // 🔶 HELPER CUBES ✅ ----------------------- 

    //helper();

    // 👇 YOUR 3D OBJECTS ✅ ----------------------- 

    var positionX = 0;
    var positionXmax = 37;
    var positionY = 0;

    for (var i = 0; i <= 89; i++) {

      console.log('🌤 Data: ' + i);

      var air_temperature = data.properties.timeseries[i].data.instant.details.air_temperature;
      var wind_speed = data.properties.timeseries[i].data.instant.details.wind_speed;
      var dew_point_temperature = data.properties.timeseries[i].data.instant.details.dew_point_temperature;
      
      var sphereSize = wind_speed/2;
      var torusArc = air_temperature/5;
      var torusThickness = 0.15 + -dew_point_temperature/10;

      var geometry = new THREE.TorusGeometry(1, torusThickness, 30, 100, torusArc);
      var material = new THREE.MeshPhysicalMaterial({
        color: "#FFAAAA",
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
      mesh.position.x = positionX;
      mesh.position.y = positionY;
      mesh.position.z = 0;
      groupedObjectsA.add(mesh);

      var geometry = new THREE.TorusGeometry(1, 0.1, 30, 100, 6.3);
      var material = new THREE.MeshPhysicalMaterial({
        color: "#AAAAFF",
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
      mesh.position.x = positionX;
      mesh.position.y = positionY;
      mesh.position.z = 0;
      groupedObjectsA.add(mesh);

      var geometry = new THREE.SphereGeometry(sphereSize, 32, 32 );
      var material = new THREE.MeshPhysicalMaterial({
        color: "#EE44AA",
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
      mesh.position.x = positionX;
      mesh.position.y = positionY;
      mesh.position.z = 0;
      groupedObjectsA.add(mesh);

      positionX = positionX + 4;
      if (positionX >= positionXmax) {
        positionX = 0;
        positionY = positionY + 4;
      }
    }

    groupedObjectsA.position.x = -positionXmax/2;
    groupedObjectsA.position.y = -positionY/2;

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
    camera.position.x = 10 * Math.sin(phi) * Math.cos(theta) +5;
    camera.position.y = 10 * Math.cos(phi) + 3;
    camera.position.z = 10 * Math.sin(phi) * Math.sin(theta) +3;
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
    camera.fov = THREE.MathUtils.clamp(fov, 20, 175);
    camera.updateProjectionMatrix();
  }

  // 🔶 These cubes help you to get an orientation in space -------------------------- 

  function helper() {

    var helperObj, geometry, material;
    var helperObjSize = 0.1;
    var helperSize = 2;

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