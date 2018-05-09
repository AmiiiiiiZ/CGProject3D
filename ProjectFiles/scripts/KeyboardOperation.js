
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

    if (keyboard[13]) { // enter - set the block here.

        // Check if the box can set here.
        if (canSetBlockHere(box.position.x, box.position.y, box.position.z)) {

            setBlockHere(box.position.x, box.position.y, box.position.z);
        }
        else {

            console.log("cannot put box here!");
        }

    }


}

// Do this when key up
function keyUp(event){
	keyboard[event.keyCode] = false;
}


// Add functions to event listener. 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);



function setButtonEvents() {

    $("#set-box").mousedown(function () {
        // Check if the box can set here.
        if (canSetBlockHere(box.position.x, box.position.y, box.position.z)) {

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

}




//var mouseIsDown = false;

//window.addEventListener('mousedown', mouseDown);

//function mouseDown(event) {
//    mouseIsDown = true;
//    console.log("Mouse Down!");

//}
