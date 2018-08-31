function setup(){

	var canvas = document.getElementById('canvas');

	ctx = canvas.getContext('2d');

	function resizeCanvas(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas()

	//All keyboard events
	//Keydown
	function keyDown(event) {
		var key = event.key;
	};
	window.addEventListener("keydown", keyDown);
	//Keyup
	function keyUp(event) {
		var key = event.key;
	};
	window.addEventListener("keyup", keyUp);

	//All mouse events
	//Moves moves
	function mouseMove(event){
		mouseX = event.x;
		mouseY = event.y;
	}
	window.addEventListener("mousemove", mouseMove);
	//Mouse Down
	function mouseDown(event){
			switch(event.which){
				case 1:
					//Left Click
					break;
				case 2:
					//Mid Click
					break;
				case 3:
					//Right Click
					break;
			}
	}
	window.addEventListener("mousedown", mouseDown);
	//Mouse Up
	function mouseUp(event){
		switch(event.which){
			case 1:
				//Left Click
				break;
			case 2:
				//Mid Click
				break;
			case 3:
				//Right Click
				break;
		}
	}
	window.addEventListener("mouseup", mouseUp);
	//Mouse scroles
	function mouseScroll(event){
		Delta = event.wheelDelta;
		DeltaY = event.wheelDeltaY;
		DeltaX = event.wheelDeltaX;
	}
	window.addEventListener("mousewheel", mouseScroll,{passive: true});

	window.setInterval(tick,spt * 1000);

	window.requestAnimationFrame(draw);
}

function tick(){

}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	window.requestAnimationFrame(draw);
}

window.onload = setup();
