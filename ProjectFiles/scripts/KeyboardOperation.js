
// An array of keys we have pressed.
var keyboard = {};

var boundry = 50;



// Do this when key down
function keyDown(event){
    keyboard[event.keyCode] = true;


    if (keyboard[65]) { // A key

        if (box.position.x > -boundry) {
            box.position.x -= 1;
            updateBlockPosition(box);
        }

    }

    if (keyboard[68]) { // D key

        if (box.position.x < boundry) {
            box.position.x += 1;
            updateBlockPosition(box);
        }

    }

    if (keyboard[82]) { // R - forward

        if (box.position.z > -boundry) {
            box.position.z -= 1;
            updateBlockPosition(box);

        }

    }

    if (keyboard[70]) { // F - backward

        if (box.position.z < boundry) {
            box.position.z += 1;
            updateBlockPosition(box);

        }

    }

    if (keyboard[87]) { // W key - raise

        if (box.position.y < boundry) {
            box.position.y += 1;
            updateBlockPosition(box);

        }

    }

    if (keyboard[83]) { // S key - fall

        if (box.position.y > 0) {
            box.position.y -= 1;
            updateBlockPosition(box);

        }

    }

    if (keyboard[32]) { // spacebar - delete the block

        
    }

    if (keyboard[13] && !hiding) { // enter - set the block here.

        // Check if the box can set here.
        if (canSetBlockHere(box.position.x, box.position.y, box.position.z)) {

            setBlockHere(box.position.x, box.position.y, box.position.z);
        }
        else {

            console.log("cannot put box here!");
        }

    }

    switch (event.keyCode) {


        case 73: // i
            moveForward = true;
            material_back.color = new THREE.Color(0.5, 0, 0);
            //backlight1.intensity = 0;
            //backlight2.intensity = 0;
            break;

        case 74: // j
            moveLeft = true;
            material_back.color = new THREE.Color(0.5, 0, 0);
            //backlight1.intensity = 0;
            //backlight2.intensity = 0;
            break;

        case 75: // k
            moveBackward = true;
            material_back.color = new THREE.Color(0.5, 0, 0);
            //backlight1.intensity = 0;
            //backlight2.intensity = 0;
            break;

        case 76: // l
            moveRight = true;
            material_back.color = new THREE.Color(0.5, 0, 0);
            //backlight1.intensity = 0;
            //backlight2.intensity = 0;
            break;

    }
}

// Do this when key up
function keyUp(event){
	keyboard[event.keyCode] = false;
}


// Add functions to event listener. 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

var hiding = false;

