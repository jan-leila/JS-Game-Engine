/*
 * Mouse is in charge of logging the mouses position of the cursor on the screen
 * Mouse buttons are handeled by controller
 */
class Mouse {
  constructor(){
    this.x = 0;
    this.y = 0;

    this.onMove = [];

  	window.addEventListener("mousemove", (e) => {
  		this.x = e.x;
  		this.y = e.y;
  	});
  }

  move(func){
    window.addEventListener("mousemove", (e) => {
  		func();
  	});
  }

  scroll(func){
    window.addEventListener("mousewheel", (e) => {
  		func();
  	}, {passive: true});
  }
}

/*
 * Controller is in charge of all buttons including the mouse buttons
 * Mouse buttons are defined in the bindings as:
 *  MouseL - left mouse button
 *  MouseM - middle click
 *  MouseR - right mouse button
 * Example button:
 *  KeyD - D button on keyboard
 */
class Controler {
  constructor(){
    this.bindings = {};
    this.buttonsDown = {};
    window.addEventListener('mousedown', (e) => {
      switch (e.button) {
        case 0:
          this.buttonDown(this.bindings['MouseL']);
          break;
        case 1:
          this.buttonDown(this.bindings['MouseM']);
          break;
        case 2:
          this.buttonDown(this.bindings['MouseR']);
          break;
      }
    });
    window.addEventListener('mouseup', (e) => {
      switch (e.button) {
        case 0:
          this.buttonUp(this.bindings['MouseL']);
          break;
        case 1:
          this.buttonUp(this.bindings['MouseM']);
          break;
        case 2:
          this.buttonUp(this.bindings['MouseR']);
          break;
      }
    });

    window.addEventListener("keydown", (e) => {
      if(this.buttonsDown[e.code] !== true){
        this.buttonsDown[e.code] = true;
        this.buttonDown(this.bindings[e.code]);
      }
    });
    window.addEventListener("keyup", (e) => {
      this.buttonsDown[e.code] = false;
      this.buttonUp(this.bindings[e.code]);
    });

    this.downCount = {};
    window.addEventListener('blur', (e) => {
      for(let button in this.downCount){
        while(this.downCount[button] > 0){
          this.buttonUp(button);
        }
      }
    });

    this.downEvents = {};
    this.upEvents = {};
  }

  buttonDown(button){
    this.downCount[button]++;
    if(!button || !this.downEvents[button]){
      return;
    }
    if(this.downCount[button] === 1){
      this.downEvents[button].map((func) => {
        func();
      });
    }
  }
  buttonUp(button){
    this.downCount[button]--;
    if(!button || !this.upEvents[button]){
      return;
    }
    if(this.downCount[button] === 0){
      this.upEvents[button].map((func) => {
        func();
      });
    }
  }

  //NOTE: Buttons can only have one binding each
  //Added a binding for a button
  addBinding(code, button){
    this.bindings[code] = button;
  }
  //Removes a binding for a button
  removeBinding(code){
    delete this.bindings[code];
  }

  down(button, func){
    if(!this.downEvents[button]){
      this.downEvents[button] = [];
    }
    if(this.downCount[button] === undefined){
      this.downCount[button] = 0;
    }
    this.downEvents[button].push(func);
    return this;
  }
  up(button, func){
    if(!this.upEvents[button]){
      this.upEvents[button] = [];
    }
    if(this.downCount[button] === undefined){
      this.downCount[button] = 0;
    }
    this.upEvents[button].push(func);
    return this;
  }

  //TODO: add event removers
  removeDown(){}
  removeUp(){}

  //TODO: button combo trigger
  //TODO: Multi button tirgger
}

exports.Controler = new Controler();
exports.Mouse = new Mouse();
