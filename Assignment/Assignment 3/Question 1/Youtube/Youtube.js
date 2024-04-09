// Fetching data from YouTube API
fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UUkibvxIwn7Nskn-v44mEa-A&key=AIzaSyD5YFNyqNHO__Z6XLSFIJinzxVVHkSn_-A')
.then(response => response.json())
.then(data => {
    const videoId = data.items[0].snippet.resourceId.videoId;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('youtube-video').src = videoUrl;
})
.catch(error => console.error('Error fetching data:', error));
