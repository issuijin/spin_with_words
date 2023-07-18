function zoom(ratio) {
    scale *= ratio;
    document.getElementById('wrapper').style.transform = `scale(${scale})`;
    // 各location要素のスケールを更新します。これにより、拡大縮小操作による位置の変動を補正します。
    document.querySelectorAll('#map p').forEach(function(el) {

        el.style.transform = `scale(${1/scale})`;
    });
}

document.getElementById('zoomIn').addEventListener('click', function(event) {
    event.preventDefault();
    zoom(1.25)
});
document.getElementById('zoomOut').addEventListener('click', function(event) {
    event.preventDefault();
    zoom(1/1.25)
});

function wheel(event) {
    event.preventDefault();
    const direction = (event.deltaY < 0) ? 1.04 : 1/1.04;
    zoom(direction);
}
document.getElementById('container').onwheel = wheel;