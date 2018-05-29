

var boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create a box cube.
function getBox(color) {

    // Phong material can interact with light.
	var mesh = new THREE.Mesh(
        boxGeometry,
        useMaterial(color, colorCollection, false) 
    );

    // Make the box cast shadow.
    mesh.castShadow = true;

    return mesh;
}


var boxBoneGeometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
var boxBoneMaterial = new THREE.MeshBasicMaterial();
// Create a box cube frame.
function getBoxBone() {

    // Phong material can interact with light.
    var mesh = new THREE.Mesh(
        boxBoneGeometry,
        boxBoneMaterial
    );
    boxBoneMaterial.color.setHex(0xffffff);
    boxBoneMaterial.wireframe = true;
    mesh.name = 'bone';

    return mesh;
}


// Make a transparent block
function getTransparentBottom() {

    var hintGeometry = new THREE.PlaneGeometry(1, 1);
    var hintMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    hintMaterial.wireframe = true;

    // Phong material can interact with light.
    var mesh = new THREE.Mesh(
        hintGeometry,
        hintMaterial
    );

    mesh.rotation.x = Math.PI / 2;
    
    return mesh;
}



// Create a plane square.
function getPlane(size) {
    // The last two params are segments(vertices).
    var geometry = new THREE.PlaneGeometry(size, size,size,size);

    var loader = new THREE.TextureLoader();

    var texture = loader.load('img/grass.png', function(texture) {
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    	texture.offset.set(0,0);
    	texture.repeat.set(30,30);
    });

    var material = new THREE.MeshPhongMaterial({
        //color: 0xffeeee,
        map: texture,
        side: THREE.DoubleSide
    });

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
    var geometry = new THREE.SphereGeometry(size);

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

// Create a cone.
function getCone(size) {
    var geometry = new THREE.ConeGeometry(size,1.3,4);

    // Basic material does not interact with light. Its color is fixed without light.
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.rotation.x += Math.PI;

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


// Create a car
function getCar() {
		//cylinder1
		var geometry_cylinder1 = new THREE.CylinderGeometry( 0.5, 0.5, 0.7, 20 );
		var material_cylinder1 = new THREE.MeshPhongMaterial( {color: 0xffff00} );
		var cylinder1 = new THREE.Mesh( geometry_cylinder1, material_cylinder1 );
		cylinder1.position.set(0,2.5,0);
		
		//cylinder2
		var geometry_cylinder2 = new THREE.CylinderGeometry( 0.25, 0.25, 1, 20 );
		var material_cylinder2 = new THREE.MeshPhongMaterial( {color: 0xffff00} );
		var cylinder2 = new THREE.Mesh( geometry_cylinder2, material_cylinder2 );
		cylinder2.position.set(0,2.5,0);

		//cube1
		var geometry_cube1 = new THREE.BoxGeometry(1.4,1.5,0.9);
		var material_cube1 = new THREE.MeshPhongMaterial( {color: 0xffffff});
		//material_cube1.color=  new THREE.Color(1,0,1);
		var cube1 = new THREE.Mesh(geometry_cube1, material_cube1);
		cube1.position.set(0,1.25,0);

		//cube2 (right-arm)
		var geometry_cube2 = new THREE.BoxGeometry(0.4,1.4,0.5);
		var material_cube2 = new THREE.MeshPhongMaterial( {color: 0xffffff});
		var cube2 = new THREE.Mesh(geometry_cube2, material_cube2);
		cube2.position.set(0.9,1.3,-0.5);
		cube2.rotateOnAxis( new THREE.Vector3(1,0,0), 32);
		
		//cube3 (left-arm)
		var geometry_cube3 = new THREE.BoxGeometry(0.4,1.35,0.5);
		var material_cube3 = new THREE.MeshPhongMaterial( {color: 0xffffff});
		var cube3 = new THREE.Mesh(geometry_cube3, material_cube3);
		cube3.position.set(-0.9,1.3,-0.5);
		cube3.rotateOnAxis( new THREE.Vector3(1,0,0), 32);
		
		//handle
		var geometry_handle = new THREE.CylinderGeometry( 0.9, 0.9, 0.1, 20 );
		var material_handle = new THREE.MeshPhongMaterial( {color: 0x00000} );
		var handle = new THREE.Mesh( geometry_handle, material_handle );
		handle.position.set(0,1.5,-1.5);
		handle.rotateOnAxis( new THREE.Vector3(1,0,0), 70);
		
		//body
		var material_body = new THREE.MeshPhongMaterial();
		material_body.color=  new THREE.Color(0.05,0.05,0.3);
		var geometry_body = new THREE.BoxGeometry(2.8,1,4);
		var body = new THREE.Mesh(geometry_body,material_body);
		body.position.set(0,0.5,0);
		
		//body2
		var material_body2 = new THREE.MeshPhongMaterial();
		material_body2.color=  new THREE.Color(0.05,0.05,0.3);
		var geometry_body2 = new THREE.BoxGeometry(1.8,0.8,1);
		var body2 = new THREE.Mesh(geometry_body2,material_body2);
		body2.position.set(0,0.8,1);
		
		//body3
		var material_body3 = new THREE.MeshPhongMaterial();
		material_body3.color=  new THREE.Color(0.05,0.05,0.3);
		var geometry_body3 = new THREE.BoxGeometry(2.8,0.4,4);
		var body3 = new THREE.Mesh(geometry_body3,material_body3);
		body3.position.set(0,0.15,0.1);
		
		var headlight = getPointLight();
		headlight.position.set(0,1,-1.75);
		headlight.color.set(new THREE.Color(1,1,1));
		headlight.intensity = 0.3;
		
		//group
		var group = new THREE.Group();
		group.add( cylinder1 );
		group.add( cylinder2 );
		group.add( cube1 );
		group.add( cube2 );
		group.add( cube3 );		
		group.add( handle );
		group.add( body );
		group.add( body2 );
		group.add( body3 );
		group.add( headlight );
		body.castShadow = true;
		cylinder1.castShadow = true;
		cylinder2.castShadow = true;
		cube1.castShadow = true;
		cube2.castShadow = true;
		cube3.castShadow = true;
		handle.castShadow = true;
		
		
		return group;
}
// Create a car
function getWheel(x,y,z) {
	
	var texture_wheel = new THREE.TextureLoader().load('img/tire.png');
	var geometry_wheel = new THREE.CylinderGeometry( 0.5, 0.5, 0.6, 20 );
	var material_wheel = new THREE.MeshPhongMaterial( {map:texture_wheel} );
	var wheel = new THREE.Mesh( geometry_wheel, material_wheel );
	wheel.position.set(x,y,z);
	wheel.rotation.z = 1.565;
		
	return wheel;
}

function getBackLight(x,y,z) {
	
	var backlight = getPointLight();
	backlight.position.set(x,y,z);
	backlight.color.set(new THREE.Color(1,0,0));
	backlight.intensity = 0.2;
	
	return backlight;
}
