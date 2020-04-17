var min,sec,ms,count, malt, salt, msalt;

var stopwatch = {
  start: function(){
    if(document.getElementById("start").firstChild.nodeValue != "Start"){
      document.getElementById("start").firstChild.nodeValue = "Start";
    }
    ms = 0;
    sec = 0;
    min = 0;
    count = setInterval(function(){
      if(ms == 100){
        ms = 0;
        if(sec == 60){
          sec = 0;
          min++;
        }
        else{
          sec++;
        }
      }
      else{
        ms++;
      }
      
      malt = stopwatch.pad(min);
      salt = stopwatch.pad(sec);
      msalt = stopwatch.pad(ms);
      
      stopwatch.update(malt + ":" + salt + ":" + msalt);
    }, 10);
    },
  stop: function(){
    
    clearInterval(count);
 document.getElementById("start").firstChild.nodeValue = "Restart";
  },
  report: function(){
    
    clearInterval(count);
  },
  update: function(txt){
     var temp = document.getElementById("timer");
  temp.firstChild.nodeValue = txt;
  },
  
  pad: function(time){
    var temp;
    if(time < 10){
      temp = "0" + time;
    }
    else{
      temp = time;
    }
    return temp;
  }
}