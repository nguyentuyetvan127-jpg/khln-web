// ==========================================
// 1. DỮ LIỆU & CẤU HÌNH (CONSTANTS & CONFIGS)
// ==========================================

const DATABASE = {
  // Head / Forehead
  'headache': 'forehead',
  'fever': 'forehead',
  'swelling': 'forehead',
  'fatigue': 'forehead',
  'tension': 'forehead',
  'eye pain': 'eyeache',
  'ear pain': 'earache',
  'mouth pain': 'mouthache',
  'jaw pain': 'jawache',
  'cheek pain': 'cheekache',
  // Neck
  'neckache': 'neckache',
  'neck ache': 'neckache',
  'stiff neck': 'neckache',
  'neck stiffness': 'neckache',
  'sore throat': 'neckache',
  'neck pain': 'neckache',
  // Chest
  'chest pain': 'chest',
  'chest hurt': 'chest',
  'chest tightness': 'chest',
  'chest pressure': 'chest',
  'shortness of breath': 'chest',
  'breathless': 'chest',
  'heartburn': 'chest',
  'heart pain': 'chest',
  // Stomach
  'stomach ache': 'stomachache',
  'belly pain': 'stomachache',
  'abdominal pain': 'stomachache',
  'bloating': 'stomachache',
  'gas': 'stomachache',
  'nausea': 'stomachache',
  'vomiting': 'stomachache',
  'cramps': 'stomachache',
  'stomach cramp': 'stomachache',
  'indigestion': 'stomachache',
  // Hands
  'finger pain': 'hands',
  'handache': 'hands',
  'hand pain': 'hands',
  'wrist pain': 'hands',
  'numb hands': 'hands',
  'tingling hands': 'hands',
  'swollen finger': 'hands',
  // Legs
  'leg pain': 'legs',
  'knee pain': 'legs',
  'ankle pain': 'legs',
  'foot pain': 'legs',
  'toe pain': 'legs',
  'calf pain': 'legs',
  'numb legs': 'legs',
  'leg cramps': 'legs',
  // Bottom
  'hip pain': 'bottom',
  'buttock pain': 'bottom',
  'butt ache': 'bottom',
  'lower back pain': 'bottom',
  'tailbone pain': 'bottom',
  'pelvic pain': 'bottom'
};

const HIGHLIGHT_MAP = {
  'forehead': 'forehead-highlight',
  'eyeache': 'eyes-highlight',
  'earache': 'ear-highlight',
  'neckache': 'neck-highlight',
  'chest': 'chest-highlight',
  'stomachache': 'stomach-highlight',
  'hands': 'hands-highlight',
  'legs': 'leg-highlight',
  'bottom': 'bottom-highlight'
};

const TARGET_TO_TYPE_MAP = {
  'forehead-highlight': 'forehead',
};

const DATA_LIST = {
  forehead: [
    { id: 1, name: "Fever", desc: "Cảm giác thắt chặt hai bên thái dương", icon: "../asset/symptom-illu/fever.png"},
    { id: 2, name: "Fatigue", desc: "Cảm giác thắt chặt hai bên thái dương", icon: "../asset/symptom-illu/fatigue.png"},
    { id: 3, name: "Swelling", desc: "Cảm giác thắt chặt hai bên thái dương", icon: "../asset/symptom-illu/swelling.png"},
    { id: 4, name: "Tension", desc: "Cảm giác thắt chặt hai bên thái dương", icon: "../asset/symptom-illu/tension.png"},
    { id: 5, name: "Headache", desc: "Cảm giác thắt chặt hai bên thái dương", icon: "../asset/symptom-illu/headache.png"},
  ]
};

const INTENSITY_CONFIG = {
  1: { label: 'nhẹ (37.5°C - 38.4°C)', bg: 'bg-[#D1EAD8]' },
  2: { label: 'trung bình (38.5°C - 41.0°C)', bg: 'bg-[#E8CDB5]' },
  3: { label: 'nặng (> 41.0°C)', bg: 'bg-[#EAB3B3]' }
};

const HEARTRATE_CONFIG = {
  1: { label: 'chậm bất thường' },
  2: { label: 'bình thường'},
  3: { label: 'nhanh bất thường' }
};

// ==========================================
// 2. BIẾN TRẠNG THÁI (APPLICATION STATE)
// ==========================================

