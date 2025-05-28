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
    showPopup("Please enter a valid link.");
    return;
  }

  QRCode.toCanvas(link, { width: size }, (err, canvas) => {
    if (err) {
      console.error(err);
      showPopup("Failed to generate QR code, Please again.");
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

function resetQR() {
  document.getElementById("linkInput").value = ""; // Clear input
  document.getElementById("qrcode").innerHTML = ""; // Clear QR code

  document.getElementById("download-btn").style.display = "none"; // Hide download button
}

function outsideClick(event) {
  const popupContent = document.querySelector(".popup-content");
  if (!popupContent.contains(event.target)) {
    closePopup();
  }
}

function showPopup(message) {
  document.getElementById("popup-message").innerText = message;
  document.getElementById("popup").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.body.style.overflow = "auto";
}
