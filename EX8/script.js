// 1. 設定 API 網址
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// 2. 建立 Ajax 請求
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

// 3. 監聽狀態改變
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // 解析 JSON 字串為物件
        var dataset = JSON.parse(this.responseText);
        addNewData(dataset);
    }
};

// 4. 將資料加入表格
function addNewData(dataset) {
    var myTable = document.getElementById("csie");
    
    dataset.forEach(function(data, index) {
        // 在表格最後插入一行
        var row = myTable.insertRow(-1);
        
        // 插入單元格並填入資料
        row.insertCell(0).innerHTML = data['title'];
        
        // 注意：根據投影片，地點與票價在 showInfo 陣列的第一個元素裡
        if (data['showInfo'] && data['showInfo'].length > 0) {
            row.insertCell(1).innerHTML = data['showInfo'][0]['location'];
            row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
        } else {
            row.insertCell(1).innerHTML = "無資訊";
            row.insertCell(2).innerHTML = "無資訊";
        }
    });
}

// 5. 實作刪除功能 (投影片中有出現按鈕，這裡幫你補上邏輯)
function delOldData() {
    var myTable = document.getElementById("csie");
    var rowCount = myTable.rows.length;
    
    // 從最後一行開始刪除，直到剩下標題列 (index 0)
    for (var i = rowCount - 1; i > 0; i--) {
        myTable.deleteRow(i);
    }
}