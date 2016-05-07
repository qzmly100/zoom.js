/**
 * 鼠标悬提时图片在自身放大
 * @param p 放大的比例，默认120
 * @param d 效果执行时间，默认500毫秒
 * @param div 是否在外层套一个DIV，默认不加
 *
 * $('img.zoom,img#zoom').zoom(130,200,true);
 *
 * 注意：此插件不要用于position:absolute或fixed等影响定位的img，因为此插件会都改为relative，且会改变其top,left值
 * 而且：只能用于其父对象只有这一个子对象，即独生子；
 * 关于套DIV：若子对象尺寸不是父对象的全部时，可以由插件向其与原父对象之间插入一个DIV，所以，用此功能时须确保插入了DIV后不会改变原来的显示效果。
 * 此插件可以根据实际需要继续优化。
 *
 */

(function ($) {
    $.fn.zoom = function (p, d, div) {
        var defaults = {
            percent: 120,//放大比例
            duration: 500//效果过渡时间
        };
        if (!!p)defaults.percent = p;
        if (!!d)defaults.duration = d;

        var opts = $.extend(defaults);

        //计算并赋于尺寸及位置
        function imgStep(obj, x, origWidth, origHeight) {
            var width = Math.round(origWidth * ((x * (opts.percent - 100) + 100) / 100));
            var height = Math.round(origHeight * ((x * (opts.percent - 100) + 100) / 100));
            var left = (width - origWidth) / 2;
            var top = (height - origHeight) / 2;
            obj.css({position: "relative", width: width, height: height, top: -top, left: -left});
        }

        return this.each(function () {
            var self = $(this);
            var origWidth = self.width();
            var origHeight = self.height();
            if (!origWidth || origWidth < 100)return;

            if (!!div) self.wrap("<div />");//在外层再套一个DIV
            var parent = self.parent();

            var position = parent.css('position');
            position = !!position ? position : 'relative';
            parent.css({
                overflow: "hidden",
                display: "block",
                position: position,
                width: origWidth,
                height: origHeight
            });

            self.mouseover(function () {
                self.stop().animate({dummy: 1}, {
                    duration: opts.duration,
                    step: function (x) {
                        imgStep(self, x, origWidth, origHeight)
                    }
                });
            });

            self.mouseout(function () {
                self.stop().animate({dummy: 0}, {
                    duration: opts.duration,
                    step: function (x) {
                        imgStep(self, x, origWidth, origHeight)
                    }
                });
            });
        });
    };

})(jQuery);