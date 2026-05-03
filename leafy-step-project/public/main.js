// LeafyStep - Frontend Logic

let vehicleCoef = 0.1;
let currentData = [0, 0, 0];
let targetData = [0, 0, 0];

/**
 * Mengatur tipe kendaraan dan koefisien emisinya.
 * @param {string} type  - 'motor' atau 'mobil'
 * @param {number} coef  - koefisien emisi per km
 */
function setVehicle(type, coef) {
    vehicleCoef = coef;
    const btnMotor = document.getElementById('btn-motor');
    const btnMobil = document.getElementById('btn-mobil');
    if (btnMotor) btnMotor.classList.toggle('active', type === 'motor');
    if (btnMobil) btnMobil.classList.toggle('active', type === 'mobil');
    predictStatus();
}


function predictStatus() {
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const ac = parseFloat(document.getElementById('ac').value) || 0;
    const laptop = parseFloat(document.getElementById('laptop').value) || 0;

    const total = (transport * vehicleCoef) + (ac * 0.5) + (laptop * 0.05);

    document.body.classList.remove('status-safe', 'status-warning', 'status-danger');
    if (total > 0 && total <= 2)       document.body.classList.add('status-safe');
    else if (total > 2 && total <= 5)  document.body.classList.add('status-warning');
    else if (total > 5)                document.body.classList.add('status-danger');
}

/**
 * Menggambar bar chart menggunakan SVG inline.
 * @param {number[]} dataArray - Array [emisi kendaraan, emisi AC, emisi laptop]
 */
function drawChart(dataArray) {
    const container = document.getElementById('chart-container');
    if (!container) return;

    const width   = container.clientWidth;
    const height  = container.clientHeight;
    const padding = 40;
    const chartW  = width - padding * 2;
    const chartH  = height - padding * 2;
    const maxVal  = Math.max(...dataArray, 5);
    const labels  = ['Kendaraan', 'AC', 'Laptop'];
    const colors  = ['#597445', '#E2725B', '#D2B48C'];

    let svgHtml = `<svg viewBox="0 0 ${width} ${height}">
        ${[0, 0.5, 1].map(tick => {
            const yPos = padding + chartH - (tick * chartH);
            return `<line x1="${padding}" y1="${yPos}" x2="${width - padding}" y2="${yPos}" stroke="#000" stroke-opacity="0.1" />
                    <text x="${padding - 10}" y="${yPos + 5}" font-size="10" text-anchor="end" fill="#666">${(tick * maxVal).toFixed(1)}</text>`;
        }).join('')}
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#2D302D" stroke-width="2" />
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#2D302D" stroke-width="2" />
    `;

    dataArray.forEach((val, i) => {
        const bHeight  = (val / maxVal) * chartH;
        const barWidth = (chartW / 3) * 0.6;
        const xPos     = padding + ((chartW / 3) * i) + ((chartW / 3) - barWidth) / 2;
        svgHtml += `<rect x="${xPos}" y="${height - padding - bHeight}" width="${barWidth}" height="${bHeight}" fill="${colors[i]}" rx="6" />
                    <text x="${xPos + barWidth / 2}" y="${height - padding + 20}" font-size="10" font-weight="600" text-anchor="middle">${labels[i]}</text>`;
    });

    container.innerHTML = svgHtml + `</svg>`;
}

function animateChart() {
    let stillAnimating = false;
    currentData = currentData.map((current, i) => {
        const diff = targetData[i] - current;
        if (Math.abs(diff) > 0.01) {
            stillAnimating = true;
            return current + diff * 0.1;
        }
        return targetData[i];
    });
    drawChart(currentData);
    if (stillAnimating) requestAnimationFrame(animateChart);
}

function calculate() {
    const t = parseFloat(document.getElementById('transport').value) || 0;
    const a = parseFloat(document.getElementById('ac').value) || 0;
    const l = parseFloat(document.getElementById('laptop').value) || 0;

    const eVehicle = t * vehicleCoef;
    const eAc      = a * 0.5;
    const eLaptop  = l * 0.05;
    const total    = eVehicle + eAc + eLaptop;

    document.getElementById('total-display').innerText = total.toFixed(2);

    const st = document.getElementById('status-text');
    if (total <= 2)      st.innerText = 'Aman. Kamu pelindung hutan! 🍃';
    else if (total <= 5) st.innerText = 'Perlu Perhatian. Kurangi dikit lagi! ⚠️';
    else                 st.innerText = 'Berbahaya! Bumi mulai kepanasan. 🚨';

    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));

    targetData = [eVehicle, eAc, eLaptop];
    animateChart();
}

/**
 * @param {HTMLInputElement} cb - Elemen checkbox 
 */
function toggleTask(cb) {
    const mb       = document.getElementById('motivation-box');
    const textSpan = cb.nextElementSibling;

    if (cb.checked) {
        textSpan.classList.add('dimmed');
        mb.innerText = '✨ Bagus! Langkah kecil kamu membawa perubahan besar!';
        mb.classList.remove('hidden', 'fade-out');
        void mb.offsetWidth;
        mb.classList.add('fade-in');
        setTimeout(() => {
            mb.classList.replace('fade-in', 'fade-out');
            setTimeout(() => {
                if (mb.classList.contains('fade-out')) mb.classList.add('hidden');
            }, 500);
        }, 3000);

    } else {
        textSpan.classList.remove('dimmed');
    }
}

function resetAll() {
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('input[type="number"]').forEach(i => (i.value = ''));
    document.body.classList.remove('status-safe', 'status-warning', 'status-danger');
    setVehicle('motor', 0.1);
    targetData  = [0, 0, 0];
    currentData = [0, 0, 0];
    drawChart([0, 0, 0]);
}

window.onload  = () => drawChart([0, 0, 0]);
window.onresize = () => drawChart(currentData);
