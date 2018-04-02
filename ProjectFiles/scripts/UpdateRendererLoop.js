	// Constantly update the renderer/scene.
	var MyUpdateLoop = function ( )
	{
		//call the render with the scene and the camera
		renderer.render(scene,camera);
		//finally perform a recoursive call to update again
		//this must be called because the mouse change the camera position
		requestAnimationFrame(MyUpdateLoop);
	};

	requestAnimationFrame(MyUpdateLoop);
	
	
	// An equivalent function to update the renderer.
	function update(renderer, scene, camera){
		
		// Update one time.
		renderer.render(scene, camera);
		
		// Looping
		requestAnimationFrame(function(){
			update(renderer, scene, camera);
		});
	}