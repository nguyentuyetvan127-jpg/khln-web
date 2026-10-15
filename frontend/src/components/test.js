const STAIS_questionsData = [
  {
    id: 1,
    name: "q1_calm",
    title: "Tôi cảm thấy bình tĩnh",
    options: [
      { value: "1", label: "Không chút nào" },
      { value: "2", label: "Một chút" },
      { value: "3", label: "Khá nhiều" },
      { value: "4", label: "Rất nhiều" }
    ]
  },
  {
    id: 2,
    name: "q2_secure",
    title: "Tôi cảm thấy an toàn",
    options: [
      { value: "1", label: "Không chút nào" },
      { value: "2", label: "Một chút" },
      { value: "3", label: "Khá nhiều" },
      { value: "4", label: "Rất nhiều" }
    ]
  },
  {
    id: 3,
    name: "q3_upset",
    title: "Tôi cảm thấy khó chịu/ bồn chồn",
    options: [
      { value: "1", label: "Không chút nào" },
      { value: "2", label: "Một chút" },
      { value: "3", label: "Khá nhiều" },
      { value: "4", label: "Rất nhiều" }
    ]
  },
  {
    id: 4,
    name: "q4_relaxed",
    title: "Tôi cảm thấy thư thái/ thả lỏng",
    options: [
      { value: "1", label: "Không chút nào" },
      { value: "2", label: "Một chút" },
      { value: "3", label: "Khá nhiều" },
      { value: "4", label: "Rất nhiều" }
    ]
  },
  {
    id: 5,
    name: "q5_content",
    title: "Tôi cảm thấy an tâm/ hài lòng",
    options: [
      { value: "1", label: "Không chút nào" },
      { value: "2", label: "Một chút" },
      { value: "3", label: "Khá nhiều" },
      { value: "4", label: "Rất nhiều" }
    ]
  },
  {
    id: 6,
    name: "q6_worried",
    title: "Tôi cảm thấy lo lắng",
    options: [
      { value: "1", label: "Không chút nào" },
      { value: "2", label: "Một chút" },
      { value: "3", label: "Khá nhiều" },
      { value: "4", label: "Rất nhiều" }
    ]
  },
];

const ND_UI_questionsData = {
  options: [
    "Hoàn toàn không đồng ý",
    "Không đồng ý",
    "Trung tính",
    "Đồng ý",
    "Hoàn toàn đồng ý"
  ],
  questions: [
    {
      id: 1,
      name: "q1_illustration",
      title: "1. Màu sắc và hình ảnh minh họa trên trang web mang lại cho tôi cảm giác dịu mắt và nhẹ nhàng."
    },
    {
      id: 2,
      name: "q2_category",
      title: "2. Cách trang web phân loại và hiển thị danh sách bệnh làm tôi không lo lắng mình đang mắc bệnh nguy hiểm."
    },
    {
      id: 3,
      name: "q3_language",
      title: "3. Ngôn ngữ và cách diễn đạt trong bài viết ôn tồn, trấn an chứ không mang tính hù dọa."
    },
    {
      id: 4,
      name: "q4_guidance",
      title: "4. Trang web đưa ra hướng dẫn rõ ràng về những việc thiết thực tôi nên làm tiếp theo. "
    },
    {
      id: 5,
      name: "q5_disease_color",
      title: "5. Mức độ rõ ràng trong việc sử dụng màu sắc giúp tôi dễ dàng phân biệt và nắm bắt tình trạng/độ nghiêm trọng của bệnh trên trang web."
    },
    {
      id: 6,
      name: "q6_document",
      title: "6. Mức độ dễ dàng tìm kiếm tài liệu và bệnh lý tương ứng với các triệu chứng tôi đang gặp phải."
    },
  ]
};

