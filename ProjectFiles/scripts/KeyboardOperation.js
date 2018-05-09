
// An array of keys we have pressed.
var keyboard = {};



// Do this when key down
function keyDown(event){
    keyboard[event.keyCode] = true;
    

    if (keyboard[32]) { // spacebar - delete the block

        
    }

    if (keyboard[13]) { // enter - set the block here.

        // Check if the box can set here.
        if (canSetBlockHere(box.position.x, box.position.y, box.position.z)) {

            var copy = getBox(colorChanger.color);
            copy.position.x = box.position.x;
            copy.position.y = box.position.y;
            copy.position.z = box.position.z;
            console.log("new box created here!");

            // Store the created box.
            blockCollection[copy.position.x.toString() + "-" + copy.position.y.toString() + "-" + copy.position.z.toString()] = true;

            scene.add(copy);
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








//var mouseIsDown = false;

//window.addEventListener('mousedown', mouseDown);

//function mouseDown(event) {
//    mouseIsDown = true;
//    console.log("Mouse Down!");

//}
