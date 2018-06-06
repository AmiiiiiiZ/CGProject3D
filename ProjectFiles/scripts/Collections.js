
// A collection of key-value pair to store the materials of different color.
var colorCollection = new Object();


// A function to decide which material to use. (Use old material of existing color or create a new material of different color)
function useMaterial(color, collection, transparency) {

    var material = null;
    // When the color is old, use old material to save memory.
    if (collection[color] != null) {
        material = collection[color];
        console.log("old material used!");
    }
    else {
        // When the color is new, create a new material to hold this color. 
        material = new THREE.MeshToonMaterial({
            transparent: true,
            opacity: 0.9,
            flatShading: true
        });
        material.color.setHex(color);
        material.bumpMap = loader.load('img/mi.jpg');
        collection[color] = material;
        console.log("new material created!");
    }

    return material;
}

// Funtion to move the objects related to one block when we move it.
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


// Collection of blocks which can fall
var fallCollection = new Object();
var yCollection = new Object();

// Function to make the selected block fall.
function makeBlockFall() {

    if (selectedObjHere) {
        var x = previousObj.position.x;
        var y = previousObj.position.y;
        var z = previousObj.position.z;
        var originalKey = x.toString() + "-" + y.toString() + "-" + z.toString();

        var canFall = false;
        var finalY = 0;
        for (var i = y - 1; i >= 0; i--) {

            var tempKey = x.toString() + "-" + i.toString() + "-" + z.toString();
            if (!blockCollection[tempKey]) {
                canFall = true;
                finalY = i;
            }
            else {
                break;
            }
        }

        if (canFall) {
            var newKey = x.toString() + "-" + finalY.toString() + "-" + z.toString();
            blockCollection[originalKey] = false;
            fallCollection[newKey] = previousObj;
            yCollection[newKey] = finalY;
            blockCollection[newKey] = true;

            bone.visible = false;
            selectedObjHere = false;
            previousObj = null;
        }
    }
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