const compareSurveyData = {
  options: [
    {
      value: "1",
      label: "Web A vượt trội",
      colorClass: "text-crimson peer-checked:bg-crimson/20 peer-checked:border-crimson hover:border-crimson"
    },
    {
      value: "2",
      label: "Web A nhỉnh hơn",
      colorClass: "text-brown-orange peer-checked:bg-brown-orange/20 peer-checked:border-brown-orange hover:border-brown-orange"
    },
    {
      value: "3",
      label: "Như nhau",
      colorClass: "text-dark-yellow peer-checked:bg-dark-yellow/20 peer-checked:border-dark-yellow hover:border-dark-yellow"
    },
    {
      value: "4",
      label: "Web B nhỉnh hơn",
      colorClass: "text-teal-green peer-checked:bg-teal-green/20 peer-checked:border-teal-green hover:border-teal-green"
    },
    {
      value: "5",
      label: "Web B vượt trội",
      colorClass: "text-dark-teal peer-checked:bg-dark-teal/20 peer-checked:border-dark-teal hover:border-dark-teal"
    }
  ],

  questions: [
    {
      id: 1,
      name: "q1_result",
      title: "1. Trang web nào khiến bạn cảm thấy an tâm và ít lo âu hơn khi đọc danh sách kết quả?"
    },
    {
      id: 2,
      name: "q2_lessStress",
      title: "2. Trang web nào ít tạo áp lực hay hù dọa rằng bạn đang mắc phải căn bệnh nghiêm trọng?"
    },
    {
      id: 3,
      name: "q3_visual",
      title: "3. Trang web nào có phong cách thị giác (màu sắc, hình ảnh minh họa) dịu mắt, nhẹ nhàng và dễ chịu hơn?"
    },
    {
      id: 4,
      name: "q4_layout",
      title: "4. Trang web nào có cách trình bày thông tin thoáng đãng, gọn gàng và giúp bạn không bị ngợp khi đọc?"
    },
    {
      id: 5,
      name: "q5_next_Step",
      title: "5. Trang web nào đưa ra hướng dẫn xử lý tiếp theo (như nghỉ ngơi, uống nước hay đi khám) rõ ràng và thực tế hơn?"
    },
    {
      id: 6,
      name: "q6_professionalism",
      title: "6. Trang web nào mang lại cho bạn cảm giác chuyên nghiệp, chuẩn y khoa và đáng tin cậy hơn?"
    }
  ]
};