let activeHighlightId = null;
let selectedSymptomId = null;
let currentType = 'forehead';
const symptomSelections = {};
const confirmedSymptoms = {};

// ==========================================
// 3. THÀNH PHẦN DOM (DOM ELEMENTS)
// ==========================================

const searchInput = document.getElementById("symptomSearch");
const returnModelBtn = document.getElementById("returnModel");
const symptomContainer = document.getElementById("symtom-container");
const checklistButton = document.getElementById('checklistButton');
const checklistTable = document.getElementById('checklistTable');
const checklistIcon = document.getElementById('checklistIcon');
const letsGoBtn = document.getElementById("letsGoBtn");

// ==========================================
// 4. HÀM PHỤ TRỢ (HELPER FUNCTIONS)
// ==========================================

function enableHighlight(element) {
  if (!element) return;
  element.classList.remove('opacity-0');
  element.classList.add('opacity-100');
}

function disableHighlight(element) {
  if (!element) return;
  element.classList.remove('opacity-100');
  element.classList.add('opacity-0');
}

function getParsedSearchSymptoms() {
  if (!searchInput) return [];
  return searchInput.value
    .toLowerCase()
    .replace(/[^a-z0-9\s,;/_-]/g, '')
    .split(/[,;/]+|\band\b/)
    .map(item => item.trim())
    .filter(Boolean);
}

function setModelDetailLayout() {
  document.getElementById('header')?.classList.add('hidden');
  document.getElementById('gapAdjust')?.classList.remove('hidden');

  const model = document.querySelector('.model-container');
  if (model) {
    model.classList.add('overflow-hidden');
  }

  const headArea = document.querySelector('.character-container');
  if (headArea) {
    headArea.classList.remove('scale-100', 'origin-none', 'w-150');
    headArea.classList.add('scale-150', 'origin-top', 'lg:translate-y-1/4', 'translate-y-15', 'w-130');
  }

  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.classList.add('overflow-hidden');
    mainContent.classList.remove('items-center', 'justify-center');
  }
}

function resetModelLayout() {
  document.getElementById('header')?.classList.remove('hidden');
  document.getElementById('gapAdjust')?.classList.add('hidden');

  const model = document.querySelector('.model-container');
  if (model) {
    model.classList.remove('overflow-hidden');
  }

  const headArea = document.querySelector('.character-container');
  if (headArea) {
    headArea.classList.add('scale-100', 'origin-none', 'w-150');
    headArea.classList.remove('scale-150', 'origin-top', 'lg:translate-y-1/4', 'translate-y-15', 'w-130');
  }

  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.classList.remove('overflow-hidden');
    mainContent.classList.add('items-center', 'justify-center');
  }
}

function chooseFrequency() {
  if (!selectedSymptomId) return;

  document.querySelectorAll('#frequency-group .frequency-option').forEach(option => {
    option.addEventListener('click', () => {
      const itemKey = `${currentType}_${selectedSymptomId}`;
      const selectedValue = option.getAttribute('data-value');

      if (!symptomSelections[itemKey]) {
        symptomSelections[itemKey] = { intensity: 1, heartRate: 2, frequency: "Liên tục" };
      }
      symptomSelections[itemKey].frequency = selectedValue;
      
      document.querySelectorAll('#frequency-group .freq-btn').forEach(btn => {
        btn.classList.remove('bg-[#9AE0EB]');
        btn.classList.add('bg-[#D2F0F4]');
      });

      // 2. Active button vừa bấm (màu đậm hơn)
      const currentBtn = option.querySelector('.freq-btn');
      currentBtn.classList.remove('bg-[#D2F0F4]');
      currentBtn.classList.add('bg-[#9AE0EB]');
    });
  });
}

function initSymptomCheckbox() {
  document.querySelectorAll('#checkbox-group .symptom-checkbox').forEach(option => {
    option.addEventListener('change', updateOtherSymptoms);
  });
}

