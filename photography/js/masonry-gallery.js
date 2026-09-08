
/* MVFX Photography Masonry
   Keeps portrait and landscape images at their natural proportions
   while maintaining left-to-right ordering. */
(function () {
    function initMasonry() {
        var galleries = document.querySelectorAll('.gallery-grid');

        galleries.forEach(function (gallery) {
            var items = Array.prototype.slice.call(
                gallery.querySelectorAll('.gallery-item')
            );

            if (!items.length) return;

            function getColumns() {
                var width = window.innerWidth;

                if (width <= 480) return 1;
                if (width <= 768) return 2;
                if (width <= 1200) return 3;
                return 4;
            }

            function layout() {
                var columns = getColumns();
                var gap = 28;
                var galleryWidth = gallery.clientWidth;

                if (!galleryWidth) return;

                var columnWidth = (galleryWidth - gap * (columns - 1)) / columns;
                var heights = new Array(columns).fill(0);

                items.forEach(function (item) {
                    item.style.width = columnWidth + 'px';
                });

                items.forEach(function (item) {
                    var shortestColumn = 0;

                    for (var i = 1; i < columns; i++) {
                        if (heights[i] < heights[shortestColumn]) {
                            shortestColumn = i;
                        }
                    }

                    var x = shortestColumn * (columnWidth + gap);
                    var y = heights[shortestColumn];

                    item.style.left = x + 'px';
                    item.style.top = y + 'px';

                    heights[shortestColumn] += item.offsetHeight + gap;
                });

                var maxHeight = Math.max.apply(null, heights);
                gallery.style.height = Math.max(0, maxHeight - gap) + 'px';
            }

            var images = gallery.querySelectorAll('img');
            var remaining = images.length;

            if (!remaining) {
                layout();
                return;
            }

            function imageReady() {
                remaining--;

                if (remaining <= 0) {
                    layout();
                }
            }

            images.forEach(function (img) {
                if (img.complete) {
                    imageReady();
                } else {
                    img.addEventListener('load', imageReady, { once: true });
                    img.addEventListener('error', imageReady, { once: true });
                }
            });

            window.addEventListener('resize', layout);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMasonry);
    } else {
        initMasonry();
    }
})();
