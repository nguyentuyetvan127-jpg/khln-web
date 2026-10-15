/* 1. Application State Variable - Mở rộng cho 8 bước */
const TOTAL_STEPS = 8; // Tổng số trang khảo sát

const surveyData = {
    currentStep: 1,
    // Dữ liệu Bước 1
    q1_anxiety: null,
    q2_fear: null,
    
    // Thời gian đọc (VD: ở Bước 2)
    readingTimeSeconds: 0,
    
    // Dữ liệu các bước tiếp theo (Bước 3 -> 8)
    post_anxiety: null,
    post_danger: null,
    mauq_score: null,
    step4_data: null,
    step5_data: null,
    step6_data: null,
    step7_data: null,
    feedback: ''
};

let timerInterval = null;

/**
 * Chuyển trang khảo sát (Áp dụng linh hoạt cho 8 bước)
 * @param {number} step - Thứ tự bước (1 đến 8)
 */
function goToStep(step) {
    surveyData.currentStep = step;

    // Ẩn tất cả các step từ 1 đến TOTAL_STEPS bằng vòng lặp
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        const stepEl = document.getElementById(`step${i}`);
        if (stepEl) stepEl.classList.add('hidden');
    }

    // --- Xử lý logic riêng theo từng bước ---
    // Ví dụ: Bắt đầu bấm giờ khi vào Step 2
    if (step === 2) {
        startReadingTimer();
    }

    // Tắt đồng hồ bấm giờ khi rời khỏi Step 2 (chuyển sang Step 3 trở đi)
    if (step > 2 && timerInterval) {
        clearInterval(timerInterval);
    }

    // Lưu dữ liệu của Step 1 khi chuyển qua Step 2
    if (step === 2) {
        const q1 = document.querySelector('input[name="q1_anxiety"]:checked');
        const q2 = document.querySelector('input[name="q2_fear"]:checked');
        if (q1) surveyData.q1_anxiety = q1.value;
        if (q2) surveyData.q2_fear = q2.value;
    }

    // Hiển thị step hiện tại
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) currentStepEl.classList.remove('hidden');

    // Cập nhật Progress Bar tự động theo % thực tế (Step 1 -> 8)
    const progressPct = Math.round((step / TOTAL_STEPS) * 100);
    document.getElementById('progressBar').style.width = `${progressPct}%`;
    document.getElementById('progressText').innerText = `${progressPct}%`;

    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Bộ đếm thời gian
 */
function startReadingTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        surveyData.readingTimeSeconds++;
        
        const mins = Math.floor(surveyData.readingTimeSeconds / 60).toString().padStart(2, '0');
        const secs = (surveyData.readingTimeSeconds % 60).toString().padStart(2, '0');
        
        const timerDisplay = document.getElementById('readingTimer');
        if (timerDisplay) timerDisplay.innerText = `${mins}:${secs}s`;
    }, 1000);
}

/**
 * Tìm kiếm & Xem bài viết mô phỏng
 */
function toggleArticleDetail(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

function setSimulatedSearch(text) {
    const input = document.getElementById('simulatedSearchInput');
    if (input) {
        input.value = text;
        filterSimulatedContent();
    }
}

function filterSimulatedContent() {
    const query = document.getElementById('simulatedSearchInput').value.toLowerCase();
    const articles = document.querySelectorAll('.sim-article');
    
    articles.forEach(article => {
        const text = article.innerText.toLowerCase();
        article.style.display = text.includes(query) ? 'block' : 'none';
    });
}

/**
 * Hoàn tất toàn bộ 8 bước khảo sát
 */
function finishSurvey() {
    // Thu thập toàn bộ input còn lại từ các trang cuối
    const postAnxiety = document.querySelector('input[name="post_anxiety"]:checked');
    const postDanger = document.querySelector('input[name="post_danger"]:checked');
    const mauq = document.querySelector('input[name="mauq_score"]:checked');
    const feedbackText = document.getElementById('qualitativeFeedback')?.value || '';

    if (postAnxiety) surveyData.post_anxiety = postAnxiety.value;
    if (postDanger) surveyData.post_danger = postDanger.value;
    if (mauq) surveyData.mauq_score = mauq.value;
    surveyData.feedback = feedbackText;

    // Đổ dữ liệu ra Modal Tổng kết
    const mins = Math.floor(surveyData.readingTimeSeconds / 60).toString().padStart(2, '0');
    const secs = (surveyData.readingTimeSeconds % 60).toString().padStart(2, '0');

    if (document.getElementById('summaryTimer')) document.getElementById('summaryTimer').innerText = `${mins}:${secs}s`;
    if (document.getElementById('summaryQ1')) document.getElementById('summaryQ1').innerText = surveyData.q1_anxiety || 'N/A';
    if (document.getElementById('summaryQ2')) document.getElementById('summaryQ2').innerText = surveyData.q2_fear || 'N/A';
    if (document.getElementById('summaryPostQ1')) document.getElementById('summaryPostQ1').innerText = surveyData.post_anxiety || 'N/A';
    if (document.getElementById('summaryPostQ2')) document.getElementById('summaryPostQ2').innerText = surveyData.post_danger || 'N/A';
    if (document.getElementById('summaryMAUQ')) document.getElementById('summaryMAUQ').innerText = surveyData.mauq_score || 'N/A';

    // Đặt tiến trình thành 100%
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('progressText').innerText = '100%';

    // Mở Modal kết quả
    document.getElementById('resultModal').classList.remove('hidden');
}

/**
 * Copy JSON Data
 */
function copyDataJSON() {
    const dataStr = JSON.stringify(surveyData, null, 2);
    
    const tempInput = document.createElement('textarea');
    tempInput.value = dataStr;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép!`;
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
}

/**
 * Reset lại khảo sát về Bước 1
 */
function resetSurvey() {
    if (timerInterval) clearInterval(timerInterval);
    
    surveyData.readingTimeSeconds = 0;
    if (document.getElementById('readingTimer')) document.getElementById('readingTimer').innerText = '00:00s';
    
    // Reset tất cả các thẻ form hiện có
    document.querySelectorAll('form').forEach(form => form.reset());
    
    document.getElementById('resultModal').classList.add('hidden');
    goToStep(1);
}