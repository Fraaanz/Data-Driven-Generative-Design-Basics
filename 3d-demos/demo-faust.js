// 📀 LOAD THREE JS -------------------------- 

import * as THREE from '../sources/three.module.js';

// 🔤 Count letters from a txt file ----------------------------------------

fetch('../sources/demo-data/demotext.txt').then(function (response) {
  response.text().then(function (myText) {
    var letterCountArray = [];

    // run letter count function 
    charCountAlphabet(myText);

    // display whats inside "letterCountArray"
    console.log('Letter counter 🔤 👉 ' + letterCountArray);

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
      camera.position.z = 5;

      // 🌇 SCENE SETTING -------------------------- 

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      // 🔶 HELPER CUBES ✅ ----------------------- 

      //helper();

      // 👇 YOUR 3D OBJECTS ✅ ----------------------- 

      for (var i = 0; i < letterCountArray.length; ++i) {

        var objSize = letterCountArray[i] / 10000;
        if (objSize < 0.1) {
          objSize = 0.1;
        }

        var geometry = new THREE.TorusGeometry(objSize * 2, objSize / 10, 30, 100);
        var material = new THREE.MeshPhysicalMaterial({
          color: "#EE77FF",
          reflectivity: 1,
          refractionRatio: 1,
          roughness: 0,
          metalness: 0,
          clearcoat: 1,
          side: THREE.DoubleSide,
          clearcoatRoughness: 0,
          transmission: 0.95,
          opacity: 1,
          transparent: true
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.cos(i * (Math.PI / (26 / 2))) * 2;
        mesh.position.y = 0;
        mesh.position.z = Math.sin(i * (Math.PI / (26 / 2))) * 2;
        rotateObject(mesh, 90, 0, 90);
        groupedObjectsA.add(mesh);

      }


      // 🌞 LIGHT SETTINGS -------------------------- 

      var lightA;
      lightA = new THREE.SpotLight(0x00FFFF, 1);
      lightA.position.set(-15, 15, 15);

      var lightB;
      lightB = new THREE.SpotLight(0xFF00FF, 1);
      lightB.position.set(15, -15, 15);

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
      camera.position.x = 10 * Math.sin(phi) * Math.cos(theta) + 5;
      camera.position.y = 10 * Math.cos(phi) + 3;
      camera.position.z = 10 * Math.sin(phi) * Math.sin(theta) + 3;
      camera.lookAt(scene.position);

      rotateObject(groupedObjectsA, 0, -1, 0);

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
      camera.fov = THREE.MathUtils.clamp(fov, 1, 175);
      camera.updateProjectionMatrix();
    }

    // 🔄 Rotation funktion --------------------

    function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
      object.rotateX(THREE.Math.degToRad(degreeX));
      object.rotateY(THREE.Math.degToRad(degreeY));
      object.rotateZ(THREE.Math.degToRad(degreeZ));
    }

    // 🔤 letter count function 
    function charCountAlphabet(textInput) {
      var letterCount;
      var j = 0;
      var alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
      for (var i = 0; i < alphabet.length; ++i) {
        charCountAlphabet(alphabet[i]);
        if ((alphabet.length / 2) > i) {
          letterCountArray.push(letterCount);
        }
        if ((alphabet.length / 2) <= i) {
          letterCountArray[j] = letterCountArray[j] + letterCount;
          j++
        }
      }
      function charCountAlphabet(alphabetChar) {
        letterCount = 0;
        for (var position = 0; position < textInput.length; position++) {
          if (textInput.charAt(position) == alphabetChar) {
            letterCount += 1;
          }
        }
        return letterCount;
      }
      return letterCountArray;
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
});