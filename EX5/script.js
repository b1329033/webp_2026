var count = 1;

function addfunction() {
    // 建立按鈕
    var btn = document.createElement("BUTTON");
    
    // 設定按鈕內容與 ID
    btn.innerHTML = `CLICK ME (${count})`;
    btn.setAttribute("id", "btn_" + count++);
    
    // 設定 Bootstrap 樣式
    btn.setAttribute("class", "btn btn-outline-danger m-1");
    
    // 找到 HTML 裡的容器並放進去
    var container = document.getElementById("container");
    container.appendChild(btn);
    
    console.log("新增了：", btn);
}

function delfunction() {
    // 取得最後一個生成的 ID (先減 1 才是正確的編號)
    var targetId = "btn_" + (--count);
    var btn = document.getElementById(targetId);
    
    if (btn) {
        var container = document.getElementById("container");
        container.removeChild(btn);
        console.log("刪除了：", targetId);
    } else {
        // 歸零保護，避免 count 變成負數
        if (count < 1) count = 1;
        alert("已經沒有按鈕可以刪除囉！");
    }
}