function setButtonEvents() {

    $("#controls").mousedown(function () {
        
        clickToMoveControlStep = 1;

        console.log("panel clicked!");
    });

    $("#set-box").mousedown(function () {
        // Check if the box can set here.
        if (canSetBlockHere(box.position.x, box.position.y, box.position.z) && !hiding) {

            setBlockHere(box.position.x, box.position.y, box.position.z);
        }
        else {

            console.log("cannot put box here!");
        }
        console.log("set box button clicked!");
    });

    $("#up").mousedown(function () {
        if (box.position.y < boundry) {
            box.position.y += 1;
            updateBlockPosition(box);

        }
        console.log("button clicked!");
    });

    $("#forward").mousedown(function () {

        if (box.position.z > -boundry) {
            box.position.z -= 1;
            updateBlockPosition(box);

        }
        console.log("button clicked!");
    });

    $("#left").mousedown(function () {
        if (box.position.x > -boundry) {
            box.position.x -= 1;
            updateBlockPosition(box);

        }
        console.log("button clicked!");
    });

    $("#right").mousedown(function () {
        if (box.position.x < boundry) {
            box.position.x += 1;
            updateBlockPosition(box);

        }
        console.log("button clicked!");
    });


    $("#backward").mousedown(function () {
        if (box.position.z < boundry) {
            box.position.z += 1;
            updateBlockPosition(box);

        }
        console.log("button clicked!");
    });

    $("#down").mousedown(function () {
        if (box.position.y > 0) {
            box.position.y -= 1;
            updateBlockPosition(box);

        }
        console.log("button clicked!");
    });

    // Hide the controlled box
    $("#hide").mousedown(function () {
        if ($(this).text() == "Hide Control Block") {

            hideControlBox();

            $(this).text("Show Control Block");
        }
        else {

            showControlBox();

            $(this).text("Hide Control Block");
        }
        console.log("button clicked!");
    });

    // Change color of the controlled box
    $("#color").mousedown(function () {
        if (selectedObj) {
            var color = previousObj.material.color.getHex();
            colorChanger.color = color;
        }
        console.log("button clicked!");
    });

    // Remove the selected object.
    $("#move").mousedown(function () {
        if ($(this).text() == "by Click") {
            clickToMoveControl = true;
            clickToMoveControlStep = 1;

            $(this).text("only by Keyboard/Panel");
        }
        else {
            clickToMoveControl = false;
            clickToMoveControlStep = 0;

            $(this).text("by Click");
        }
        console.log("button clicked!");
    });

    // Remove the selected block
    $("#remove").mousedown(function () {
        if (selectedObj) {
            var key = previousObj.position.x.toString() + "-" + previousObj.position.y.toString() + "-" + previousObj.position.z.toString();

            blockCollection[key] = false;
            scene.remove(previousObj);
            previousObj = null;

            bone.visible = false;
        }
        selectedObj = false;
        console.log("button clicked!");
    });

    // Remove the all blocks
    $("#remove-all").mousedown(function () {

        for (var i = scene.children.length - 1; i >= 0; i--) {

            if (scene.children[i].name == 'block') {
                var child = scene.children[i];
                scene.remove(child);

                var key = child.position.x.toString() + "-" + child.position.y.toString() + "-" + child.position.z.toString();

                blockCollection[key] = false;
            }
        }
        
        previousObj = null;
        selectedObj = false;
        bone.visible = false;
        console.log("button clicked!");
    });


    // Save the scene you build
    $("#save").mousedown(function () {

        // Information needed: X,Y,Z, color
        var txt = '{ "boxes" : [';

        scene.traverse(function (child) {
            if (child.name == 'block') {
                var obj = '{ "x":"' + child.position.x + '" , "y":"' + child.position.y + '" , "z":"' + child.position.z + '" , "color":"' + child.material.color.getHex() + '" },';
                txt += obj;
            }
        });

        txt += ']}';
        console.log("Data: " + txt);

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("POST", "scripts/db/save.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("boxes="+txt);

        console.log("button clicked!");
    });

    // Load the scene you built
    $("#load").mousedown(function () {

        // Get from the file
        $.get("scripts/db/boxes.txt", function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);

            var read = eval("(" + data + ")");

            for (var i = 0; i < read.boxes.length; i++) {

                var x = read.boxes[i].x;
                var y = read.boxes[i].y;
                var z = read.boxes[i].z;

                if (canSetBlockHere(x, y, z)) {

                    var color = read.boxes[i].color;

                    var key = x.toString() + "-" + y.toString() + "-" + z.toString();

                    var copy = getBox(color);
                    copy.position.set(x, y, z);
                    console.log("new box created here!");
                    copy.name = "block";

                    // Store the created box by making a key of its position in the collection.
                    blockCollection[key] = true;

                    scene.add(copy);
                }
            }

        });

        console.log("button clicked!");
    });
	
	//Change to camera2 for adventure mode.
	$("#adventure").mousedown(function () {
		camera_flag *= -1;
					
				if (camera_flag < 0){
					scene.add(group);
					scene.add(camera2);
					//scene.remove(camera);
				} 
				if (camera_flag > 0) {
					scene.remove(group);
					scene.remove(camera2);
					//scene.add(camera);
				}
	});
	
	//Screen Shot
	$("#screenshot").mousedown(function () {
		saveAsImage();
	});
}

// Load previous building from a file. Finish the function of loading the selected file dynamically later.
function loadBoxes(file) {

    // Information needed: X,Y,Z, color


}


