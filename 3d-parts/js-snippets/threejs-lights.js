// HemisphereLight(skyColor: any, groundColor: any, intensity: any)
var light;
light = new THREE.HemisphereLight(0xFFFFFF, 0x0000FF, 0.5);
scene.add(light);

// PointLight(color: any, intensity: any, distance: any, decay: any)
var light = new THREE.PointLight(0xFFFFFF, 20, 300);
light.position.set(0, 100, -210);
scene.add(light);

// SpotLight(color: any, intensity: any, distance: any, angle: any, penumbra: any, decay: any)
var spotLight = new THREE.SpotLight(0xFFFFFF, 2, 100, 0.3, 0.5, 2);
spotLight.position.set(0, 3, 10);
scene.add(spotLight);