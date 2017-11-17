/**
 * Created by Administrator on 2017/3/21.
 */
import $ from 'jquery'
let nodeInit = function(){
  return{
    allH: function(){
      var htmlH = $(window).height();
      var headH = $('.head').outerHeight();
      var bannerH = $('.banner').outerHeight();
      var navH = $('.nav').height();
      var fooH = $('.footer').outerHeight();
      $('.all').height(htmlH - navH - fooH);
      console.log("all:"+htmlH+",banner:"+bannerH+',nav:'+navH+',foo:'+fooH);
    },
    rootFontSize : function(){
      var base = 500;
      var w = document.body.clientWidth;
      if( w<=800 ){
        var result = 20 + (w - base) / 30;
        result >= 10 ? $('html').css({'fontSize':result + 'px'}) : $('html').css({'fontSize':10 + 'px'});
      }
    }
  }
};


export {nodeInit as NI};
