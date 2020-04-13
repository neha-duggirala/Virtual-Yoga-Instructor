//SVG gauges script
var firstGauge = document.querySelector('.container:first-of-type .progress');
var firstTarget = parseInt(firstGauge.getAttribute('data-target'));
var firstGaugeReadout = document.querySelector('.container:first-of-type .percentage > .value');

var secondGauge = document.querySelector('.container:nth-of-type(2) .progress');
var secondTarget = parseInt(secondGauge.getAttribute('data-target'));

var thirdGauge = document.querySelector('.container:nth-of-type(3) .progress');
var thirdTarget = parseInt(thirdGauge.getAttribute('data-target'));

var fourthGauge = document.querySelector('.container:nth-of-type(4) .progress');
var fourthTarget = parseInt(fourthGauge.getAttribute('data-target'));

//variables
var gaugeR = parseInt(document.querySelectorAll('circle')[0].getAttribute('r'));
var gaugeC = gaugeR * Math.PI * 2;
var animationDuration = 1.5;

//init svg circles
var circles = document.querySelectorAll('circle');
var gauges = document.querySelectorAll('.progress');
TweenMax.set(circles, {
  strokeDashoffset: gaugeC
});

TweenMax.set(gauges, {
  attr: {
    'stroke-dasharray': gaugeC + ' ' + gaugeC
  }
});

//calculate the offset
function calculateOffset(t, c) {

  var target = c - (c * t) / 100;
  return target;

}

//timeline
var tl = new TimelineMax();

//first gauge animation
tl.to(firstGauge, animationDuration, {

  strokeDashoffset: calculateOffset(firstTarget, gaugeC),
  ease: Bounce.easeOut,
  onUpdate: function() {

    var currentStrokeOffset = parseInt(firstGauge.style.strokeDashoffset);
    firstGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);

  }

});

