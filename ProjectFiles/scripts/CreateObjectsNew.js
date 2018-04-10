
// Create a box cube.
function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);

    // Phong material can interact with light.
    var material = new THREE.MeshNormalMaterial();
	var mesh = new THREE.Mesh(
		geometry,
		material 
    );

    // Make the box cast shadow.
    mesh.castShadow = true;

	return mesh;
}

// Cube map for 6 faces of a cube
function CubeMap() {
    var path = 'img/cubemap/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format,
    ]
    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    return reflectionCube;
}

// Crate a group of boxes.
function getBoxGrid(amount, separationMultiplier) {
    var group = new THREE.Group();

    // Column
    for (var i = 0; i < amount; i++) {
        var obj = getBox(0.5, 0.5, 0.5);
        obj.position.x = i * separationMultiplier;
        obj.position.y = obj.geometry.parameters.height / 2;
        group.add(obj);

        // Row
        for (var j = 1; j < amount; j++) {
            var obj = getBox(0.5, 0.5, 0.5);
            obj.position.x = i * separationMultiplier;
            obj.position.y = obj.geometry.parameters.height / 2;
            obj.position.z = j * separationMultiplier;
            group.add(obj);
        }
    }

    group.position.x = -(separationMultiplier * (amount - 1)) / 2;
    group.position.z = -(separationMultiplier * (amount - 1)) / 2;

    return group;
}

// Create a plane square.
function getPlane(size) {
    // The last two params are segments(vertices).
    var geometry = new THREE.PlaneGeometry(size, size,size,size);

    var material = new THREE.MeshBasicMaterial({
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

    // Make the light have shadow effect.
    light.castShadow = true;

    return light;
}


// Create a spot light like at stage.
function getSpotLight(intensity) {
    var light = new THREE.SpotLight('rgb(255,220,180)', intensity);

    // Make the light have shadow effect.
    light.castShadow = true;

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

    // Make the shadow field larger.
    light.shadow.camera.left = -5;
    light.shadow.camera.bottom = -5;
    light.shadow.camera.right = 5;
    light.shadow.camera.top = 5;

    return light;
}

// Create ambient light. Used to create uniform effect (reflection) on all objects.
function getAmbientLight(intensity) {
    var light = new THREE.AmbientLight('rgb(30,30,30)', intensity);

    // Ambient light makes no shadow

    return light;
}