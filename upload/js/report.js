(function umd(root, name, factory) {
    'use strict';
    if ('function' === typeof define && define.amd) {
      // AMD. Register as an anonymous module.
      define(name, ['jquery'], factory);
    } else {
      // Browser globals
      root[name] = factory();
    }
  }(this, 'ReportOverviewModule', function UMDFactory() {
    'use strict';
  
    var ReportOverview = ReportOverviewConstructor;
  
    reportCircleGraph();
  
    return ReportOverview;
  
    function ReportOverviewConstructor(options) {
  
      var factory = {
          init: init
        },
  
        _elements = {
          $element: options.element
        };
  
      init();
  
      return factory;
  
      function init() {
  
        _elements.$element.append($(getTemplateString()));
  
        $('.delivery-rate').percentCircle({
          width: 130,
          trackColor: '#ececec',
          barColor: '#f5ab34',
          barWeight: 5,
          endPercent: 0.9,
          fps: 60
        });
  
        $('.open-rate').percentCircle({
          width: 130,
          trackColor: '#ececec',
          barColor: '#30afe4',
          barWeight: 5,
          endPercent: 0.75,
          fps: 60
        });
  
        $('.click-to-open').percentCircle({
          width: 130,
          trackColor: '#ececec',
          barColor: '#80cdbe',
          barWeight: 5,
          endPercent: 0.5,
          fps: 60
        });
      }
  
      function getTemplateString() {
        return [
          '<div>',
          '<h2>Email Report Overview</h2>',
          '<div class="row">',
          '<div class="col-md-12">',
          '<div class="report-statistic-box">',
          '<div class="box-header">Sent Emails</div>',
          '<div class="box-content">',
          '<div class="sentTotal">{{sentTotal}}</div>'.replace(/{{sentTotal}}/, options.data.sentTotal),
          '</div>',
          '<div class="box-foot">',
          '<div class="sendTime box-foot-left">Send time<br><span class="box-foot-stats"><strong>{{date}}</strong></span></div>'.replace(/{{date}}/, options.data.date),
          '</div>',
          '</div>',
  
          '<div class="report-statistic-box">',
          '<div class="box-header">Delivery rate</div>',
          '<div class="box-content delivery-rate">',
          '<div class="percentage">90%</div>',
          '</div>',
          '<div class="box-foot">',
          '<span class="arrow arrow-up"></span>',
          '<div class="box-foot-left">Delivered<br><span class="box-foot-stats"><strong>{{delivered}}</strong> (90%)</span></div>'.replace(/{{delivered}}/, options.data.delivered),
          '<span class="arrow arrow-down"></span>',
          '<div class="box-foot-right">Bounced<br><span class="box-foot-stats" title="% = unopened emails / delivered emails"><strong>120</strong> (10%)</span></div>',
          '</div>',
          '</div>',
  
          '<div class="report-statistic-box">',
          '<div class="box-header">Open rate (OR)</div>',
          '<div class="box-content open-rate">',
          '<div class="percentage">75%</div>',
          '</div>',
          '<div class="box-foot">',
          '<span class="arrow arrow-up"></span>',
          '<div class="box-foot-left">Opened<br><span class="box-foot-stats"><strong>{{opened}}</strong> (75%)</span></div>'.replace(/{{opened}}/, options.data.opened),
          '<span class="arrow arrow-down"></span>',
          '<div class="box-foot-right">Unopened<br><span class="box-foot-stats"><strong>120</strong> (25%)</span></div>',
          '</div>',
          '</div>',
  
          '<div class="report-statistic-box">',
          '<div class="box-header">Click-to-open rate (CTOR)</div>',
          '<div class="box-content click-to-open">',
          '<div class="percentage">50%</div>',
          '</div>',
          '<div class="box-foot">',
          '<span class="arrow arrow-up"></span>',
          '<div class="box-foot-left">Clicked<br><span class="box-foot-stats"><strong>{{clicked}}</strong> (50%)</span></div>'.replace(/{{clicked}}/, options.data.clicked),
          '<div class="box-foot-right">Non-clicked<br><span class="box-foot-stats"><strong>120</strong> (50%)</span></div>',
          '</div>',
          '</div>'
        ].join('');
      }
    }
  
    function reportCircleGraph() {
  
      $.fn.percentCircle = function pie(options) {
  
        var settings = $.extend({
          width: 130,
          trackColor: '#fff',
          barColor: '#fff',
          barWeight: 5,
          startPercent: 0,
          endPercent: 1,
          fps: 60
        }, options);
  
        this.css({
          width: settings.width,
          height: settings.width
        });
  
        var _this = this,
          canvasWidth = settings.width,
          canvasHeight = canvasWidth,
          id = $('canvas').length,
          canvasElement = $('<canvas id="' + id + '" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>'),
          canvas = canvasElement.get(0).getContext('2d'),
          centerX = canvasWidth / 2,
          centerY = canvasHeight / 2,
          radius = settings.width / 2 - settings.barWeight / 2,
          counterClockwise = false,
          fps = 1000 / settings.fps,
          update = 0.01;
  
        this.angle = settings.startPercent;
  
        this.drawInnerArc = function(startAngle, percentFilled, color) {
          var drawingArc = true;
          canvas.beginPath();
          canvas.arc(centerX, centerY, radius, (Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (percentFilled * 360 - 90), counterClockwise);
          canvas.strokeStyle = color;
          canvas.lineWidth = settings.barWeight - 2;
          canvas.stroke();
          drawingArc = false;
        };
  
        this.drawOuterArc = function(startAngle, percentFilled, color) {
          var drawingArc = true;
          canvas.beginPath();
          canvas.arc(centerX, centerY, radius, (Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (percentFilled * 360 - 90), counterClockwise);
          canvas.strokeStyle = color;
          canvas.lineWidth = settings.barWeight;
          canvas.lineCap = 'round';
          canvas.stroke();
          drawingArc = false;
        };
  
        this.fillChart = function(stop) {
          var loop = setInterval(function() {
            canvas.clearRect(0, 0, canvasWidth, canvasHeight);
  
            _this.drawInnerArc(0, 360, settings.trackColor);
            _this.drawOuterArc(settings.startPercent, _this.angle, settings.barColor);
  
            _this.angle += update;
  
            if (_this.angle > stop) {
              clearInterval(loop);
            }
          }, fps);
        };
  
        this.fillChart(settings.endPercent);
        this.append(canvasElement);
        return this;
  
      };
  
    }
  
    function getMockData() {
      return {
  
        date: '2014-12-01',
        sentTotal: 4120,
        delivered: 3708,
        opened: 3090,
        clicked: 2060,
        conversion: 35000,
        conversionEmails: 100
  
      };
    }
  
  }));
  
  (function activateReportOverviewModule($) {
    'use strict';
  
    var $el = $('.report-overview-module');
  
    return new ReportOverviewModule({
      element: $el,
      data: {
        date: '2014-12-01',
        sentTotal: 4120,
        delivered: 3708,
        opened: 3090,
        clicked: 2060
      }
    });
  }(jQuery));