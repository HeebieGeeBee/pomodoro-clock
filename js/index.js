//some global variables
//set timer variable
var setTime = 25;
//current timer variable
var current = ("0" + setTime).slice(-2) + ':00.000';
//milliseconds variable
var millis;
//set break timer variable
var setBreakTime = 5;
//current break timer variable
var currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
//set break miiliseconds variable
var millisBreak;
var test;
var test2;
var reset = false;
var paused = false;
var alerts = true;

var alarm = new Audio();
alarm.src = "sounds/alarm.wav"
//create new tock for timer 
var countdown = new Tock({

  countdown: true,
  interval: 10,
  callback: function() {
    current = countdown.msToTime(countdown.lap());
    millis = countdown.lap();
  },
  complete: function() {
  }
  
});

//timer canvas
var timer = function() {
  //create canvas contest
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var milliMath = (millis/test)/1000 * 440/60;
  var breakMilliMath = (millisBreak/test2)/1000 * 440/60;
  var pauseMath = (breakCountdown.pause_time/test2)/1000 * 440/60;
  
  
  //draw timer
  
  //background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 440, 116);
  ctx.fillStyle = 'rgba(150, 255, 000, 1)';
  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgb(255, 255, 000)";
  
  //timing bars
  if (!countdown.go && !breakCountdown.go && countdown.pause_time === 0 && breakCountdown.pause_time === 0 || reset) {
    ctx.fillRect(0,0, 440, 15);
    ctx.fillRect(0,65, 440, 15);
  }
  if(breakCountdown.pause_time > 0) {
    ctx.fillStyle = 'rgba(255, 105, 000, 1)'; 
    ctx.fillRect(0,0, 440, 15);
    ctx.fillRect(0,65, 440, 15);    
    ctx.fillStyle = 'rgba(150, 255, 000, 1)';
    ctx.fillRect(0, 0, 440 + -Math.abs(pauseMath), 15);
    ctx.fillRect(0, 65, 440 + -Math.abs(pauseMath), 15);
  }
  ctx.fillRect(0, 0, milliMath , 15)
  ctx.fillRect(0, 65, milliMath , 15)
  ctx.fillStyle = 'rgba(255, 105, 000, 1)'
  ctx.fillRect(440, 0, -Math.abs(440 - milliMath), 15);
  ctx.fillRect(440, 65, -Math.abs(440 - milliMath), 15);
  if (breakCountdown.go) {
    ctx.fillStyle = 'rgba(255, 105, 000, 1)';
    ctx.fillRect(0, 0, 440, 15);
    ctx.fillRect(0, 65, 440, 15);
    ctx.fillStyle = 'rgba(150, 255, 000, 1)';
    ctx.fillRect(0, 0, 440 + -Math.abs(breakMilliMath) , 15);
    ctx.fillRect(0, 65, 440 + -Math.abs(breakMilliMath) , 15);
  };
  
  //timer
  ctx.fillStyle = "rgba(150, 255, 000, 1)";
  ctx.font = "45px 'Press Start 2P'";
  ctx.fillText(current, 20, 65);
  
   if (millis < 20 && alerts === true) {
    alarm.play();
  }
 
};

//timer set canvas
var setTimer = function() {
  //create convas context
  var canvas = document.getElementById('set-canvas');
  var ctx = canvas.getContext('2d');
  //draw set timer
  //background
  ctx.fillStyle = 'orange';
  ctx.fillRect(0, 0, 50, 100);
  //set timer
  ctx.fillStyle = "black";
  ctx.font = "40px arial";
  ctx.fillText(("0" + setTime).slice(-2), 0, 56);

};

