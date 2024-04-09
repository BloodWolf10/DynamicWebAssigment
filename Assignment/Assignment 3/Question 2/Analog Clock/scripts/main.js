 // Get the canvas element and its context
 const canvas = document.getElementById('analogClock');
 const ctx = canvas.getContext('2d');
 const centerX = canvas.width / 2;
 const centerY = canvas.height / 2;

 // Function to draw clock face
 function drawClockFace() {
     ctx.beginPath();
     ctx.arc(centerX, centerY, 90, 0, 2 * Math.PI);
     ctx.fillStyle = '#f5f5f5';
     ctx.fill();
     
     // Draw hour markers
     for (let i = 0; i < 12; i++) {
         const angle = (i - 3) * (Math.PI * 2) / 12;
         const x = centerX + Math.cos(angle) * 80;
         const y = centerY + Math.sin(angle) * 80;
         ctx.beginPath();
         ctx.arc(x, y, 4, 0, 2 * Math.PI);
         ctx.fillStyle = '#333';
         ctx.fill();
     }
 }

 // Function to draw clock hands
 function drawClockHands() {
     const now = new Date();
     const hours = now.getHours();
     const minutes = now.getMinutes();
     const seconds = now.getSeconds();

     // Draw hour hand
     const hourAngle = (hours % 12 + minutes / 60) * (Math.PI * 2) / 12 - (Math.PI / 2);
     drawHand(hourAngle, 50, 7, '#333');

     // Draw minute hand
     const minuteAngle = (minutes + seconds / 60) * (Math.PI * 2) / 60 - (Math.PI / 2);
     drawHand(minuteAngle, 70, 5, '#333');

     // Draw second hand
     const secondAngle = seconds * (Math.PI * 2) / 60 - (Math.PI / 2);
     drawHand(secondAngle, 80, 2, 'red');
 }

 // Function to draw individual clock hand
 function drawHand(angle, length, width, color) {
     const x = centerX + Math.cos(angle) * length;
     const y = centerY + Math.sin(angle) * length;

     ctx.beginPath();
     ctx.moveTo(centerX, centerY);
     ctx.lineTo(x, y);
     ctx.strokeStyle = color;
     ctx.lineWidth = width;
     ctx.lineCap = 'round';
     ctx.stroke();
 }

 // Main draw function
 function draw() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawClockFace();
     drawClockHands();
 }

 // Update the clock every second
 setInterval(draw, 1000);

 // Initial draw
 draw();