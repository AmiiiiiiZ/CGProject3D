
// A collection of key-value pair to store the materials of different color.
var colorCollection = new Object();


// A function to decide which material to use. (Use old material of existing color or create a new material of different color)
function useMaterial(color, collection, transparency) {

    var material = null;
    // When the color is old
    if (collection[color] != null) {
        material = collection[color];
        console.log("old material used!");
    }
    else {
        // When the color is new 
        material = new THREE.MeshPhongMaterial({ transparent: transparency, opacity: 0.5 });
        material.color.setHex(color);
        collection[color] = material;
        console.log("new material created!");
    }

    return material;
}


function updateBlockPosition(object) {

    bottomBlock.position.x = object.position.x;
    bottomBlock.position.y = -0.49;
    bottomBlock.position.z = object.position.z;

    ball.position.x = box.position.x;
    ball.position.z = box.position.z;
}

// Hide the block being controlled
function hideBlock() {

}

// Show the control block again
function showBlock() {

}


// A collection of blocks existing in the scene. To test if there are blocks under the place 
var blockCollection = new Object();



// A function to validate if a new block can be set here.
function canSetBlockHere(x, y, z) {

    var key = x.toString() + "-" + y.toString() + "-" + z.toString();

    if (blockCollection[key]) {
        return false;
    }
    else {
        return true;
    }
}



// A function to keep the location of the block newly set there.
function setBlockHere(x, y, z) {

    var key = x.toString() + "-" + y.toString() + "-" + z.toString();

    var copy = getBox(colorChanger.color);
    copy.position.x = x;
    copy.position.y = y;
    copy.position.z = z;
    console.log("new box created here!");

    // Store the created box by making a key of its position in the collection.
    blockCollection[key] = true;

    scene.add(copy);
}







var loader = new THREE.PLYLoader();

// Make the fixed model of block to reuse. 
var blockMesh = null;
var blockGeometry = null;

// Make the material for the block to reuse.
var blockMaterial = new THREE.MeshPhongMaterial();

// Load the model and store its geometry and mesh.
loader.load('models/singleBlock.ply', function (geometry) {

    geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    var center = geometry.boundingBox.getCenter();
    var size = geometry.boundingBox.getSize();

    var sca = new THREE.Matrix4();
    var tra = new THREE.Matrix4();

    sca.makeScale(3.5 / size.length(), 2.63 / size.length(), 3.5 / size.length());
    tra.makeTranslation(-center.x, -center.y + 0.13, -center.z);

    blockMesh = new THREE.Mesh(geometry, blockMaterial);
    blockGeometry = geometry;

    blockMesh.applyMatrix(tra);
    blockMesh.applyMatrix(sca);
    blockMesh.name = "loaded_block";

    blockMesh.castShadow = true;

});

// Create a block with the specified material and the 
function getBlock(color) {

    blockMesh.material.color.setHex(color);

    // Make a new block in the scene.
    var mesh = blockMesh;


    // Add the object to the scene.
    scene.add(mesh);

    return mesh;
}


