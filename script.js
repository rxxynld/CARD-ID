document.getElementById('photo-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('card-photo').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function downloadCard() {
    const cardElement = document.getElementById('id-card-to-download');
    
    // Simpan referensi ke foto asli
    const originalPhoto = document.getElementById('card-photo');
    const originalSrc = originalPhoto.src;
    
    // Buat elemen <img> sementara untuk memastikan ukuran asli
    const tempImg = new Image();
    tempImg.src = originalSrc;
    
    tempImg.onload = () => {
        // Atur ukuran <img> agar sesuai dengan rasio asli sebelum diambil screenshot
        originalPhoto.style.height = 'auto';
        originalPhoto.style.width = '100%';
        
        // Ambil screenshot
        html2canvas(cardElement, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(function(canvas) {
            // Kembalikan style <img> ke semula
            originalPhoto.style.height = '100%';
            originalPhoto.style.width = '100%';

            // Unduh gambar
            canvas.toBlob(function(blob) {
                saveAs(blob, 'kartu-id-cream-soda.png');
            });
        });
    };
}