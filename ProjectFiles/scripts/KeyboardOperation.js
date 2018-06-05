
// An array of keys we have pressed.
var keyboard = {};

// Boundry of the valid area to set block.
var boundry = 50;


// Do this when key down
function keyDown(event){
    keyboard[event.keyCode] = true;


    if (keyboard[65]) { // A key - left

        if (box.position.x > -boundry) {
            box.position.x -= 1;
            updateBlockPosition(box);
        }
    }

    if (keyboard[68]) { // D key - right

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

    if (keyboard[13] && !hiding) { // enter - set the block here.

        // Check if the box can set here.
        if (canSetBlockHere(box.position.x, box.position.y, box.position.z)) {

            setBlockHere(box.position.x, box.position.y, box.position.z);
        }
        else {

            console.log("cannot put box here!");
        }
    }
	
	if (keyboard[16]) { // shiftbar - car: turn on/off the headlight.
			
			headlight_flag *= -1;
			if(headlight_flag == 1){
				group.getObjectByName("headlight").intensity = 0.4;
			} else {
				group.getObjectByName("headlight").intensity = 0;
			}
	}	


    switch (event.keyCode) {

        // Keys to move the car.
        case 73: // i
            moveForward = true;
            group.getObjectByName("back1").material.color = new THREE.Color(0.5, 0, 0);
            break;

        case 74: // j
            moveLeft = true;
            group.getObjectByName("back1").material.color = new THREE.Color(0.5, 0, 0);
            break;

        case 75: // k
            moveBackward = true;
            group.getObjectByName("back1").material.color = new THREE.Color(0.5, 0, 0);
            break;

        case 76: // l
            moveRight = true;
            group.getObjectByName("back1").material.color = new THREE.Color(0.5, 0, 0);
            break;

        case 86: // V - Fall the block
            makeBlockFall();
            break;

        case 32: // Space Bar - Delete the block
            removeBlock();
            break;

    }
}

// Function to remove the selected block from scene.
function removeBlock() {
    if (selectedObjHere) {
        var key = previousObj.position.x.toString() + "-" + previousObj.position.y.toString() + "-" + previousObj.position.z.toString();

        blockCollection[key] = false;
        scene.remove(previousObj);
        previousObj = null;

        bone.visible = false;
    }
    selectedObjHere = false;
}

// Do this when key up
function keyUp(event){
	keyboard[event.keyCode] = false;
}


// Add functions to event listener. 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

// The variable to see if the control box is hidden.
var hiding = false;



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
}


var raycasterAnother = new THREE.Raycaster();
var selectedObjHere = false;
var previousObj = null;

// Switch to the mode of using mouse to set the box at the pointed position.
function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycasterAnother.setFromCamera(mouse, camera);

    var intersects = raycasterAnother.intersectObjects(scene.children, false);

    // If selected a box we have set here, display a frame over the box to show the selection. 
    if (intersects.length > 0 && intersects[0].object.name == 'block') {

        // If the mode now is that we can use click to move a control block here, we just move the virtual block to the face of the selected block.
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
        // If the mode now had disabled using mouse to move the control box, we will show the valid selection.
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

            selectedObjHere = true;
        }
    }
    // If the frame over a block is selected, the click will just remove it and the previous selection is removed.
    else if (intersects.length > 0 && intersects[0].object.name == 'bone') {

        bone.visible = false;
        selectedObjHere = false;
        previousObj = null;
        console.log("cancel selection!");
    }
    // If the ground is selected, when the mode is that we can move 
    else if (intersects.length > 0 && intersects[0].object.name == 'ground') {

        if (clickToMoveControl && clickToMoveControlStep > 1) {
            var x = Math.round(intersects[0].point.x);
            var z = Math.round(intersects[0].point.z);

            if (x > -boundry && x < boundry && z > -boundry && z < boundry ) {

                box.position.x = x;
                box.position.y = 0;
                box.position.z = z;
            }

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
document.addEventListener('click', onDocumentMouseDown, false);



    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 73: // i
          moveForward = false;
          //material_back.color=  new THREE.Color(1,0,0);
		  group.getObjectByName("back1").material.color = new THREE.Color(1, 0, 0);
          break;

        case 74: // j
          moveLeft = false;
          group.getObjectByName("back1").material.color = new THREE.Color(1, 0, 0);
          break;

        case 75: // k
          moveBackward = false;
          group.getObjectByName("back1").material.color = new THREE.Color(1, 0, 0);
          break;

        case 76: // l
          moveRight = false;
          group.getObjectByName("back1").material.color = new THREE.Color(1, 0, 0);
          break;

      }
    };
	
	window.addEventListener( 'keyup', onKeyUp, false );
