const apiKey = 'ca370d51a054836007519a00ff4ce59e'; // 講義提供的 API Key [cite: 14]

document.getElementById('get-img-btn').addEventListener('click', function() {
    // 1. 取得最近照片清單的 URL [cite: 14]
    const listUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=10&format=json&nojsoncallback=1`;

    fetch(listUrl)
        .then(response => response.json())
        .then(data => {
            const photos = data.photos.photo; // 分析回傳的 json [cite: 3]
            const container = document.getElementById('photo-container');
            container.innerHTML = ''; // 清空舊照片

            photos.forEach(photo => {
                // 2. 根據照片 ID 取得不同尺寸的網址 [cite: 18, 22]
                const sizeUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photo.id}&format=json&nojsoncallback=1`;

                fetch(sizeUrl)
                    .then(res => res.json())
                    .then(sizeData => {
                        // 取得其中一張圖片的網址 (通常取 Small 或 Medium)
                        const imageUrl = sizeData.sizes.size[1].source;
                        
                        // 3. 把照片呈現出來 [cite: 4]
                        const img = document.createElement('img');
                        img.src = imageUrl;
                        container.appendChild(img);
                    });
            });
        });
});