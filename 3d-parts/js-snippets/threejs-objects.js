

// -------------------------------------------------------------------------------------
// Cone

var geometry = new THREE.ConeGeometry(1, 3, 32);
var material = new THREE.MeshPhysicalMaterial({
  color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
  reflectivity: 1,
  refractionRatio: 1,
  clearcoat: 1,
  side: THREE.DoubleSide,
  transmission: 0,
  opacity: 1,
  transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
mesh.name = 'mesh' + i;
console.log('NAME: ' + mesh.name);
groupedObjectsA.add(mesh);


// -------------------------------------------------------------------------------------
// Torus

var geometry = new THREE.TorusGeometry(5, 0.25, 50, 50, 6.288);
var material = new THREE.MeshPhysicalMaterial({
  color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
  reflectivity: 1,
  refractionRatio: 1,
  clearcoat: 1,
  side: THREE.DoubleSide,
  transmission: 0,
  opacity: 1,
  transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
mesh.name = 'mesh' + i;
console.log('NAME: ' + mesh.name);
groupedObjectsA.add(mesh);


// -------------------------------------------------------------------------------------
// Cube

var geometry = new THREE.BoxGeometry(3, 3, 3);
var material = new THREE.MeshPhysicalMaterial({
  color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
  reflectivity: 1,
  refractionRatio: 1,
  clearcoat: 1,
  side: THREE.DoubleSide,
  transmission: 0,
  opacity: 1,
  transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
mesh.name = 'mesh' + i;
console.log('NAME: ' + mesh.name);
groupedObjectsA.add(mesh);


// -------------------------------------------------------------------------------------
// Cylinder

var geometry = new THREE.CylinderGeometry(1, 1, 8, 16);
var material = new THREE.MeshPhysicalMaterial({
  color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
  reflectivity: 1,
  refractionRatio: 1,
  clearcoat: 1,
  side: THREE.DoubleSide,
  transmission: 0,
  opacity: 1,
  transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
mesh.name = 'mesh' + i;
console.log('NAME: ' + mesh.name);
groupedObjectsA.add(mesh);


// -------------------------------------------------------------------------------------
// Sphere

var geometry = new THREE.SphereGeometry(4, 32, 32);
var material = new THREE.MeshPhysicalMaterial({
  color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
  reflectivity: 1,
  refractionRatio: 1,
  clearcoat: 1,
  side: THREE.DoubleSide,
  transmission: 0,
  opacity: 1,
  transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
mesh.name = 'mesh' + i;
console.log('NAME: ' + mesh.name);
groupedObjectsA.add(mesh);


// -------------------------------------------------------------------------------------
// TorusKnot

var geometry = new THREE.TorusKnotGeometry(3, 0.5, 100, 100, 1, 3);
var material = new THREE.MeshPhysicalMaterial({
  color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
  reflectivity: 1,
  refractionRatio: 1,
  clearcoat: 1,
  side: THREE.DoubleSide,
  transmission: 0,
  opacity: 1,
  transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
mesh.name = 'mesh' + i;
console.log('NAME: ' + mesh.name);
groupedObjectsA.add(mesh);



// -------------------------------------------------------------------------------------
// Text

// FIRST: your script needs to be enclosed in this (exists already in getstartet-00.js)

var loader = new THREE.FontLoader();
loader.load('../sources/fonts/helvetiker_regular.typeface.json', function (font) {

  // your script

});

// SECOND: add the text geometry 

  var geometry = new THREE.TextGeometry('Demo-Text', {
    font: font,
    size: 1.6,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });
  var material = new THREE.MeshPhysicalMaterial({
    color: "hsl(280, 100% , 80%)", //hsl(hue, saturation, lightness)
    reflectivity: 1,
    refractionRatio: 1,
    clearcoat: 1,
    side: THREE.DoubleSide,
    transmission: 0,
    opacity: 1,
    transparent: true
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  mesh.name = 'mesh' + i;
  console.log('NAME: ' + mesh.name);
  groupedObjectsA.add(mesh);
