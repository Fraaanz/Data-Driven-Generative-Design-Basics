/* 📀 LOAD THREE JS -------------------------- */

import * as THREE from '../sources/three.js-master/build/three.module.js';

/* 📊 LOAD CSV DATA -------------------------- */

d3.csv("../sources/demo-data/SRLCC_a1b_Temp_ECHAM5-MPI.csv").then(function (data) {

  /* 🌐 GLOBAL VARIABLES -------------------------- */

  var camera, scene, renderer;
  var geometry, material, mesh, light;
  var groupRed, groupHelper;
  var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
  var lon = 0, lat = 0;
  var phi = 0, theta = 0;

  /* 🚀 RUN MAIN FUNCTIONS -------------------------- */

  init();
  animate();

  /* 🎯 MAIN FUNCTION -------------------------- */

  function init() {

    /* 🎥 CAM SETTING -------------------------- */

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 110);
    camera.position.z = 5;

    /* 🌇 SCENE SETTING -------------------------- */

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xefefef);

    /* 🌐 GROUPS SETTING -------------------------- */

    groupHelper = new THREE.Group();
    groupRed = new THREE.Group();

    /* 👇 YOUR 3D OBJECTS ✅ ----------------------- */

    for (var i = 1; i <= 400; i++) {

      var myValue = data[i]["MEAN"];
      geometry = new THREE.BoxGeometry(Math.random() / 8, Math.random() / 8, myValue / 10);
      material = new THREE.MeshPhysicalMaterial({
        color: "#0f0f0f",
        reflectivity: 0.1,
        refractionRatio: 2,
        roughness: 0,
        metalness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transmission: 0,
        opacity: 1,
        transparent: true
      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 2;
      mesh.position.y = (Math.random() - 0.5) * 2;
      mesh.position.z = (Math.random() - 0.5) * 10;

      groupRed.add(mesh);

    }

    /* 🌞 LIGHT SETTINGS -------------------------- */

    light = new THREE.SpotLight(0xfefefe, 4);
    light.position.set(-50, 50, 50);
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;

    //* 👉 🌇 MAKE IT VISIBLE -------------------------- */

    scene.add(groupRed, light);

    //* 🎛 RENDER SETTINGS -------------------------- */

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio / 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //* 🐭 PART OF MOUSE CONTOLL -------------------------- */

    document.addEventListener('mousedown', onDocumentMouseDown, true);
    document.addEventListener('wheel', onDocumentMouseWheel, false);

  }

  //* 🔄 ANIMATION SETTINGS -------------------------- */

  function animate() {
    requestAnimationFrame(animate);

    var timer = Date.now() * 0.0001;
    scene.traverse(function (object) {
      if (camera.name === "thecam") {
        object.rotation.x = timer * 0.65;
        object.rotation.y = timer * -1.5;
        object.rotation.z = timer * 1.5;
      }
    });

    groupRed.rotation.x += 0.0001;
    groupRed.rotation.y += 0.002;

    light.position.x = Math.sin(timer * 10.7) * 500;
    light.position.y = Math.cos(timer * 10.3) * 500;
    light.position.z = Math.cos(timer * 10.3) * 500;

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

  //* 🐭 PART OF MOUSE CONTOLL -------------------------- */

  function onDocumentMouseDown(event) {
    event.preventDefault();
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
  }

  //* 🐭 PART OF MOUSE CONTOLL -------------------------- */

  function onDocumentMouseMove(event) {
    lon = (event.clientX - onPointerDownPointerX) * 0.1 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
  }

  //* 🐭 PART OF MOUSE CONTOLL -------------------------- */

  function onDocumentMouseUp() {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
  }

  //* 🐭 PART OF MOUSE CONTOLL -------------------------- */

  function onDocumentMouseWheel(event) {
    var fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
    camera.updateProjectionMatrix();
  }

});