// -------------------------------------------------------------------------------------
// Scale objects

// 🌐 GLOBAL VARIABLES -------------------------- 

var numberOfObjects = 10;
var frame = 0;
var dauer = 1000;
var groessenAenderung = 0.012;

// 🔄 ANIMATION SETTINGS -------------------------- 

for (var i = 0; i <= numberOfObjects; i++) {
  var mesh = scene.getObjectByName('mesh' + i);
  if (frame <= dauer) {
    mesh.scale.x += Math.sin(groessenAenderung) + (i / 100);
    mesh.scale.y += Math.sin(groessenAenderung) + (i / 100);
    mesh.scale.z += Math.sin(groessenAenderung) + (i / 100);
    frame += 1;
  }
  if (frame > dauer) {
    mesh.scale.x -= Math.sin(groessenAenderung) + (i / 100);
    mesh.scale.y -= Math.sin(groessenAenderung) + (i / 100);
    mesh.scale.z -= Math.sin(groessenAenderung) + (i / 100);
    frame += 1;
  }
  if (frame == dauer * 2) {
    frame = 0;
  }
}


// -------------------------------------------------------------------------------------
// Rotate objects

// 🌐 GLOBAL VARIABLES -------------------------- 

var numberOfObjects = 10;

// 🔄 ANIMATION SETTINGS -------------------------- 

for (var i = 0; i <= numberOfObjects; i++) {
  var object = scene.getObjectByName('mesh' + i);
  rotateObject(object, Math.sin(i * 0.3), Math.cos(i * 0.2), 0);
};

// 🌐 GLOBAL FUNCTIONS -------------------------- 

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}