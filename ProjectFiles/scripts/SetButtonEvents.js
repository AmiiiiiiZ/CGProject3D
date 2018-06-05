

// Set events to button.
function setButtonEvents() {

    // Make the selected block fall.
    $("#fall").mousedown(function () {

        makeBlockFall();
        console.log("panel clicked!");
    });

    // Avoid setting the control block under the control panel when we click the panel.
    $("#controls").mousedown(function () {
        
        clickToMoveControlStep = 1;

        console.log("panel clicked!");
    });

    // Set the block here.
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

    // Move the virtual box by 1 unit. The following 6 are different directions.
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
        if (selectedObjHere) {
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

        removeBlock();
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
        selectedObjHere = false;
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

                    var color = read.boxes[i].color - 0;

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
                    scene.fog = new THREE.FogExp2(0x666666, 0.01);
                    $(this).text("Back from Adventure!");

				} 
				if (camera_flag > 0) {
					scene.remove(group);
					scene.remove(camera2);
					//scene.add(camera);
                    scene.fog = new THREE.FogExp2(0xffdcaa, 0.0003);
                    $(this).text("Start Adventure!");
				}
	});
	
	//Screen Shot
	$("#screenshot").mousedown(function () {
		saveAsImage();
    });

    // Show credit
    $("#credit").mousedown(function () {

        $("#middle").show();
    });

    // Close credit
    $("#close").mouseup(function () {
        $("#cover").hide();
        $("#middle").hide();
    });
}

var panelVisible = false;

$(document).ready(function () {

    $("#controls").hide();

    // Show/close control panel
    $("#showPanel").click(function () {

        if (panelVisible) {
            $("#controls").hide();
            panelVisible = false;
            $(this).text("Show Control Panel");
        }
        else {
            $("#controls").show();
            panelVisible = true;
            $(this).text("Hide Control Panel");
        }
    });

});
