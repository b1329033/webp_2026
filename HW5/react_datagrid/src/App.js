import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: '序號', width: 80 },
  { field: 'title', headerName: '景點觀光展覽名稱', width: 450 },
  { field: 'location', headerName: '地點', width: 300 },
  { field: 'price', headerName: '票價', width: 250 },
];

function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 新增：用來儲存使用者輸入的搜尋關鍵字
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((dataset) => {
        if (Array.isArray(dataset)) {
          const formattedData = dataset.map((data, index) => {
            const info = data.showInfo && data.showInfo[0] ? data.showInfo[0] : {};
            return {
              id: index + 1,
              title: data.title || '無名稱資料',
              location: info.location || '無地點資訊',
              price: info.price || '免費或未提供'
            };
          });
          setRows(formattedData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 關鍵核心：過濾出名稱（title）包含關鍵字的資料
  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ color: '#2e7d32', marginBottom: '20px', borderBottom: '2px solid #2e7d32', paddingBottom: '10px' }}>
          景點觀光展覽資訊 — MUI DataGrid 版本 (HW5)
        </h2>

        {/* 補上 HW4 要求的名稱搜尋功能與 Onchange 事件 */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="search" style={{ marginRight: '10px', fontWeight: 'bold' }}>名稱搜尋：</label>
          <input
            id="search"
            type="text"
            placeholder="請輸入展覽名稱關鍵字... (例如：臺灣)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Onchange event
            style={{ padding: '8px 12px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {loading ? (
          <h3 style={{ color: '#666' }}>文化部觀光展覽資料載入中... 請稍候...</h3>
        ) : (
          <div style={{ height: 600, width: '100%' }}>
            {/* 這裡改放過濾後的 filteredRows，分頁數量就會跟著搜尋自動變動！ */}
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20, 50]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;