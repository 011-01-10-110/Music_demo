; (function (doc, win) {
    var docEl = doc.documentElement, // 获取html
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        width = 750, // 设计稿宽，用时只需要修改这一处
        recalc = function () {
            var clientWidth = docEl.clientWidth; // 获取设备尺寸
            if (!clientWidth) return; // 如果没有值，回去
            if (clientWidth > width) { // 如果超过设计稿宽度，就给一个固定值
                docEl.style.fontSize = '100px';
                docEl.style.width = width + 'px';
                docEl.style.margin = '0 auto';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / width) + 'px';
            }
        };
    if (!doc.addEventListener) return; // 如果没有这个方法，回去
    win.addEventListener(resizeEvt, recalc, false); // 改变大小时调整一下
    doc.addEventListener('DOMContentLoaded', recalc, false); // 加载完成时调整
})(document, window);
// 使用时：nrem = 设计稿的宽度 / 100