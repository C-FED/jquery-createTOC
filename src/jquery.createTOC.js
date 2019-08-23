; (function (window, $, undefined) {
    // helpers
    var IE_VERSION = (function () {
        var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        return v > 4 ? v : -1;
    }());


    $.fn.createTOC = function (settings) {
        var option = $.extend({
            title: "目录",
            insert: "body",
        }, settings);

        var list = ["h1", "h2", "h3", "h4", "h5", "h6"];
        var $headings = this.find(list.join(","));

        var tocBox = document.createElement("ul");
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

        var headBox = document.createElement("div");
        headBox.className = "toc-title";
        headBox.innerHTML = option.title;

        var wrapBox = document.createElement("div");
        wrapBox.className = "wrap-toc";

        wrapBox.appendChild(headBox);
        wrapBox.appendChild(tocBox);

        var $insertBox = $(option.insert);

        $insertBox.append(wrapBox);

        var scrollLeft = $('html,body').scrollLeft();
        var offsetLeft = $insertBox.offset().left;
        var offsetLeftForView = offsetLeft - scrollLeft;
        var insertBoxW = $insertBox.css('width');

        var scrollTop = $('html,body').scrollTop();
        var offsetTop = $insertBox.offset().top;
        var marginTop = parseInt($insertBox.css('marginTop'));
        var offsetTopForView = offsetTop - scrollTop - marginTop;


        // 兼容 ie8
        if (IE_VERSION === 8) {
            // 重新计算 offsetLeft
            setTimeout(function () {
                offsetLeft = $insertBox[0].offsetLeft; // 必须异步获取，同步获取有 bug
                offsetLeftForView = offsetLeft - scrollLeft;
            }, 1e3);
        }

        // 滚动吸顶
        var ACTIVE_CLASS = 'active';

        $(window).scroll(function () {
            var scrollTop = $('html,body').scrollTop();
            var isFixed = $insertBox.css("position") === "fixed";

            // 滚动高亮
            $.each(idList, function (index, id) {
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

            if (scrollTop >= offsetTopForView) {
                !isFixed && $insertBox.css({
                    position: "fixed",
                    top: 0,
                    left: offsetLeftForView + 'px',
                    width: insertBoxW,
                });
            } else {
                $insertBox.css({
                    position: "static",
                });
            }
        });

    };

}(this, jQuery));