// ==========================================
// 5. HÀM XỬ LÝ CHECKLIST
// ==========================================
function confirmSymptom() {
  if (!selectedSymptomId) return;

  const list = DATA_LIST[currentType];
  const activeItem = list?.find(d => d.id === selectedSymptomId);
  if (!activeItem) return;

  const itemKey = `${currentType}_${activeItem.id}`;
  const selection = symptomSelections[itemKey] || { intensity: 1, heartRate: 2, frequency: "Liên tục", haSot: "Có", otherSymptoms: []};

  const intConf = INTENSITY_CONFIG[selection.intensity];
  const heartConf = HEARTRATE_CONFIG[selection.heartRate];

  confirmedSymptoms[itemKey] = {
    name: activeItem.name,
    icon: activeItem.icon,
    intensityLabel: intConf.label,
    intensityBg: intConf.bg,
    frequency: selection.frequency || "Liên tục",
    heartRateLabel: heartConf.label,
    haSot: selection.haSot,
    otherSymptoms: selection.otherSymptoms || [],
  };

  renderChecklist();
  deselectSymptom();
}

function renderChecklist() {
  const checklistContainer = document.getElementById("checklist-container");
  if (!checklistContainer) return;

  const keys = Object.keys(confirmedSymptoms);

  if (keys.length === 0) {
    checklistContainer.innerHTML = `<p class="text-[#253464] lg:text-[22px] text-[17px] italic">Chưa có triệu chứng nào được chọn.</p>`;
    return;
  }

  checklistContainer.innerHTML = keys.map(key => {
    const item = confirmedSymptoms[key];
    return `
      <div class="flex flex-col items-center justify-center gap-2 w-full">
        <div class="flex flex-row items-center gap-1 w-full overflow-hidden">
          <div>
              <ion-icon onclick="removeChecklistItem('${key}')" name="remove-circle" class="text-2xl text-[#253464] cursor-pointer"></ion-icon>
          </div>
          <div class="flex-1 bg-white rounded-2xl flex flex-col gap-2">
            <!--Header-->
            <div class="accordion-header flex items-center justify-between rounded-2xl bg-white mr-3 cursor-pointer">
              <div class="flex flex-row items-center">
                <img src="${item.icon}" class="w-12 h-12">
                <p class="symptom-name font-medium text-[#253464] lg:text-[25px] text-[22px]">${item.name}</p>
              </div>
              <ion-icon name="chevron-down-outline" class="toggle-icon text-lg"></ion-icon>
            </div>
            <!--Content-->
            <div class="accordion-content ml-5 max-h-0 overflow-hidden transition-all duration-300">
              <div class="mb-2 flex flex-wrap gap-2">
                <span class="${item.intensityBg} text-[#253464] lg:text-[16px] text-[14px] font-semibold px-3 rounded-full max-w-full inline-block">${item.intensityLabel}</span>
                <span class="bg-[#9AE0EB] text-[#253464] lg:text-[16px] text-[14px] font-semibold px-3 rounded-full max-w-full inline-block">${item.frequency}</span>
              </div>
              ${generateSymptomsHTML(item.otherSymptoms)}
              <div class="flex flex-col gap-1 mb-2 max-w-full">
                <div class="flex flex-row gap-1 items-center">
                  <div class="w-4 h-4 rounded-full flex items-center justify-center">
                    <ion-icon name="heart" class="text-[15px] text-[#253464]"></ion-icon>
                  </div>
                  <p class="text-[#253464] font-medium text-[14px]">${item.heartRateLabel}</p>
                </div>
                <div class="flex flex-row gap-1 items-center">
                  <div class="w-4 h-4 rounded-full flex items-center justify-center">
                    <ion-icon name="medkit" class="text-[14px] text-[#253464]"></ion-icon>
                  </div>
                  <p class="text-[#253464] font-medium text-[14px]">${item.haSot}</p>
                </div> 
              </div>
            </div>
          </div>
        </div>  
      </div>
    `;
  }).join("");

  initAccordionEvents();
}

function removeChecklistItem(key) {
  delete confirmedSymptoms[key];
  renderChecklist();
}

if (checklistButton && checklistTable) {
  checklistButton.addEventListener("click", () => {
    checklistTable.classList.toggle('lg:translate-x-[120%]');
    checklistTable.classList.toggle('translate-x-[110%]');
    if (checklistIcon) {
      checklistIcon.name = checklistIcon.name === "close-outline" ? "menu-outline" : "close-outline";
    }
  });
}

