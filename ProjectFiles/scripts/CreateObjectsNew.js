

var boxMaterial = new THREE.MeshPhongMaterial();
var boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create a box cube.
function getBox(w, h, d, color) {

    // Phong material can interact with light.
    boxMaterial.color.setHex(color);
	var mesh = new THREE.Mesh(
        boxGeometry,
        boxMaterial 
    );

    // Make the box cast shadow.
    mesh.castShadow = true;

    return mesh;
}





// Create a plane square.
function getPlane(size) {
    // The last two params are segments(vertices).
    var geometry = new THREE.PlaneGeometry(size, size,size,size);

    var material = new THREE.MeshPhongMaterial({
        color: 0xffeeee,
        side: THREE.DoubleSide
    });

    material.wireframe = true;

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    // Make the plane show the shadow of other objects.
    mesh.receiveShadow = true;

    // Rotate the plane 90 degree.
    mesh.rotation.x = Math.PI / 2;

    return mesh;
}

// Create a ball.
function getSphere(size) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);

    // Basic material does not interact with light. Its color is fixed without light.
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}




// Create a point light like a light bulb.
function getPointLight(intensity) {
    var light = new THREE.PointLight('rgb(255,220,180)', intensity);

    light.position.x = 10;
    light.position.z = 20;
    light.position.y = 15;

    // Make the light have shadow effect.
    light.castShadow = true;

    light.shadow.bias = 0.0001;  // Eliminate gliches of the shadow.
    light.shadow.mapSize.width = 2048;  // Make the shadow clearer. Default is 1024.
    light.shadow.mapSize.height = 2048;

    return light;
}


// Create a spot light like at stage.
function getSpotLight(intensity) {
    var light = new THREE.SpotLight('rgb(255,220,180)', intensity);

    // Make the light have shadow effect.
    light.castShadow = true;

    light.position.x = 100;
    light.position.z = 100;
    light.position.y = 100;

    light.shadow.bias = 0.001;  // Eliminate gliches of the shadow.
    light.shadow.mapSize.width = 2048;  // Make the shadow clearer. Default is 1024.
    light.shadow.mapSize.height = 2048;

    return light;
}

// Create a directional light like a sun far away.
function getDirectionalLight(intensity) {
    var light = new THREE.DirectionalLight(0xffffff, intensity);

    // Make the light have shadow effect.
    light.castShadow = true;
    light.position.x = 100;
    light.position.z = 100;
    light.position.y = 100;


    // Make the shadow field larger.
    light.shadow.camera.left = -100;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;

    return light;
}

// Create ambient light. Used to create uniform effect (reflection) on all objects.
function getAmbientLight(intensity) {
    var light = new THREE.AmbientLight('rgb(30,30,30)', intensity);

    // Ambient light makes no shadow

    return light;
}