//　ドラッグ移動の発動調整
let map = document.getElementById('map');
let isDragging = false;
let startX, startY;
let origX = 600,
    origY = 400;
let mapX = origX,
    mapY = origY;
let speed = 0.1;  // Lower the value, slower the map and cursor will move

document.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});
document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    let dx = (e.clientX - startX) / scale;
    let dy = (e.clientY - startY) / scale;
    origX += dx;
    origY += dy;
    startX = e.clientX;
    startY = e.clientY;
});
document.addEventListener('mouseup', function() {
    isDragging = false;
});
document.addEventListener('mouseleave', function() {
    isDragging = false;
});





//　ドラッグ移動
let cursorX = 0;
let cursorY = 0;
let mouseX = 0;
let mouseY = 0;
const cursor = document.getElementById('custom-cursor');
function animate() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;
    cursorX += distX * speed;
    cursorY += distY * speed;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    distX = origX - mapX;
    distY = origY - mapY;
    mapX += distX * speed;
    mapY += distY * speed;
    map.style.transform = `translate(${mapX}px, ${mapY}px)`;
    requestAnimationFrame(animate);
}
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    checkOverlap();
    updateActiveList();
});
animate();




// アクティブな文字テキストをリストアップ
function updateActiveList() {
    const activeElements = document.querySelectorAll('p.active');
    const activeList = document.getElementById('activeList');
    activeList.innerHTML = '';
    activeElements.forEach((el, index) => {
        const li = document.createElement('li');
        li.textContent = `${el.getAttribute('data-content')}`;
        activeList.appendChild(li);
    });
}


// 重なっているかどうかを取得
let lastOverlappingElement = null;
function checkOverlap() {
    const cursor = document.getElementById('custom-cursor');
    const cursorRect = cursor.getBoundingClientRect();
    let newOverlappingElement = null;
    document.querySelectorAll('#map p').forEach(function(p) {
        const pRect = p.getBoundingClientRect();
        if (
            cursorRect.left < pRect.right &&
            cursorRect.right > pRect.left &&
            cursorRect.top < pRect.bottom &&
            cursorRect.bottom > pRect.top
        ) {
            p.classList.add('active');
            cursor.classList.add('active');  // Add 'active' class to cursor
            newOverlappingElement = p;
        } else {
            p.classList.remove('active');
        }
    });
    if (lastOverlappingElement && lastOverlappingElement !== newOverlappingElement) {
        lastOverlappingElement.classList.remove('active');
        cursor.classList.remove('active');  // Remove 'active' class from cursor
    }
    lastOverlappingElement = newOverlappingElement;
}
