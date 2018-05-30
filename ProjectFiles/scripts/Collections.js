
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
        material = new THREE.MeshPhongMaterial({
            color: color
        });
        material.map = loader.load('img/text1.png');

        collection[color] = material;
        console.log("new material created!");
    }

    return material;
}


function updateBlockPosition(object) {

    bottomBlock.position.x = object.position.x;
    bottomBlock.position.y = -0.49;
    bottomBlock.position.z = object.position.z;

    ball.position.x = object.position.x;
    ball.position.z = object.position.z;
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
    copy.name = "block";

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



function saveAsImage() {
        var imgData, imgNode;

        try {
			var strDownloadMime = "image/octet-stream";
            var strMime = "image/jpeg";
            imgData = renderer.domElement.toDataURL(strMime);
			saveFile(imgData.replace(strMime, strDownloadMime), "screenshot.jpg");
			//console.log(imgData);
			
        } catch (e) {
            console.log(e);
            return;
        }

};

var saveFile = function (strData, filename) {
    		
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
        	//var html="<img src='"+strData+"' alt='canvas image'/>";
		    //var newTab=window.open();
		    //newTab.document.write(html);
        		
        		if (typeof window.navigator.msSaveBlob !== 'undefined') { // IE
                //var blob = new Blob([blob], { type: 'application/pdf' });
                //window.navigator.msSaveBlob(blob, filename);
                //var html="<img src='"+strData+"' alt='canvas image'/>";
		        		//var newTab=window.open();
		        		//newTab.document.write(html);
		        		
		        		// convert base64 to raw binary data held in a string
						    var byteString = atob(strData.split(',')[1]);

						    // separate out the mime component
						    var mimeString = strData.split(',')[0].split(':')[1].split(';')[0];

						    // write the bytes of the string to an ArrayBuffer
						    var arrayBuffer = new ArrayBuffer(byteString.length);
						    var _ia = new Uint8Array(arrayBuffer);
						    for (var i = 0; i < byteString.length; i++) {
						        _ia[i] = byteString.charCodeAt(i);
						    }

						    var dataView = new DataView(arrayBuffer);
						    var blob = new Blob([dataView], { type: mimeString });
						    
						    window.navigator.msSaveBlob(blob, filename);
						    
            } else {//if (typeof window.chrome !== 'undefined') { // Chrome
					document.body.appendChild(link); //Firefox requires the link to be in the body
		            link.download = filename;
					//console.log("what:"+strData);
		            link.href = strData;
		            link.click();
		            document.body.removeChild(link); //remove the link when done
		      }
        } else {
            location.replace(uri);
        }

};