function renderSTAIS_Questions() {
  // 1. Lấy tất cả container theo class
  const containers = document.querySelectorAll('.stais-questions-list');
  if (!containers.length) return;

  // 2. Lặp qua từng container
  containers.forEach((container, containerIndex) => {
    
    // --- 1. Render nội dung cho MOBILE ---
    const mobileHTML = STAIS_questionsData.map((item, index) => {
      // Đặt name riêng cho Mobile: ví dụ mobile_q1_calm_0
      const mobileRadioName = `mobile_${item.name}_${containerIndex}`;

      const optionsHTML = item.options.map(opt => `
        <label class="cursor-pointer">
          <input type="radio" name="${mobileRadioName}" value="${opt.value}" class="sr-only custom-radio">
          <div class="p-2.5 text-center text-xs rounded-xl border border-pastel-creamBorder bg-white font-medium text-pastel-textDark transition-all">
            ${opt.label}
          </div>
        </label>
      `).join('');

      return `
        <div class="mb-4">
          <p class="font-semibold text-sm text-pastel-textDark mb-2">
            ${index + 1}. ${item.title}
          </p>
          <div class="grid grid-cols-2 gap-2">
            ${optionsHTML}
          </div>
        </div>
      `;
    }).join('');

    // --- 2. Render nội dung cho DESKTOP ---
    const headers = STAIS_questionsData[0].options;
    const desktopRowsHTML = STAIS_questionsData.map((item, index) => {
      // Đặt name riêng cho Desktop: ví dụ desktop_q1_calm_0
      const desktopRadioName = `desktop_${item.name}_${containerIndex}`;

      const radioCells = item.options.map(opt => `
        <td class="p-3 text-center">
          <input type="radio" name="${desktopRadioName}" value="${opt.value}" class="w-4 h-4 text-pastel-bluePrimary">
        </td>
      `).join('');

      return `
        <tr class="hover:bg-pastel-creamBg/30">
          <td class="p-3 font-medium">${index + 1}. ${item.title}</td>
          ${radioCells}
        </tr>
      `;
    }).join('');

    // --- 3. Đưa cả 2 giao diện vào container ---
    container.innerHTML = `
      <!-- Giao diện MOBILE -->
      <div class="block md:hidden">
        ${mobileHTML}
      </div>

      <!-- Giao diện DESKTOP -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm text-pastel-textDark border-collapse">
          <thead>
            <tr class="border-b border-pastel-creamBorder bg-pastel-creamBg/60">
              <th class="p-3 font-semibold w-1/2">Trạng thái cảm xúc</th>
              ${headers.map(opt => `<th class="p-3 font-semibold text-center w-1/8">${opt.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-pastel-creamBorder">
            ${desktopRowsHTML}
          </tbody>
        </table>
      </div>
    `;
  });
}

function renderND_UI_Questions() {
  const containers = document.querySelectorAll('.ND_UI_questions_list');
  if (!containers.length) return;

  containers.forEach((container, containerIndex) => {
    
    // --- 1. Render nội dung cho MOBILE ---
    const mobileHTML = ND_UI_questionsData.questions.map((item) => {
      // Đặt name riêng cho Mobile để không trùng lập
      const mobileRadioName = `mobile_${item.name}_${containerIndex}`;

      // Duyệt qua mảng options chung
      const optionsHTML = ND_UI_questionsData.options.map(optValue => `
        <label class="cursor-pointer">
          <input type="radio" name="${mobileRadioName}" value="${optValue}" class="sr-only custom-radio">
          <div class="p-3.5 rounded-xl border border-pastel-creamBorder bg-pastel-creamBg hover:bg-pastel-blueSoft/50 transition-all flex items-center gap-3">
            <div class="radio-dot w-4 h-4 rounded-full border-2 border-pastel-textMuted shrink-0"></div>
            <span class="text-sm font-medium">${optValue}</span>
          </div>
        </label>
      `).join('');

      return `
        <p class="font-semibold text-sm text-pastel-textDark">
          ${item.title}
        </p>
        <div class="grid grid-cols-1 gap-2">
          ${optionsHTML}
        </div>
      `;
    }).join('');

    // --- 2. RENDER GIAO DIỆN DESKTOP (BẢNG) ---
    const desktopHeadersHTML = ND_UI_questionsData.options.map(opt => `
      <th class="p-3 font-semibold text-center w-1/8">${opt}</th>
    `).join('');

    // Render từng hàng câu hỏi
    const desktopRowsHTML = ND_UI_questionsData.questions.map((item) => {
      const desktopRadioName = `desktop_${item.name}_${containerIndex}`;

      const radioCells = ND_UI_questionsData.options.map(optValue => `
        <td class="p-3 text-center">
          <input type="radio" name="${desktopRadioName}" value="${optValue}" class="w-4 h-4 text-pastel-bluePrimary">
        </td>
      `).join('');

      return `
        <tr class="hover:bg-pastel-creamBg/30">
          <td class="p-3 font-medium">${item.title}</td>
          ${radioCells}
        </tr>
      `;
    }).join('');

    // --- 3. ĐƯA CẢ 2 GIAO DIỆN VÀO INNERHTML ---
    container.innerHTML = `
      <!-- 1. Giao diện cho ĐIỆN THOẠI (Hiện trên Mobile, Ẩn trên Desktop) -->
      <div class="block md:hidden space-y-4">
        ${mobileHTML}
      </div>

      <!-- 2. Giao diện cho MÁY TÍNH / TABLET (Ẩn trên Mobile, Hiện trên Desktop) -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm text-pastel-textDark border-collapse">
          <thead>
            <tr class="border-b border-pastel-creamBorder bg-pastel-creamBg">
              <th class="p-3 font-semibold w-1/3"></th>
              ${desktopHeadersHTML}
            </tr>
          </thead>
          <tbody class="divide-y divide-pastel-creamBorder">
            ${desktopRowsHTML}
          </tbody>
        </table>
      </div>
    `;
  });
}

function generateEachWeb_Test(variant) {
  const webUrl = (variant === 'A') 
    ? 'https://www.vinmec.com/vie/'  // Thay link thật Web A vào đây
    : 'https://web-thuc-nghiem.vercel.app/'; // Thay link thật Web B vào đây
  return `
    <!-- EXPERIMENT SCENARIO BOX -->
    <div class="bg-linear-to-r from-pastel-blueSoft via-pastel-creamCard to-pastel-blueSoft border border-pastel-blueMedium/60 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div class="flex flex-col justify-between gap-4">
        <div class="space-y-1.5 flex-1">
          <div class="flex items-center gap-2">
              <span class="bg-pastel-blueDark text-white text-base sm:text-lg font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  HÃY HÌNH DUNG BẠN ĐANG Ở TRONG TÌNH HUỐNG SAU
              </span>
          </div>
          <div class="space-y-2 text-base sm:text-lg font-medium text-pastel-textDark leading-relaxed"> 
            <ul class="space-y-1 pl-2">
              <li class="flex items-start gap-2">
                <span class="select-none">-</span>
                <span>Sốt nhẹ (~38°C), rét run từng đợt</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="select-none">-</span>
                <span>Đau đầu dữ dội</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="select-none">-</span>
                <span>Uống Paracetamol có đỡ nhưng khi hết thuốc thì sốt lại.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="select-none">-</span>
                <span>Tim đập nhanh bất thường</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Link web -->
        <div class="space-y-1.5 flex-1">
          <div class="flex items-center gap-2">
            <span class="bg-pastel-blueDark text-white text-base sm:text-lg font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              LINK TRANG WEB ${variant}
            </span>
          </div>
          <p class="text-base sm:text-lg font-medium text-pastel-textDark leading-relaxed">
            <a href="${webUrl}" target="_blank" class="text-pastel-bluePrimary hover:text-pastel-blueDark font-semibold underline transition-colors">Click vào đây để mở</a>
          </p>
        </div>
      </div>
    </div>

    <div class="fade-in bg-pastel-creamCard border border-pastel-creamBorder rounded-2xl p-5 sm:p-8 shadow-sm">
      <div class="border-b border-pastel-creamBorder pb-4 mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-pastel-textDark">ĐÁNH GIÁ CẢM XÚC & TRẢI NGHIỆM SAU KHI TRA CỨU Ở WEB ${variant}</h2>
      </div>

      <div class="space-y-6">
        <!--Phần 1: cảm xúc tức thời-->
        <h3 class="block text-base sm:text-lg font-bold text-pastel-textDark">PHẦN I: CẢM XÚC TỨC THỜI</h3>
        <!-- Câu 1: Thang đo SAM-->
        <div class="space-y-3">
          <!-- Tiêu đề câu hỏi -->
          <div>
              <h3 class="font-semibold text-sm sm:text-base text-pastel-textDark">
              1. Cơ thể / nhịp tim của bạn lúc đó phản ứng ra sao?
              </h3>
              <p class="text-xs text-pastel-textMuted italic mt-0.5">
              (Đánh giá từ 1: Tích cực/Thả lỏng đến 5: Tiêu cực/Hồi hộp)
              </p>
          </div>

          <!-- Thang đo Likert 1 -> 5 (Dàn 5 cột tự co giãn trên Mobile & Desktop) -->
          <div class="grid grid-cols-5 gap-1.5 sm:gap-3">
            <!-- Mức 1: Hoàn toàn thả lỏng / Bình tĩnh -->
            <label class="cursor-pointer">
              <input type="radio" name="q1_body_reaction" value="1" class="sr-only peer" required />
              <div class="flex flex-col items-center justify-between h-full p-2 sm:p-3 rounded-xl border border-pastel-creamBorder bg-white transition-all peer-checked:bg-pastel-blueSoft peer-checked:border-pastel-bluePrimary peer-checked:text-pastel-blueDark hover:border-pastel-blueMedium text-center">
                <span class="text-xs sm:text-sm font-bold w-6 h-6 rounded-full bg-pastel-creamBg flex items-center justify-center mb-1">1</span>
                <span class="text-[10px] sm:text-xs font-medium leading-tight">Hoàn toàn thả lỏng / bình tĩnh</span>
              </div>
            </label>

            <!-- Mức 2: Thả lỏng nhẹ -->
            <label class="cursor-pointer">
              <input type="radio" name="q1_body_reaction" value="2" class="sr-only peer" />
              <div class="flex flex-col items-center justify-between h-full p-2 sm:p-3 rounded-xl border border-pastel-creamBorder bg-white transition-all peer-checked:bg-pastel-blueSoft peer-checked:border-pastel-bluePrimary peer-checked:text-pastel-blueDark hover:border-pastel-blueMedium text-center">
                <span class="text-xs sm:text-sm font-bold w-6 h-6 rounded-full bg-pastel-creamBg flex items-center justify-center mb-1">2</span>
                <span class="text-[10px] sm:text-xs font-medium leading-tight">Khá bình tĩnh</span>
              </div>
            </label>

            <!-- Mức 3: Hơi chú ý nhẹ -->
            <label class="cursor-pointer">
              <input type="radio" name="q1_body_reaction" value="3" class="sr-only peer" />
              <div class="flex flex-col items-center justify-between h-full p-2 sm:p-3 rounded-xl border border-pastel-creamBorder bg-white transition-all peer-checked:bg-pastel-blueSoft peer-checked:border-pastel-bluePrimary peer-checked:text-pastel-blueDark hover:border-pastel-blueMedium text-center">
                <span class="text-xs sm:text-sm font-bold w-6 h-6 rounded-full bg-pastel-creamBg flex items-center justify-center mb-1">3</span>
                <span class="text-[10px] sm:text-xs font-medium leading-tight">Hơi chú ý nhẹ</span>
              </div>
            </label>

            <!-- Mức 4: Hơi hồi hộp -->
            <label class="cursor-pointer">
              <input type="radio" name="q1_body_reaction" value="4" class="sr-only peer" />
              <div class="flex flex-col items-center justify-between h-full p-2 sm:p-3 rounded-xl border border-pastel-creamBorder bg-white transition-all peer-checked:bg-pastel-blueSoft peer-checked:border-pastel-bluePrimary peer-checked:text-pastel-blueDark hover:border-pastel-blueMedium text-center">
                <span class="text-xs sm:text-sm font-bold w-6 h-6 rounded-full bg-pastel-creamBg flex items-center justify-center mb-1">4</span>
                <span class="text-[10px] sm:text-xs font-medium leading-tight">Hơi hồi hộp</span>
              </div>
            </label>

            <!-- Mức 5: Tim đập nhanh / Giật mình / Hồi hộp -->
            <label class="cursor-pointer">
              <input type="radio" name="q1_body_reaction" value="5" class="sr-only peer" />
              <div class="flex flex-col items-center justify-between h-full p-2 sm:p-3 rounded-xl border border-pastel-creamBorder bg-white transition-all peer-checked:bg-pastel-blueSoft peer-checked:border-pastel-bluePrimary peer-checked:text-pastel-blueDark hover:border-pastel-blueMedium text-center">
                <span class="text-xs sm:text-sm font-bold w-6 h-6 rounded-full bg-pastel-creamBg flex items-center justify-center mb-1">5</span>
                <span class="text-[10px] sm:text-xs font-medium leading-tight">Tim đập nhanh / Giật mình</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Câu 2: Thang đo NRS-->
        <div class="space-y-3 p-4 bg-white rounded-2xl border border-pastel-creamBorder">
          <!-- Tiêu đề câu hỏi -->
          <div>
            <h3 class="font-semibold text-sm sm:text-base text-pastel-textDark">
            2. Trên thang điểm từ 0 đến 10, ngay khoảnh khắc nhìn thấy danh sách các bệnh gợi ý, bạn cảm thấy lo lắng / hoảng sợ ở mức độ nào?
            </h3>
          </div>

          <!-- Khung hiển thị con số đang chọn -->
          <div class="flex items-center justify-between pt-2">
            <span class="text-xs font-medium text-pastel-textMuted">Mức độ chọn:</span>
            <span class="text-lg font-bold text-pastel-bluePrimary bg-pastel-blueSoft px-3 py-1 rounded-full border border-pastel-blueMedium">
            <span id="q2_val">5</span> / 10
            </span>
          </div>

          <!-- Thanh trượt Slider -->
          <div class="space-y-2">
            <input 
            type="range" 
            name="q2_anxiety_level" 
            min="0" 
            max="10" 
            value="5" 
            step="1"
            class="w-full h-2 bg-pastel-creamDark rounded-lg appearance-none cursor-pointer accent-pastel-bluePrimary"
            oninput="document.getElementById('q2_val').innerText = this.value"
            required 
            />

            <!-- Nhãn 2 đầu 0 và 10 -->
            <div class="flex justify-between text-[11px] sm:text-xs text-pastel-textMuted font-medium pt-1">
                <span class="w-1/2 text-left pr-2">0: Hoàn toàn bình tĩnh / không lo lắng</span>
                <span class="w-1/2 text-right pl-2">10: Cực kỳ hoảng sợ / căng thẳng tột độ</span>
            </div>
          </div>
        </div>

        <!--Phần II: Mức độ lo âu hiện tại-->
        <h3 class="block text-base sm:text-lg font-bold text-pastel-textDark">PHẦN II: MỨC ĐỘ LO ÂU HIỆN TẠI</h3>
        <div class="stais-questions-list border border-pastel-creamBorder rounded-2xl p-4 bg-pastel-creamCard shadow-sm"></div>

        <!--Phần III: Đánh giá nd và UI-->
        <h3 class="block text-base sm:text-lg font-bold text-pastel-textDark">PHẦN III: ĐÁNH GIÁ NỘI DUNG VÀ UI</h3>
        <div class="ND_UI_questions_list border border-pastel-creamBorder rounded-2xl p-4 bg-white shadow-sm"></div>

      </div>
    </div>
  `;
}

// ==========================================
// 1. ĐỌC PHẦN TỬ 'variant' TỪ URL (?variant=A hoặc ?variant=B)
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('variant')?.toUpperCase();

// Nếu URL có ?variant=B hoặc ?variant=BA -> lấy 'B', ngược lại mặc định lấy 'A'
const currentVariant = (paramValue === 'B' || paramValue === 'BA') ? 'B' : 'A';

// ==========================================
// 2. RENDER VÀO KHUNG KHẢO SÁT
// ==========================================
const containers = document.querySelectorAll('.each-web-form');

containers.forEach((container, index) => {
  // Khung 1 (index 0): Lấy theo currentVariant ('A' hoặc 'B')
  // Khung 2 (index 1): Tự động lấy chữ ngược lại
  let variantForThisBox;
  if (index === 0) {
    variantForThisBox = currentVariant;
  } else {
    variantForThisBox = (currentVariant === 'A') ? 'B' : 'A';
  }

  // Gọi hàm generateEachWeb_Test với biến đã được đảo ngược cho khung 2
  container.innerHTML = generateEachWeb_Test(variantForThisBox);
});

function renderCompareQuestions() {
  const containers = document.querySelectorAll('.compare-questions-list');
  if (!containers.length) return;

  containers.forEach((container, containerIndex) => {
    const questionsHTML = compareSurveyData.questions.map((q) => {
      const radioName = `${q.name}_${containerIndex}`;

      const optionsHTML = compareSurveyData.options.map(opt => `
        <label class="cursor-pointer">
          <input type="radio" name="${radioName}" value="${opt.value}" class="sr-only peer" required />
          <div class="flex flex-col items-center justify-between h-full p-2 sm:p-3 rounded-xl border border-pastel-creamBorder bg-white transition-all text-center ${opt.colorClass}">
            <span class="text-xs sm:text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center mb-1">
              ${opt.value}
            </span>
            <span class="text-[10px] sm:text-xs font-medium leading-tight">
              ${opt.label}
            </span>
          </div>
        </label>
      `).join('');

      return `
        <div class="space-y-3">
          <label class="block text-sm sm:text-base font-semibold text-pastel-textDark">
            ${q.title}
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-1.5 sm:gap-3">
            ${optionsHTML}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = questionsHTML;
  });
}


/* 1. Application State Variable - Mở rộng cho 8 bước */
const TOTAL_STEPS = 8; // Tổng số trang khảo sát

const surveyData = {
    currentStep: 1,
};

let timerInterval = null;

/**
 * Chuyển trang khảo sát (Tự động rẽ nhánh sang Step 8A / 8B từ Step 7)
 * @param {number|string} targetStep Step muốn chuyển tới (1..7, 8, '8A', '8B')
 */
function goToStep(targetStep) {
    // --- 1. RÀO CHẮN & RẼ NHÁNH TẠI STEP 7 ---
    if (surveyData.currentStep === 7) {
        const selectedStatus = document.querySelector('input[name="current_status"]:checked');

        // Bắt buộc chọn Option A hoặc B mới cho qua
        if (!selectedStatus) {
            alert('Vui lòng chọn hình thức tham gia trước khi tiếp tục!');
            return; // Dừng lại, không cho chuyển trang
        }

        // Lưu lựa chọn vào surveyData
        surveyData.current_status = selectedStatus.value;

        // Tự động chuyển 8 thành 8A hoặc 8B tùy vào option chọn
        if (targetStep === 8 || targetStep === '8') {
            targetStep = surveyData.current_status === 'direct' ? '8A' : '8B';
        }
    }

    // --- 2. ẨN TẤT CẢ CÁC STEP (Bao gồm 8A và 8B) ---
    const allStepIds = [1, 2, 3, 4, 5, 6, 7, '8A', '8B'];
    
    allStepIds.forEach(id => {
        const stepEl = document.getElementById(`step${id}`);
        if (stepEl) stepEl.classList.add('hidden');
    });

    // --- 3. CẬP NHẬT TRẠNG THÁI & HIỂN THỊ STEP MỚI ---
    surveyData.currentStep = targetStep;

    const currentStepEl = document.getElementById(`step${targetStep}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('hidden');
    }

    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

renderSTAIS_Questions();
renderND_UI_Questions();
renderCompareQuestions();
