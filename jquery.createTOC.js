; (function (window, $, undefined) {

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

        wrapBox.append(headBox);
        wrapBox.append(tocBox);

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
