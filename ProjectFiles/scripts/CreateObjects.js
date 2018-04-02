
// Create a box cube.
function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);

    // Phong material can interact with light.
    var material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
        });
	var mesh = new THREE.Mesh(
		geometry,
		material 
    );

    // Make the box cast shadow.
    mesh.castShadow = true;

	return mesh;
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
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    // Make the plane show the shadow of other objects.
    mesh.receiveShadow = true;

    return mesh;
}

// Create a box cube.
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
    var light = new THREE.PointLight(0xffffff, intensity);

    // Make the light have shadow effect.
    light.castShadow = true;

    return light;
}