function initAccordionEvents() {
  const headers = document.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      // Tìm div cha và chọn đúng content / icon tương ứng
      const parent = header.closest('.flex-1');
      const content = parent.querySelector('.accordion-content');
      const toggleIcon = header.querySelector('.toggle-icon');

      // Toggle max-height thay vì h-0
      content.classList.toggle('max-h-0');
      content.classList.toggle('max-h-96'); 

      // Đổi icon
      const isOpen = content.classList.contains('max-h-96');
      toggleIcon.name = isOpen ? "chevron-up-outline" : "chevron-down-outline";
    });
  });
}

function generateSymptomsHTML(symptomsArray) {
  if (!symptomsArray || symptomsArray.length === 0) {
    return ''; 
  }
  // Lặp qua từng phần tử trong mảng để tạo các dòng items
  const itemsHTML = symptomsArray.map(symptom => `
    <div class="flex flex-row items-center gap-2">
      <div class="w-3 h-3 bg-[#84C5E4]"></div>
      <p class="text-[#253464] font-medium text-[14px]">${symptom}</p>
    </div>
  `).join('');

  // Trả về thẻ bọc ngoài cùng chứa tất cả các items
  return `<div class="flex flex-col gap-1 mb-2">${itemsHTML}</div>`;
}

// ==========================================
// 6. HÀM HIỂN THỊ & XỬ LÝ TRẠNG THÁI (CORE UI)
// ==========================================