//timer controller canvas
var control = function() {
  
  //create context for canvas
  var canvas = document.getElementById('control-canvas');
  var ctx = canvas.getContext('2d');

  //mouse position function 
  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    
  }

  //mouse inside bounds function
  function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
  }

  //rectangle bounds objects
  var pauseRect = {x: 19, y: 15, width: 66, height: 19};
  var startRect = {x: 19, y: 49, width: 66, height: 19};
  var increaseRect = {x: 104, y: 14, width: 25, height: 25};
  var decreaseRect = {x: 104, y: 45, width: 28, height: 28};
  //mouse click event listener
  canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var mouseIsDown = true;
    //mouse click pause
    if (isInside(mousePos, pauseRect)) {
      if(countdown.go || countdown.pause_time !== 0) {
        countdown.pause();
        if (paused) {
          paused = false;
        } else {
          paused = true;
        }
      }
      if(breakCountdown.go || breakCountdown.pause_time !== 0) {
        breakCountdown.pause();
        if (paused) {
          paused = false;
        } else {
          paused = true;
        }
      }
    } 
    //mouse click start
    if (isInside(mousePos, startRect)) {
      if(!countdown.go && !breakCountdown.go && breakCountdown.pause_time === 0 && countdown.pause_time === 0){
        reset = false;
        test = setTime;
        test2 = setBreakTime;
        millis = undefined;
        millisBreak = undefined;
        countdown.reset();
        breakCountdown.reset();
        countdown.start(test * 60000);
      }
      if(countdown.pause_time !== 0) {
        countdown.pause();
        if (paused) {
          paused = false;
        } else {
          paused = true;
        }
      }
      if(breakCountdown.pause_time !== 0) {
        breakCountdown.pause();
        if (paused) {
          paused = false;
        } else {
          paused = true;
        }
      }
    }
 
    //mouse click increase time
    if (isInside(mousePos, increaseRect)) {
      if (setTime < 60) {
        time = setInterval(function() {
          if (setTime < 60) {
            setTime++;
            if (!countdown.go && countdown.pause_time === 0) {
              current = ("0" + setTime).slice(-2) + ':00.000';
            } 
          }
        }, 100);
      }
    }
    //mouse click decrease time
    if (isInside(mousePos, decreaseRect)) {
      if (setTime > 1) {
        time = setInterval(function() {
          if (setTime > 1) {
            setTime--;
            if (!countdown.go && countdown.pause_time === 0) {
              current = ("0" + setTime).slice(-2) + ':00.000';
            } 
          }
        }, 100);
      }
    }

  });
 
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
  

        
  });
  
  
  //clear mouse hold interval for set time increase and decrease
  canvas.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    //clear increase/decrease set time intvervals
    
    if (isInside(mousePos, increaseRect) || isInside(mousePos, decreaseRect)) {
      clearInterval(time);
    }
    
    //rest timer current variable 
     if (!countdown.go && countdown.pause_time === 0) {
      current = ("0" + setTime).slice(-2) + ':00.000';
     }      
  });
  
  //Draw controls
  
  //background
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, 135, 80);
  //controls
  ctx.fillStyle = "black";
  //ctx.strokeRect(19, 15, 66, 19);
  ctx.font = "20px arial";
  ctx.fillText('PAUSE', 20, 32);
  ctx.fillText('START', 21, 65);
  //arrows
  ctx.font = "42px arial";
  ctx.fillText('\u25B2', 96, 40);
  ctx.fillText('\u25BC', 96, 70);

};

//create new tock for break
var breakCountdown = new Tock({
  
  countdown:true,
  interval: 10,
  callback: function() {
    currentBreak = breakCountdown.msToTime(breakCountdown.lap());
    millisBreak = breakCountdown.lap();
  },
  complete: function() {
    
  }
  
});

//timer canvas
var breakTimer = function() {
  //create canvas contest
  var canvas = document.getElementById('break-canvas');
  var ctx = canvas.getContext('2d');
  var milliMath = (millis/test)/1000 * 440/60;
  var breakMilliMath = (millisBreak/test2)/1000 * 440/60;
  var pauseMath = (countdown.pause_time/test)/1000 * 440/60;
  //draw timer
  //background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 440, 116);
  ctx.fillStyle = 'rgba(255, 105, 000, 1)';
  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgb(255, 105, 000)";
  //time bars
  if (!countdown.go && !breakCountdown.go && countdown.pause_time === 0 && breakCountdown.pause_time === 0 || reset) {
    ctx.fillRect(0,0, 440, 15);
    ctx.fillRect(0,65, 440, 15);
  }
  if(countdown.pause_time > 0) {
    ctx.fillStyle = 'rgba(150, 255, 000, 1)';
    ctx.fillRect(0,0, 440, 15);
    ctx.fillRect(0,65, 440, 15);
    ctx.fillStyle = 'rgba(255, 105, 000, 1)';
    ctx.fillRect(0, 0, 440 + -Math.abs(pauseMath), 15);
    ctx.fillRect(0, 65, 440 + -Math.abs(pauseMath), 15);
  }
  ctx.fillRect(0, 0, breakMilliMath , 15)
  ctx.fillRect(0, 65, breakMilliMath , 15)
  ctx.fillStyle = 'rgba(150, 255, 000, 1)';
  ctx.fillRect(440, 0, -Math.abs(440 - breakMilliMath), 15);
  ctx.fillRect(440, 65, -Math.abs(440 - breakMilliMath), 15);
  if (countdown.go) {
    ctx.fillStyle = 'rgba(150, 255, 000, 1)';
    ctx.fillRect(0, 0, 440, 15);
    ctx.fillRect(0, 65, 440, 15);
    ctx.fillStyle = 'rgba(255, 105, 000, 1)';
    ctx.fillRect(0, 0, 440 + -Math.abs(milliMath) , 15);
    ctx.fillRect(0, 65, 440 + -Math.abs(milliMath) , 15);
  };
  
  //timer
  
  ctx.font = "45px 'Press Start 2P'";
  ctx.fillStyle = "rgba(255, 105, 000, 1)";
  ctx.fillText(currentBreak, 20, 65);
  if (millisBreak === 0) {
    ctx.fillText(currentBreak, 20, 65);
  }
  
  if (millisBreak < 40 && alerts === true) {
    alarm.play();
  }
 
};

