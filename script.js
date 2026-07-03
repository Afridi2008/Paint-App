const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;
let drawing = false;
let tool = "draw";
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
function setTool(t) {
tool = t;
}
function startDraw(x, y) {
drawing = true;
ctx.beginPath();
ctx.moveTo(x, y);
}
function draw(x, y) {
if (!drawing) return;
ctx.lineWidth = brushSize.value;
ctx.lineCap = "round";
if (tool === "erase") {
ctx.strokeStyle = "#ffffff";
} else {
ctx.strokeStyle = colorPicker.value;
}
ctx.lineTo(x, y);
ctx.stroke();
}
function stopDraw() {
drawing = false;
}
// Mouse events
canvas.addEventListener("mousedown", e => startDraw(e.offsetX, e.offsetY));
canvas.addEventListener("mousemove", e => draw(e.offsetX, e.offsetY));
canvas.addEventListener("mouseup", stopDraw);
// Touch events (mobile)
canvas.addEventListener("touchstart", e => {
const rect = canvas.getBoundingClientRect();
const touch = e.touches[0];
startDraw(touch.clientX - rect.left, touch.clientY - rect.top);

});
canvas.addEventListener("touchmove", e => {
const rect = canvas.getBoundingClientRect();
const touch = e.touches[0];
draw(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener("touchend", stopDraw);
// Clear
function clearCanvas() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Download
function downloadImage() {
const link = document.createElement("a");
link.download = "drawing.png";
link.href = canvas.toDataURL();
link.click();
}