function renderSymptoms(type) {
  if (type) currentType = type;
  if (!symptomContainer) return;

  const list = DATA_LIST[currentType];
  if (!list) return;

  // TRẠNG THÁI 1: Chưa chọn bệnh cụ thể -> Hiện lưới 2 cột
  if (selectedSymptomId === null) {
    symptomContainer.className = "lg:ml-10 grid lg:grid-cols-2 grid-cols-1 overflow-auto lg:h-100 h-110 w-full";
    symptomContainer.innerHTML = list.map(disease => `
      <div onclick="selectSymptom(${disease.id})" class="flex items-center rounded-2xl px-4 cursor-pointer transition-all duration-300">
        <div class="flex flex-row items-center">
          <div>
            <img src="${disease.icon}" class="lg:w-30 w-20 lg:h-30 h-20">
          </div>
          <h3 class="font-medium text-[#253464] text-[32px]">${disease.name}</h3>
        </div>
      </div>
    `).join("");
  } 
  // TRẠNG THÁI 2: Đã chọn 1 bệnh
  else {

    const activeItem = list.find(d => d.id === selectedSymptomId);
    if (!activeItem) return;

    if (activeItem.id !== 1) {
      symptomContainer.className = "flex flex-col items-center justify-center w-full lg:h-115 h-100 text-center gap-4 pr-12";
      symptomContainer.innerHTML = `
        <img src="${activeItem.icon}" class="w-24 h-24 object-contain">
        <h2 class="text-[#253464] text-[32px] font-bold">${activeItem.name}</h2>
        <div class="bg-[#D2F0F4] border border-[#84C5E4] rounded-2xl p-6 max-w-md shadow-sm">
          <p class="text-[#253464] text-[18px] font-medium leading-relaxed">
            Tính năng nhập thông tin chi tiết cho triệu chứng <strong>${activeItem.name}</strong> đang trong quá trình phát triển.
          </p>
          <p class="text-[#526399] text-[15px] italic mt-2">
            (Bản thử nghiệm Prototype hiện tại chỉ hỗ trợ triệu chứng <strong>Fever</strong>)
          </p>
        </div>
        <button onclick="deselectSymptom()" class="bg-[#84C5E4] text-white font-bold text-[18px] px-6 py-2 rounded-full hover:shadow-md transition-all cursor-pointer">
          Quay lại danh sách
        </button>
      `;
      return;
    }

    const itemKey = `${currentType}_${activeItem.id}`;
    if (!symptomSelections[itemKey]) {
      symptomSelections[itemKey] = { intensity: 1, heartRate: 2, frequency: "Liên tục" };
    }

    const currentIntensity = symptomSelections[itemKey].intensity;
    const currentHeartRate = symptomSelections[itemKey].heartRate;
    const currentFrequency = symptomSelections[itemKey].frequency;
    const currentHaSot = symptomSelections[itemKey].haSot;
    const intConf = INTENSITY_CONFIG[currentIntensity];
    const heartConf = HEARTRATE_CONFIG[currentHeartRate];

    symptomContainer.className = "lg:ml-0 ml-4 flex flex-row lg:w-fit w-full overflow-y-auto lg:h-115 h-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-10 [&::-webkit-scrollbar-track]:bg-[#8BB1C3] [&::-webkit-scrollbar-thumb]:bg-[#F4F9FF] [&::-webkit-scrollbar-thumb]:rounded-full pr-4";
    symptomContainer.innerHTML = `
      <!-- Bệnh được chọn -->
      <div>
        <img src="${activeItem.icon}" class="lg:w-30 w-0 lg:h-30 h-0">
      </div>
      <div class="flex flex-col lg:gap-6 gap-2 lg:mt-6">
        <!--Tiêu đề-->
        <div onclick="confirmSymptom()" class="cursor-pointer">
          <h2 class="lg:text-[37px] text-[26px] font-medium text-[#253464] border-b-4 border-[#253464] max-w-80 lg:max-w-120">${activeItem.name}</h2>
          <p class="lg:text-[20px] text-[14px] text-[#253464] max-w-80 lg:max-w-120 font-medium leading-relaxed wrap-break-word pt-1">
          ${activeItem.desc}
          </p>
        </div>

        <!-- Intensity -->
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center">
            <span class="lg:text-[25px] text-[20px] font-semibold text-[#253464]">Mức độ sốt</span>
          </div>
          
          <div class="flex items-center gap-5 w-full">
            <div class="relative lg:w-60 w-35 lg:h-7 h-4 flex items-center">
              <div class="absolute inset-x-0 lg:h-7 h-4 rounded-full bg-blue-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden pointer-events-none z-0"></div>
              <div class="absolute px-2 lg:h-7 h-4 flex justify-between mx-auto w-full items-center pointer-events-none z-10">
                  <div class="w-1 h-full bg-[#526399]/40 opacity-0"></div>
                  <div class="w-1 h-full bg-[#526399]/40"></div>
                  <div class="w-1 h-full bg-[#526399]/40"></div>
                  <div class="w-1 h-full bg-[#526399]/40"></div>
                  <div class="w-1 h-full bg-[#526399]/40 opacity-0">
                </div>
            </div>
            <input 
              type="range" min="1" max="3" step="1" 
              value="${currentIntensity}" 
              id="IntensityRange" 
              oninput="updateIntensity(this.value, ${activeItem.id})"
              class="inset-x-0 mx-auto w-1/2 bg-transparent appearance-none outline-none cursor-pointer z-20 absolute
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 lg:[&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:h-6.5
              [&::-webkit-slider-thumb]:bg-[#253464] [&::-webkit-slider-thumb]:rounded [&::-webkit-slider-thumb]:shadow-lg"
            />
            </div>
            <div id="intensityBadge">
              <span class="lg:px-4 px-3 py-1 ${intConf.bg} text-[#253464] rounded-full lg:text-[18px] font-medium">${intConf.label}</span>
            </div>
          </div>
        </div>

        <!--Frequency-->
        <div class="flex flex-col">
          <span class="lg:text-[25px] text-[15px] font-semibold text-[#253464]">Mức độ thường xuyên</span>
          <div id="frequency-group" class="flex flex-col lg:gap-3 gap-2.5 mt-2">
            <div class="frequency-option text-medium text-[#253464]" data-value="Liên tục">
              <button class="freq-btn ${currentFrequency === 'Liên tục' ? 'bg-[#9AE0EB]' : 'bg-[#D2F0F4]'} px-3 rounded-full lg:text-[18px]">Liên tục</button>
            </div>
            <div class="frequency-option text-medium text-[#253464] flex flex-row gap-2" data-value="Theo cơn">
              <button class="freq-btn ${currentFrequency === 'Theo cơn' ? 'bg-[#9AE0EB]' : 'bg-[#D2F0F4]'} px-3 rounded-full lg:text-[18px]">Theo cơn</button>
              <span class="lg:text-[15px] text-[13px]">3-4 lần trong một ngày</span>
            </div>
            <div class="frequency-option text-medium text-[#253464] flex flex-row gap-2" data-value="Từng đợt">
              <button class="freq-btn ${currentFrequency === 'Từng đợt' ? 'bg-[#9AE0EB]' : 'bg-[#D2F0F4]'} px-3 rounded-full lg:text-[18px]">Từng đợt</button>
              <span class="lg:text-[15px] text-[13px]">sốt vài ngày - hết - sốt lại</span>
            </div>
          </div>
        </div>

        <!--Các triệu chứng khác-->
        <div>
          <span class="lg:text-[25px] text-[15px] font-semibold text-[#253464]">Thông tin bổ sung</span>
          <div class="flex flex-col lg:gap-4 gap-1">
            <!--Nhịp tim & Hạ sốt-->
            <div class="flex flex-col gap-1 lg:gap-4">
              <!--Nhịp tim-->
              <div>
                <span class="lg:text-[20px] font-medium text-[#253464] text-[18px]">Nhịp tim</span>
                <div class="flex items-center gap-5 w-full">
                  <div class="relative lg:w-50 w-35 lg:h-6 h-4.5 flex items-center">
                  <div class="absolute inset-x-0 lg:h-6 h-4.5 rounded-full bg-blue-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden pointer-events-none z-0"></div>
                  <div class="absolute px-2 lg:h-6 h-4.5 flex justify-between mx-auto w-full items-center pointer-events-none z-10">
                    <div class="w-1 h-full bg-[#526399]/40 opacity-0"></div>
                    <div class="w-1 h-full bg-[#526399]/40"></div>
                    <div class="w-1 h-full bg-[#526399]/40"></div>
                    <div class="w-1 h-full bg-[#526399]/40"></div>
                    <div class="w-1 h-full bg-[#526399]/40 opacity-0"></div>
                  </div>
                  <input 
                    type="range" min="1" max="3" step="1" 
                    value="${currentHeartRate}" 
                    id="heartRateRange" 
                    oninput="updateHeartRate(this.value, ${activeItem.id})"
                    class="inset-x-0 mx-auto w-1/2 bg-transparent appearance-none outline-none cursor-pointer z-20 absolute
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 lg:[&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:h-6.5
                    [&::-webkit-slider-thumb]:bg-[#253464] [&::-webkit-slider-thumb]:rounded [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  </div>
                  <div id="heartRateBadge">
                    <span class="px-3 py-1 bg-[#9AE0EB] text-[#253464] rounded-full lg:text-[18px] font-medium">${heartConf.label}</span>
                  </div>
                </div>
              </div>
              <!--Hạ sốt-->
              <div>
                <span class="lg:text-[20px] font-medium text-[#253464] text-[20px]">Uống thuốc có hạ sốt không?</span>
                <div class="flex flex-col gap-2">
                  <label class="flex items-center gap-3 cursor-pointer select-none">
                    <input type="radio" name="ha_sot" value="Có" class="peer hidden" ${currentHaSot === 'Có' ? 'checked' : ''} onchange="updateHaSot(this.value)"/>
                    <span class="lg:w-7 lg:h-7 w-6 h-6 rounded-full bg-[#84C5E4]/40 peer-checked:bg-[#84C5E4] transition-all flex items-center justify-center">
                    <span class="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></span>
                    </span>
                    <span class="text-[#1f2b5b] font-medium lg:text-[18px]">Có</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer select-none">
                    <input type="radio" name="ha_sot" value="Không" class="peer hidden" ${currentHaSot === 'Không' ? 'checked' : ''} onchange="updateHaSot(this.value)"/>
                    <span class="lg:w-7 lg:h-7 w-6 h-6 rounded-full bg-[#84C5E4]/40 peer-checked:bg-[#84C5E4] transition-all flex items-center justify-center">
                    <span class="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></span>
                    </span>
                    <span class="text-[#1f2b5b] font-medium lg:text-[18px]">Không</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer select-none">
                    <input type="radio" name="ha_sot" value="Chưa dùng/Không rõ" class="peer hidden" ${currentHaSot === 'Chưa dùng/Không rõ' ? 'checked' : ''} onchange="updateHaSot(this.value)"/>
                    <span class="lg:w-7 lg:h-7 w-6 h-6 rounded-full bg-[#84C5E4]/40 peer-checked:bg-[#84C5E4] transition-all flex items-center justify-center">
                    <span class="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></span>
                    </span>
                    <span class="text-[#1f2b5b] font-medium lg:text-[18px]">Chưa dùng/Không rõ</span>
                  </label>
                </div>  
              </div>
            </div> 
            <!--List bệnh-->
            <div id="checkbox-group" class="flex flex-col gap-2 text-[#253464]">
              <span class="lg:text-[20px] font-medium text-[#253464] text-[18px]">Các triệu chứng khác</span>
              <label class="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" value="vã mồ hôi" class="symptom-checkbox peer hidden" />
                <span class="lg:w-7 lg:h-7 w-6 h-6 bg-[#84C5E4] flex items-center justify-center peer-checked:[&>ion-icon]:opacity-100">
                  <ion-icon name="checkmark-outline" class="lg:text-4xl text-lg opacity-0 transition-opacity"></ion-icon>
                </span>
                <span class="font-medium lg:text-[18px]">Vã mồ hôi</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" value="đau đầu dữ dội" class="symptom-checkbox peer hidden" />
                <span class="lg:w-7 lg:h-7 w-6 h-6 bg-[#84C5E4] flex items-center justify-center peer-checked:[&>ion-icon]:opacity-100">
                  <ion-icon name="checkmark-outline" class="lg:text-4xl text-lg opacity-0 transition-opacity"></ion-icon>
                </span>
                <span class="font-medium lg:text-[18px]">Đau đầu dữ dội</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" value="rét run" class="symptom-checkbox peer hidden" />
                <span class="lg:w-7 lg:h-7 w-6 h-6 bg-[#84C5E4] flex items-center justify-center peer-checked:[&>ion-icon]:opacity-100">
                  <ion-icon name="checkmark-outline" class="lg:text-4xl text-lg opacity-0 transition-opacity"></ion-icon>
                </span>
                <span class="font-medium lg:text-[18px]">Rét run</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" value="co giật/cứng cổ" class="symptom-checkbox peer hidden"/>
                <span class="lg:w-7 lg:h-7 w-6 h-6 bg-[#84C5E4] flex items-center justify-center peer-checked:[&>ion-icon]:opacity-100">
                  <ion-icon name="checkmark-outline" class="lg:text-4xl text-lg opacity-0 transition-opacity"></ion-icon>
                </span>
                <span class="font-medium lg:text-[18px]">Co giật/cứng cổ</span>
              </label>
            </div>
            
          </div>
        </div>

        <!--Confirm-->
        <button onclick="confirmSymptom()" class="bg-[#84C5E4] lg:w-52 w-30 font-bold lg:text-[26px] text-[18px] text-white py-1 rounded-full lg:mt-0 mt-4 cursor-pointer hover:shadow-[0_5px_4px_0_#7185B1] transition-all duration-200">Confirm</button>
        <div class="w-10 h-10 text-[#EFEEE5] pointer-events-none">hello</div>
      </div>
    `;
  }
  chooseFrequency();
}