//timer set canvas
var setBreakTimer = function() {
  //create convas context
  var canvas = document.getElementById('break-set-canvas');
  var ctx = canvas.getContext('2d');
  //draw set timer
  //background
  ctx.fillStyle = 'orange';
  ctx.fillRect(0, 0, 50, 100);
  //set timer
  ctx.fillStyle = "black";
  ctx.font = "40px arial";
  ctx.fillText(("0" + setBreakTime).slice(-2), 0, 56);

};

//timer controller canvas
var breakControl = function() {
  
  //create context for canvas
  var canvas = document.getElementById('break-control-canvas');
  var ctx = canvas.getContext('2d');

  //mouse position function 
  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    
  }

  //mouse inside bounds function
  function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
  }

  //rectangle bounds objects
  var resetRect = {x: 19, y: 10, width: 66, height: 19};
  var alertRect = {x: 14, y: 44, width: 79, height: 19};
  var increaseRect = {x: 104, y: 14, width: 25, height: 25};
  var decreaseRect = {x: 104, y: 45, width: 28, height: 28};
  //mouse click event listener
  canvas.addEventListener('mousedown', function(evt) {
    console.log('click');
    var mousePos = getMousePos(canvas, evt);
    var mouseIsDown = true;

    //mouse click reset
    if (isInside(mousePos, resetRect)) {
      if(!current.go && !currentBreak.go) {
        reset = true;
        millis = undefined;
        millisBreak = undefined;
        countdown.reset();
        breakCountdown.reset();
        breakCountdown.pause_time = 0;
        countdown.pause_time = 0;
        //test = setTime;
        //test2 = setBreakTime;
        current = ("0" + setTime).slice(-2) + ':00.000';
        currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
      }
    } 
    //mouse click increase time
    if (isInside(mousePos, increaseRect)) {
      if (setBreakTime < 60) {
        time = setInterval(function() {
          if (setBreakTime < 60) {
            setBreakTime++;
            if (breakCountdown.go === false && breakCountdown.pause_time === 0) {
              currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
            }
          }
        }, 100);
      }
    }
    //mouse click decrease time
    if (isInside(mousePos, decreaseRect)) {
      if (setBreakTime > 1) {
        time = setInterval(function() {
          if (setBreakTime > 1) {
            setBreakTime--;
            if (breakCountdown.go === false && breakCountdown.pause_time === 0) {
              currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
            }
          }
        }, 100);
      }
    }
    
    if (isInside(mousePos, alertRect)) {
      
      if (alerts) {
        alerts = false; 
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.lineTo(14, 44);
        ctx.lineTo(93, 60);
        ctx.stroke();
      }else {
        alerts = true;
        ctx.fillStyle= 'orange';
        ctx.fillRect(0, 35, 100, 39);
        ctx.fillStyle = 'black';
        ctx.font = "20px arial";
        ctx.fillText('ALERTS', 16, 60)
      }
      console.log(alerts);
    
    }

  });
   canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
      
      
   
   });   
  //clear mouse hold interval for set time increase and decrease
  canvas.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, increaseRect) || isInside(mousePos, decreaseRect)) {
      clearInterval(time);
    }
    
    if (breakCountdown.go === false && breakCountdown.pause_time === 0) {
      currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
    }


    
    
    
    
  });

  //Draw controls
  //background
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, 135, 80);
  //controls
  ctx.fillStyle = "black";
//  ctx.strokeRect(14, 44, 79, 19);
  ctx.font = "20px arial";
  ctx.fillText('RESET', 20, 27);
   ctx.fillText('ALERTS', 16, 60); 

  //arrows
  ctx.font = "42px arial";
  ctx.fillText('\u25B2', 96, 40);
  ctx.fillText('\u25BC', 96, 70);

};

//millisecond listener function
var milliListener = function() {
  if(millis === 0 && breakCountdown.pause_time === 0) {
    breakCountdown.start(setBreakTime * 60000);
    millis = undefined;
    current = ("0" + setTime).slice(-2) + ':00.000';
  }
  if(millisBreak === 0 && countdown.pause_time === 0) {
    countdown.start(setTime * 60000);
    millisBreak = undefined;
    currentBreak = ("0" + setBreakTime).slice(-2) + ':00.000';
  }
};

//onload launch function
window.onload = function() {
  //initiate controls
  control();
  //initiate time set canvas with intervals
  setInterval(setTimer, 40);
  //initiate the timer with intervals
  setInterval(timer, 10);
  //initiate break timer controls
  breakControl();
  //initiate break time set with intervals
  setInterval(setBreakTimer, 40);
  //initiate break timer with intervals
  setInterval(breakTimer, 40);
  //initiate milliListener with intervals
  setInterval(milliListener, 40);
  
 
  
};