// Hide the block being controlled
function hideControlBox() {
    console.log("Block hided!");

    box.visible = false;
    ball.visible = false;
    bottomBlock.visible = false;
    hiding = true;
}

// Show the control block again
function showControlBox() {

    box.visible = true;
    ball.visible = true;
    bottomBlock.visible = true;
    hiding = false;

    // Also make camera look at the showing block.

}


var raycaster = new THREE.Raycaster();
var selectedObj = false;
var previousObj = null;

// Switch to the mode of using mouse to set the box at the pointed position.
function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    // If selected the non-controlled box, 
    // 
    if (intersects.length > 0 && intersects[0].object.name != 'ground' && intersects[0].object.name != 'bone' && intersects[0].object.name != 'control'
        && intersects[0].object.name != 'cone') {

        if (clickToMoveControl) {
            if (clickToMoveControlStep > 1) {
                var obj = intersects[0].object.position;
                var normal = intersects[0].face.normal;
                console.log("normal x: " + normal.x + " y: " + normal.y + " z: " + normal.z);
                console.log("object name:" + intersects[0].object.name + " x: " + obj.x + " y: " + obj.y + " z: " + obj.z);

                box.position.x = parseInt(obj.x) + parseInt(normal.x);
                box.position.y = parseInt(obj.y) + parseInt(normal.y);
                box.position.z = parseInt(obj.z) + parseInt(normal.z);
                console.log(" x: " + box.position.x + " y: " + box.position.y + " z: " + box.position.z);

                updateBlockPosition(box);
            }
            else if (clickToMoveControlStep == 1) {
                clickToMoveControlStep++;
            }

        }
        else {

            console.log("object selected!");
            bone.visible = true;
            previousObj = intersects[0].object;

            var boxPosition = intersects[0].object.position;
            bone.position.x = boxPosition.x;
            bone.position.y = boxPosition.y;
            bone.position.z = boxPosition.z;

            // Check the normal of the face clicked
            var normal = intersects[0].face.normal;
            console.log("normal x: " + normal.x + " y: " + normal.y + " z: " + normal.z);

            selectedObj = true;
        }
    }
    else if (intersects.length > 0 && intersects[0].object.name == 'bone') {

        bone.visible = false;
        selectedObj = false;
        previousObj = null;
        console.log("cancel selection!");
    }
    else if (intersects.length > 0 && intersects[0].object.name == 'ground') {

        if (clickToMoveControl && clickToMoveControlStep > 1) {
            var x = Math.round(intersects[0].point.x);
            var y = Math.round(intersects[0].point.y + 0.5);
            var z = Math.round(intersects[0].point.z);

            box.position.x = x;
            box.position.y = y;
            box.position.z = z;

            updateBlockPosition(box);
        }
        else if (clickToMoveControlStep == 1) {
            clickToMoveControlStep++;
        }

        console.log("ground point x: " + Math.round(intersects[0].point.x) + " y: " + Math.round(intersects[0].point.y + 0.5) + " z: " + Math.round(intersects[0].point.z));
    }

}


var clickToMoveControl = false;
var clickToMoveControlStep = 0;


// when the mouse is clicked, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);


//coudn't merge in the original key event function. An error occured..
var onKeyDown = function ( event ) {

      

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 73: // i
          moveForward = false;
          material_back.color=  new THREE.Color(1,0,0);
          //backlight1.intensity = 0.2;
          //backlight2.intensity = 0.2;
          break;

        case 74: // j
          moveLeft = false;
          material_back.color=  new THREE.Color(1,0,0);
          //backlight1.intensity = 0.2;
          //backlight2.intensity = 0.2;
          break;

        case 75: // k
          moveBackward = false;
          material_back.color=  new THREE.Color(1,0,0);
          //backlight1.intensity = 0.2;
          //backlight2.intensity = 0.2;
          break;

        case 76: // l
          moveRight = false;
          material_back.color=  new THREE.Color(1,0,0);
          //backlight1.intensity = 0.2;
          //backlight2.intensity = 0.2;
          break;

      }
    };
	
	window.addEventListener( 'keyup', onKeyUp, false );
