// 取得顯示內容的容器
var container = document.getElementById('container');

// 輔助函數：隨機產生 n 個 a-z 的字元
function getRandomChars(n) {
    var chars = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < n; i++) {
        chars += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return chars;
}

// 2. window.onload：網頁載入時亂數產生 0 到 2 個字元
window.onload = function() {
    var num = Math.floor(Math.random() * 3); // 產生 0, 1, 或 2
    container.textContent = getRandomChars(num);
    container.focus(); // 讓頁面載入後自動聚焦，方便直接打字
};

// 4. keyup event：處理打字邏輯
window.addEventListener("keyup", function(e) {
    console.log("按下了：", e.key);
    
    var currentStr = container.textContent;

    // 3. 如果打入字元和第一個字相等，消除該字元
    if (currentStr.length > 0 && e.key === currentStr[0]) {
        container.textContent = currentStr.substring(1);
    }

    // 4. 在 container 中亂數產生 1 到 3 個字元接在後面
    var addNum = Math.floor(Math.random() * 3) + 1; // 產生 1, 2, 或 3
    container.textContent += getRandomChars(addNum);
});