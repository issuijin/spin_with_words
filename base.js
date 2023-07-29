const baseLocation = { x: 35.691717, y: 139.7379717 }; // 基準位置
let scale = 1;

// jsonファイルからデータを取得します（サーバーからのデータ取得を想定）
fetch('loc.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            // 緯度と経度の差を計算し、それをピクセル値に変換します（1度を100ピクセルにマッピングします。適切なスケーリングを選択してください）
            const left = (item.x - baseLocation.x) * 100000;
            const top = (item.y - baseLocation.y) * 100000;

            // 新しい要素を作成し、スタイルプロパティを設定します
            const div = document.createElement('p');
            div.className = `n${item.size}`;
            div.style.left = `${left}px`;
            div.style.top = `${top}px`;
            div.textContent = item.content
            div.dataset.content = item.content;

            // 新しい要素を地図に追加します
            document.getElementById('map').appendChild(div);
        });
    });


function Typing(delay = 100) {
    let pTags = document.querySelectorAll(`#map p:not([data-typing='true'])`);
    if (pTags.length === 0) {
        return;
    }
    let randomIndex = Math.floor(Math.random() * pTags.length);
    let p = pTags[randomIndex];
    let text = p.textContent;  // Save the original text
    p.textContent = '';
    p.dataset.typing = 'true';  // Mark the element as typing
    let index = 0;

    function getRandomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function type() {
        if (index < text.length) {
            let typingCount = Math.floor(Math.random() * 2) + 2;  // 2 or 3
            let typingIndex = 0;
            function typingMistake() {
                if (typingIndex < typingCount) {
                    p.textContent = text.substring(0, index) + getRandomChar();
                    typingIndex++;
                    setTimeout(typingMistake, delay);
                } else {
                    p.textContent = text.substring(0, index + 1);
                    index++;
                    if (index < text.length) {
                        setTimeout(type, delay);
                    } else {
                        p.dataset.typing = 'false';  // Reset the typing status when typing is done
                    }
                }
            }
            typingMistake();
        }
    }
    type();
}

setInterval(Typing, 140);  // Run the Typing function every 2 seconds

