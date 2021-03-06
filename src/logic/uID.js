const Thread = require('./thread')

//TODO: Dev mode that logs max ID per ms and ID count
let usedIDs = [];

const queueMin = 10;
let queueIDs = [];

let start = () => {
  new Thread(() => {
    while(queueIDs.length < queueMin){
      let newID = Math.random().toString(36).substring(2,12);
      let unique = true;
      for(let i = 0; i < usedIDs.length; i++){
        if(usedIDs[i] === newID){
          unique = false;
          break;
        }
      }
      if(unique){
        for(let i = 0; i < queueIDs.length; i++){
          if(queueIDs[i] === newID){
            unique = false;
            break;
          }
        }
      }
      if(unique){
        queueIDs.push(newID);
      }
    }
  },100).start();
}

let getID = () => {
  return new Promise(function(resolve, reject) {
    if(queueIDs.length > 0){
      //TODO: make sure multithreading dosn't break this
      let newID = queueIDs.pop();
      usedIDs.push(newID);
      resolve(newID);
    }
    else{
      setTimeout(() => {
        getID()
        .then((id) => {
          resolve(id);
        });
      },1);
    }
  });
}

//TODO:
let freeID = (id) => {

}
start();

exports.getID = getID;
exports.freeID = freeID;
