/*
Full Plugin:

    model ={

      'logo':{
        'path':'path',
        'isPresent':true|false,
        'class':'LogoClass'
      },

      'IconPath':'Path',

      'debug':true|false
    }


*/

// MakeItSticky

jQuery.fn.extend({
    _misIsMobile:function(){
      var ww = $(window).width();
      if( ww <= 480 ){
        return true;
      }else{
        return false;
      }
    },
    _misMenuBuild:function(tp,ImgPath,LogoClass,LogoPath,logoIsPresent){

        //$(tp).parent().prepend('<div class="menu-mobile-mis"></div>');
        $('body').prepend('<div class="menu-mobile-mis"></div>');
        $('.menu-mobile-mis').prepend('<img src="'+ImgPath+'" class="menu-mobile-mis-icon" alt="Mobile Menu">');
        if(logoIsPresent){
          $(LogoClass).detach().appendTo('.menu-mobile');
          $(LogoClass).addClass('menu-mobile-mis_logo');
        }else{
          $('.menu-mobile-mis').prepend('<img src="'+LogoPath+'" class="menu-mobile-mis_logo" alt="Mobile Menu Logo">');
        }

        $(tp).detach().appendTo('.menu-mobile-mis');
        $('head').append('<link rel="stylesheet" type="text/css" href="MakeItSticky.css">')

    },
    _misMobileInit:function(t){

        $('.menu-mobile-mis_list').hide();

        $('.menu-mobile-mis').css('position', 'absolute');
        $('.menu-mobile-mis').css('top', '0');
        $('.menu-mobile-mis').css('position', 'fixed');

        setTimeout(function(){

          var pic_h = $('.menu-mobile-mis-icon').height();
          $('.menu-mobile-mis').css('height',pic_h+30);

        },250);

    },
    mis: function(obj) {

        var nav_w = this.width();
        var nav_h = this.height();
        var nav_ot = this.offset().top;
        var t = this;
        var tp = this.parent();
        var p = $('.nav_placeholder');
        var i = 0;

        var ImgPath= obj['IconPath'];
        var LogoClass = obj['logo']['class'];
        var LogoPath = obj['logo']['path'];
        var logoIsPresent = obj['logo']['isPresent'];
        var debug = obj['debug'];

        if($(document)._misIsMobile()){

          $(document)._misMenuBuild(t,ImgPath,LogoClass,LogoPath,logoIsPresent);
          this.addClass('menu-mobile-mis_list');
          $(document)._misMobileInit();

        }else{
          return false;
        }

        //if no placeholder append one
        if(p.length<1){
          $(tp).prepend('<div class="nav_placeholder"></div>');
           p.width(nav_w);
           p.height(nav_h);
        }

        $('.menu-mobile-mis-icon').on('click', function() {
            //console.log('click2');
            if (!$(this).hasClass('active')) {

                $(this).addClass('active');
                $('.menu-mobile-mis').height(t.height()+$('.menu-mobile-mis').height());
                t.toggle();
            } else {
                $(this).removeClass('active');
                t.toggle();
                $('.menu-mobile-mis').height($('.menu-mobile-mis').height()-t.height());
            }
        });
        //debug mode
        if(debug){
            var veb = "nav has h: " + nav_h + " 2:" + nav_w + " offset.top:" + nav_ot + " ";
          console.log(veb);
          console.log(obj);
        }
        $(window).on('scroll', function() {
            var mover = $(window).scrollTop();
            p.width(nav_w);
            p.height(nav_h);
            var pic_h = $('.menu-mobile-mis-icon').height();
            $('.menu-mobile-mis').css('height',pic_h+30);
            if (mover >= -300) {

                $('.menu-mobile-mis').css({
                    position: 'absolute',
                    'z-index': '200',
                    top: '0'
                });
                $('.menu-mobile-mis').css('position', 'fixed');
            } else {

                $('.menu-mobile-mis').css({
                    position: 'absolute',
                    top: nav_ot + "px"
                });
            }
        });
    }
});
