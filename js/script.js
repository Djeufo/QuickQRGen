let currentCanvas = null;

function generateQR() {
  const link = document.getElementById("linkInput").value.trim();
  const qrContainer = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("download-btn");

  qrContainer.innerHTML = "";
  currentCanvas = null;
  downloadBtn.style.display = "none";

  const screenWidth = window.innerWidth;
  const size = screenWidth < 600 ? 200 : 300;

  if (!link) {
    alert("Please enter a valid link.");
    return;
  }

  QRCode.toCanvas(link, { width: size }, (err, canvas) => {
    if (err) {
      console.error(err);
      alert("Failed to generate QR code.");
      return;
    }
    qrContainer.appendChild(canvas);
    currentCanvas = canvas;
    downloadBtn.style.display = "inline-block";
  });
}

function downloadQR() {
  if (!currentCanvas) return;

  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = currentCanvas.toDataURL("image/png");
  link.click();
}