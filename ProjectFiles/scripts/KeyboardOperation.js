
// An array of keys we have pressed.
var keyboard = {};



// Do this when key down
function keyDown(event){
    keyboard[event.keyCode] = true;

    if (keyboard[37]) { // left arrow key

        if (box.position.x > -50)
        box.position.x -= 2;

    }

    if (keyboard[39]) { // right arrow key

        if (box.position.x < 50)
        box.position.x += 2;

    }

    if (keyboard[38]) { // up arrow key

        if (box.position.z > -50)
        box.position.z -= 2;

    }

    if (keyboard[40]) { // down arrow key

        if (box.position.z < 50)
        box.position.z += 2;

    }

    if (keyboard[87]) { // W key

        if (box.position.y < 50)
        box.position.y += 1;

    }

    if (keyboard[83]) { // S key

        if (box.position.y > 0)
        box.position.y -= 1;

    }

    if (keyboard[32]) { // spacebar - delete the block

        
    }

    if (keyboard[13]) { // enter - set the block here.

        var copy = blockMesh.clone();
        copy.position.x = box.position.x;
        copy.position.y = box.position.y;
        copy.position.z = box.position.z;
        scene.add(copy);
    }


}

// Do this when key up
function keyUp(event){
	keyboard[event.keyCode] = false;
}