function selectSymptom(id) {
  selectedSymptomId = id;
  
  renderSymptoms();

  initSymptomCheckbox();

  const itemKey = `${currentType}_${selectedSymptomId}`;
  const savedOtherSymptoms = symptomSelections[itemKey]?.otherSymptoms || [];

  document.querySelectorAll('#checkbox-group .symptom-checkbox').forEach(cb => {
    cb.checked = savedOtherSymptoms.includes(cb.value);
  });
}

function deselectSymptom() {
  selectedSymptomId = null;
  renderSymptoms();
}

function updateIntensity(value, id) {
  const itemKey = `${currentType}_${id}`;
  if (!symptomSelections[itemKey]) {
    symptomSelections[itemKey] = { intensity: 1, heartRate: 2, frequency: "Liên tục" };
  }
  symptomSelections[itemKey].intensity = Number(value);

  const intensityBadge = document.getElementById('intensityBadge');
  const config = INTENSITY_CONFIG[value];
  if (intensityBadge && config) {
    intensityBadge.innerHTML = `
      <span class="lg:px-4 px-3 py-1 ${config.bg} text-[#253464] rounded-full lg:text-[18px] font-medium">${config.label}</span>
    `;
  }
}

function updateHeartRate(value, id) {
  const itemKey = `${currentType}_${id}`;

  if (!symptomSelections[itemKey]) {
    symptomSelections[itemKey] = { intensity: 1, heartRate: 2, frequency: "Liên tục" };
  }
  symptomSelections[itemKey].heartRate = Number(value);

  const heartRateBadge = document.getElementById('heartRateBadge');
  const config = HEARTRATE_CONFIG[value];
  if (heartRateBadge && config) {
    heartRateBadge.innerHTML = `
      <span class="px-3 py-1 bg-[#9AE0EB] text-[#253464] rounded-full lg:text-[18px] font-medium">${config.label}</span>
    `;
  }
}

