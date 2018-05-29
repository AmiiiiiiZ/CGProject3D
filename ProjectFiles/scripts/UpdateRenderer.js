
//create the webgl renderer
var renderer = new THREE.WebGLRenderer( );
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Enable shadow effect.
renderer.shadowMap.enabled = true;
	
//this function is called when the window is resized
var MyResize = function ( )
{
    //get the new sizes
    var width = window.innerWidth;
    var height = window.innerHeight;
    //then update the renderer
    renderer.setSize(width, height);
    //and update the aspect ratio of the camera
    camera.aspect = width / height;
    camera2.aspect = width / height;
};
//link the resize event of the window to the update method of the renderer.
window.addEventListener( 'resize', MyResize);
	

	