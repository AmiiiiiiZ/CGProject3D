
var keyboard = {};




function keyDown(event){
    keyboard[event.keyCode] = true;

    if (keyboard[37]) { // left arrow key

        box.position.x -= 1;

    }

    if (keyboard[39]) { // right arrow key

        box.position.x += 1;

    }

    if (keyboard[38]) { // up arrow key

        box.position.z -= 1;

    }

    if (keyboard[40]) { // down arrow key

        box.position.z += 1;

    }

    if (keyboard[87]) { // W key

        box.position.y += 1;

    }

    if (keyboard[83]) { // S key

        box.position.y -= 1;

    }

    if (keyboard[32]) { // spacebar - delete the block

        
    }

    if (keyboard[13]) { // enter - set the block here.

        var copy = box.clone();
        scene.add(copy);
    }


}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