function updateHaSot(value) {
  if (!selectedSymptomId) return;

  const itemKey = `${currentType}_${selectedSymptomId}`;

  if (!symptomSelections[itemKey]) {
    symptomSelections[itemKey] = { intensity: 1, heartRate: 2, frequency: "Liên tục" };
  }

  symptomSelections[itemKey].haSot = value;
}

function updateOtherSymptoms() {
  if (!selectedSymptomId) return;

  const itemKey = `${currentType}_${selectedSymptomId}`;

  if (!symptomSelections[itemKey]) {
    symptomSelections[itemKey] = { 
      intensity: 1, 
      heartRate: 2, 
      frequency: "Liên tục", 
      otherSymptoms: [] 
    };
  }
  const checkedBoxes = document.querySelectorAll('#checkbox-group .symptom-checkbox:checked');
  symptomSelections[itemKey].otherSymptoms = Array.from(checkedBoxes).map(cb => cb.value);
}

// ==========================================
// 7. ĐĂNG KÝ SỰ KIỆN (EVENT LISTENERS)
// ==========================================

if (searchInput) {
  searchInput.addEventListener("input", function() {
    const symptoms = getParsedSearchSymptoms();

    document.querySelectorAll('.highlight-layer').forEach(img => {
      disableHighlight(img);
    });

    symptoms.forEach(symptom => {
      const parentGroup = DATABASE[symptom];
      if (parentGroup) {
        const targetId = HIGHLIGHT_MAP[parentGroup];
        enableHighlight(document.getElementById(targetId));
      }
    });
  });
}

