
// A collection of key-value pair to store the materials of different color.
var colorCollection = new Object();


// A function to decide which material to use. (Use old material of existing color or create a new material of different color)
function useMaterial(color, collection) {

    // When the color is old


    // When the color is new 
    var material = new THREE.MeshPhongMaterial();
    material.color.setHex(color);
    collection[color] = material;

    return material;
}


// A collection of blocks existing in the scene. To test if there are blocks under the place 
var blockCollection = new Object();


// A function to validate if a new block can be set here.
function canSetBlockHere(x, y, z) {



}



// A function to keep the location of the block newly set there.
function recordBlockPosition(x, y, z) {

    // Make the x,y,z values a string as the key.


    // Create the key of in the collection.


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

    sca.makeScale(3.2 / size.length(), 2.63 / size.length(), 3.2 / size.length());
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


