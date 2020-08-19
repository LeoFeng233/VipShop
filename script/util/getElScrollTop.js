export function getElOffsetTop(dom) {
    if (!dom && !dom.clientTop && !dom.offsetTop) {
        return 0;
    }

    let offsetTop = 0;

    while (dom) {
        offsetTop += dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }

    return offsetTop;
}