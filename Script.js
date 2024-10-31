function downloadVideo() {
    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        resultDiv.textContent = 'Please enter a YouTube video URL.';
        return;
    }

    const apiUrl = `https://yt-vid.hazex.workers.dev/?url=${encodeURIComponent(urlInput)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && !data.error) {
                resultDiv.innerHTML = `
                    <h3>${data.title}</h3>
                    <img src="${data.thumbnail}" alt="Thumbnail" />
                    <p>Duration: ${data.duration} seconds</p>
                    <h4>Download Links:</h4>
                    <div class="download-links-container">
                        <h5>Video with Audio:</h5>
                        <div class="download-button-container">
                            ${data.video_with_audio.map(video => `
                                <div>
                                    <span>${video.label}</span>
                                    <a href="${video.url}" target="_blank" class="download-link">Download</a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="download-links-container">
                        <h5>Video Only:</h5>
                        <div class="download-button-container">
                            ${data.video_only.map(video => `
                                <div>
                                    <span>${video.label}</span>
                                    <a href="${video.url}" target="_blank" class="download-link">Download</a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                resultDiv.textContent = 'Error: Unable to retrieve video. Please check the URL and try again.';
            }
        })
        .catch(error => {
            resultDiv.textContent = 'Error: ' + error.message;
        });
}