document.querySelectorAll('.interactive-box').forEach((element) => {
  const targetId = element.dataset.target;
  const targetHighlight = document.getElementById(targetId);

  if (!targetHighlight) return;

  element.addEventListener('mouseenter', () => {
    enableHighlight(targetHighlight);
  });

  element.addEventListener('mouseleave', () => {
    const symptoms = getParsedSearchSymptoms();
    const isHighlightedBySearch = symptoms.some(symptom => {
      const parentGroup = DATABASE[symptom];
      return parentGroup && HIGHLIGHT_MAP[parentGroup] === targetId;
    });

    if (!isHighlightedBySearch && activeHighlightId !== targetId) {
      disableHighlight(targetHighlight);
    }
  });

  element.addEventListener('click', () => {
    if (targetId !== 'forehead-highlight') return;

    activeHighlightId = targetId;
    selectedSymptomId = null;

    renderSymptoms('forehead');

    setModelDetailLayout();
    enableHighlight(targetHighlight);
  });
});

if (returnModelBtn) {
  returnModelBtn.addEventListener("click", () => {
    resetModelLayout();
    activeHighlightId = null;
    selectedSymptomId = null;
    renderSymptoms();
  });
}

// ==========================================
// 8. KHỞI CHẠY LẦN ĐẦU (INITIALIZATION)
// ==========================================

renderSymptoms();
renderChecklist();

// ==========================================
// 9. HÀM LƯU DỮ LIỆU VÀO LOCALSTORAGE (JSON)
// ==========================================
if (letsGoBtn) {
  letsGoBtn.addEventListener("click", () => {
    // 1. Kiểm tra nếu người dùng chưa bấm Confirm triệu chứng nào
    if (Object.keys(confirmedSymptoms).length === 0) {
      alert("Vui lòng chọn triệu chứng và nhấn nút Confirm trước khi tiếp tục!");
      return;
    }

    // 2. Chuyển object confirmedSymptoms thành chuỗi JSON và lưu vào localStorage
    localStorage.setItem('userSymptomData', JSON.stringify(confirmedSymptoms));

    // 3. Chuyển sang trang kết quả (Đổi tên file HTML của bạn cho đúng)
    window.location.href = 'result.html';
  });
}