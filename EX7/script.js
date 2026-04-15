var container = document.getElementById('container');
let errorCount = 0; // 新增：用來記錄連續打錯幾次

// 一開始產生亂數字串
window.onload = function() {
    container.textContent = add_new_chars(3);
};

// 產生亂數字串的函式
function add_new_chars(x) {
    var n = Math.floor(Math.random() * x) + 1;
    var str = '';
    for (let i = 0; i < n; i++) {
        // 產生 a-z 的隨機字元
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return str;
}

// 監聽鍵盤事件
window.addEventListener("keyup", function(e) {
    var firstone = container.textContent.substring(0, 1);
    
    if (e.key == firstone) {
        // 打對了：消掉第一個字，且連續錯誤計數歸零
        container.textContent = container.textContent.substring(1);
        errorCount = 0; 
    } else {
        // 打錯了：原本的邏輯是增加輸入的字
        container.textContent += e.key;
        errorCount++; // 錯誤次數 +1
        
        // 重點邏輯：連續打錯三次
        if (errorCount === 3) {
            container.textContent += add_new_chars(3); // 額外增加3個字
            errorCount = 0; // 觸發懲罰後歸零，重新計算下一輪連續三次
        }
    }
    
    // 每按一次按鍵，原本邏輯也會隨機增加字元 (依據投影片第3張第22行)
    container.textContent += add_new_chars(3);
});