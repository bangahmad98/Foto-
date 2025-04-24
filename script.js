const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resultElement = document.getElementById('result');

// Akses kamera depan
navigator.mediaDevices.getUser Media({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

// Event listener untuk tombol ambil foto
document.getElementById('snap').addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    recognizeText();
});

// Fungsi untuk mengenali teks dari gambar
function recognizeText() {
    Tesseract.recognize(
        canvas,
        'eng',
        {
            logger: info => console.log(info) // Log progress
        }
    ).then(({ data: { text } }) => {
        console.log(text);
        const numbers = text.match(/-?\d+\.?\d*/g); // Mencari semua bilangan
        if (numbers) {
            const sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
            resultElement.textContent = sum;
        } else {
            resultElement.textContent = 0;
        }
    });
}
