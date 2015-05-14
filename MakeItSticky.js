/*
Full Plugin:
    1.Check if mobile;
    2.Build Menu: $obj.model ={
                               'menuList':'ul class/id',
                               'settings':{
                                            'logo':'path',
                                            'logo-isPresent':true|false
                                            }
                              }


*/
// MakeItSticky
jQuery.fn.extend({
    _misMenuBuild:function($obj){

    },
    mis: function($obj) {
        var nav = this;
        var nav_w = this.width();
        var nav_h = this.height();
        var nav_ot = this.offset().top;
        var veb = "nav has h: " + nav_h + " 2:" + nav_w + " offset.top:" + nav_ot + " ";
        var t = this;
        var target = this.parent();
        var p = $('.nav_placeholder');
        var i = 0;
        //console.log(veb);
        //if no placeholder append one
        if(p.length<1){
          $(target).prepend('<div class="nav_placeholder"></div>')
        }

        $('.menu-mobile-icon').on('click', function() {
            //console.log('click2');
            if (!$(this).hasClass('active')) {

                $(this).addClass('active');
                $('.menu_list').toggle();
            } else {
                $(this).removeClass('active');
                $('.menu_list').toggle();

            }
        });

        t.css('position', 'absolute');
        t.css('top', '0');
        t.css('position', 'fixed');
        p.width(nav_w);
        p.height(nav_h);

        $(window).on('scroll', function() {
            var mover = $(window).scrollTop();
            p.width(nav_w);
            p.height(nav_h);

            if (mover >= -300) {

                t.css({
                    position: 'absolute',
                    'z-index': '2',
                    top: '0'
                });
                t.css('position', 'fixed');
            } else {

                t.css({
                    position: 'absolute',
                    top: nav_ot + "px"
                });
            }
        });
    }
});
