; (function (window, $, undefined) {
    $.fn.createTOC = function (settings) {
        var option = $.extend({
            title: "目录",
            insert: "body",
        }, settings);

        var ACTIVE_CLASS = 'active';

        var list = ["h1", "h2", "h3", "h4", "h5", "h6"];
        var $headings = this.find(list.join(","));

        var tocBox = document.createElement("ul");
        var $tocBox = $(tocBox);
        tocBox.className = "toc-box";

        var idList = [];

        $headings.map(function (i, head) {
            var nodeName = head.nodeName;
            var id = 'toc_' + i + '_' + nodeName;
            head.id = id;

            idList.push(id);

            var row = document.createElement("li");

            row.className = 'toc-item toc-' + nodeName;

            var link = document.createElement('a');

            link.innerHTML = head.innerHTML;
            link.className = 'toc-item-link';
            link.href = '#' + id;

            row.appendChild(link);
            tocBox.appendChild(row);
        });
        // 控制高亮元素的接管权
        var isTakeOverByClick = false;

        // 事件委托，添加 click ，高亮当前点击项
        $tocBox.on("click", ".toc-item", function (ev) {
            // 设置为 true ，代表 点击事件 接管 高亮元素 的控制权
            isTakeOverByClick = true;

            var $item = $(this);
            var $itemSiblings = $item.siblings();

            $itemSiblings.removeClass(ACTIVE_CLASS);
            $item.addClass(ACTIVE_CLASS);
        });

        var headBox = document.createElement("div");
        headBox.className = "toc-title";
        headBox.innerHTML = option.title;

        var wrapBox = document.createElement("div");
        wrapBox.className = "wrap-toc";

        wrapBox.appendChild(headBox);
        wrapBox.appendChild(tocBox);

        var $insertBox = $(option.insert);
        var $helperBox = $("<div></div>");
        $helperBox.append(wrapBox);
        $insertBox.append($helperBox);

        // 存储容器盒子的样式
        var CACHE_WIDTH = $insertBox.css('width');
        var CACHE_PADDING_TOP = $insertBox.css('paddingTop');
        var CACHE_PADDING_RIGHT = $insertBox.css('paddingRight');
        var CACHE_PADDING_BOTTOM = $insertBox.css('paddingBottom');
        var CACHE_PADDING_LEFT = $insertBox.css('paddingLeft');
        var CACHE_MARGIN_TOP = $insertBox.css('marginTop');

        var scrollTop = $('html,body').scrollTop();
        var offsetTop = $insertBox.offset().top;
        var marginTop = parseInt($insertBox.css('marginTop'));
        var offsetTopForView = offsetTop - scrollTop - marginTop;

        // 滚动吸顶

        $(window).scroll(function () {
            // IE6/7/8： 
            // 对于没有doctype声明的页面里可以使用  document.body.scrollTop 来获取 scrollTop高度 ； 
            // 对于有doctype声明的页面则可以使用 document.documentElement.scrollTop； 
            // Safari: 
            // safari 比较特别，有自己获取scrollTop的函数 ： window.pageYOffset ； 
            // Firefox: 
            // 火狐等等相对标准些的浏览器就省心多了，直接用 document.documentElement.scrollTop
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var isFixed = $helperBox.css("position") === "fixed";

            // 滚动高亮
            // 只有点击事件 取消接管 高亮元素 的控制权 时候， scroll 事件才能拥有 高亮元素 的控制权
            !isTakeOverByClick && $.each(idList, function (index, id) {
                var $head = $('#' + id);
                var $item = $('[href="#' + id + '"]').parent();
                var $itemSiblings = $item.siblings();
                var offsetTopHead = $head.offset().top;
                var isActived = $item.hasClass(ACTIVE_CLASS);

                if (scrollTop >= offsetTopHead) {
                    $itemSiblings.removeClass(ACTIVE_CLASS);
                    !isActived && $item.addClass(ACTIVE_CLASS);
                } else {
                    $item.removeClass(ACTIVE_CLASS);
                }

            });
            // 设置为 false ，代表 点击事件 取消接管 高亮元素 的控制权
            isTakeOverByClick = false;

            if (scrollTop >= offsetTopForView) {
                if (isFixed) return;
                $insertBox.css({
                    padding: 0,
                });
                $helperBox.css({
                    position: 'fixed',
                    top: CACHE_MARGIN_TOP,
                    width: CACHE_WIDTH,
                    paddingTop: CACHE_PADDING_TOP,
                    paddingRight: CACHE_PADDING_RIGHT,
                    paddingBottom: CACHE_PADDING_BOTTOM,
                    paddingLeft: CACHE_PADDING_LEFT,
                    backgroundColor: $insertBox.css('backgroundColor')
                });
            } else {
                if (!isFixed) return;
                $helperBox.css({
                    position: 'static',
                    padding: 0
                });
                $insertBox.css({
                    paddingTop: CACHE_PADDING_TOP,
                    paddingRight: CACHE_PADDING_RIGHT,
                    paddingBottom: CACHE_PADDING_BOTTOM,
                    paddingLeft: CACHE_PADDING_LEFT,
                });
            }
        });

    };

}(this, jQuery));
