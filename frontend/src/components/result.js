// ==========================================
// 1. ÁNH XẠ TRIỆU CHỨNG & CƠ SỞ DỮ LIỆU BỆNH
// ==========================================
// 1. Bảng ánh xạ từ chuỗi UI sang ID chuẩn
const TEXT_TO_VALUE_ID = {
  'nhẹ': 'MILD',
  'trung bình': 'MODERATE',
  'cao': 'SEVERE',
  'có': 'REDUCED',
  'không': 'NO_REDUCTION',
  'chưa dùng/không rõ': 'UNKNOWN',
  'chậm bất thường': 'SLOW_HR',
  'bình thường': 'NORMAL',
  'nhanh bất thường': 'FAST_HR',
  'vã mồ hôi': 'SWEATING',
  'rét run': 'SHIVERING',
  'co giật/cứng cổ': 'CONVULSION',
  'liên tục': 'CONTINUOUS_FEVER',
  'theo cơn': 'EPISODIC_FEVER',
  'từng đợt': 'PERIODIC_FEVER'
};

// 2. Hàm map từ chữ tiếng Việt sang Mã Key
function mapToValueId(str) {
  if (!str || typeof str !== 'string') return null;
  const clean = str.trim().toLowerCase();

  if (TEXT_TO_VALUE_ID[clean]) return TEXT_TO_VALUE_ID[clean];

  const validIds = [
    'MILD', 'MODERATE', 'SEVERE', 'NO_REDUCTION', 'REDUCED', 'UNKNOWN', 
    'SLOW_HR', 'NORMAL', 'FAST_HR', 'SHIVERING', 'SWEATING', 'HEADACHE', 
    'CONVULSION', 'CONTINUOUS_FEVER', 'EPISODIC_FEVER', 'PERIODIC_FEVER'
  ];
  if (validIds.includes(str.trim())) return str.trim();

  if (clean.includes('nhẹ')) return 'MILD';
  if (clean.includes('trung bình')) return 'MODERATE';
  if (clean.includes('cao')) return 'SEVERE';

  if (clean === 'có' || clean.includes('có hạ')) return 'REDUCED';
  if (clean === 'không' || clean.includes('không hạ')) return 'NO_REDUCTION';

  if (clean.includes('vã mồ hôi')) return 'SWEATING';
  if (clean.includes('rét run')) return 'SHIVERING';
  if (clean.includes('đau đầu dữ dội')) return 'HEADACHE';
  if (clean.includes('co giật/cứng cổ')) return 'CONVULSION';

  // Lọc nhịp tim
  if (clean.includes('chậm bất thường')) return 'SLOW_HR';
  if (clean.includes('bình thường')) return 'NORMAL';
  if (clean.includes('nhanh bất thường')) return 'FAST_HR';

  // Lọc tần suất sốt
  if (clean.includes('liên tục')) return 'CONTINUOUS_FEVER';
  if (clean.includes('theo cơn')) return 'EPISODIC_FEVER';
  if (clean.includes('từng đợt')) return 'PERIODIC_FEVER';

  return null;
}

// Cơ sở dữ liệu Bệnh dùng cho Chẩn đoán (Trọng số & Mức độ nguy hiểm)
const DISEASES_DB = [
  {
    "disease_id": "COMMON_FEVER",
    "name": "Sốt thường",
    "risk_level": "THEO DÕI",
    "background_color": "#84C5E4",
    "weights": { "MILD": 40, "CONTINUOUS_FEVER":30, "REDUCED": 30 }
  },
  {
    "disease_id": "HYPERTHERMIA",
    "name": "Sốc nhiệt",
    "risk_level": "CẤP CỨU",
    "background_color": "#E4B184",
    "weights": { "MODERATE": 40, "NO_REDUCTION": 60 }
  },
  {
    "disease_id": "INFECTIOUS_FEVER",
    "name": "Sốt nhiễm khuẩn",
    "risk_level": "NGHIÊM TRỌNG",
    "background_color": "#F0DCB1",
    "weights": { "MILD": 25, "SHIVERING": 30, "SWEATING": 25, "REDUCED": 20, "FAST_HR": 20 }
  },
  {
    "disease_id": "MALARIA",
    "name": "Sốt rét",
    "risk_level": "NGHIÊM TRỌNG",
    "background_color": "#F0DCB1",
    "weights": { "MODERATE": 40, "EPISODIC_FEVER": 60, "HEADACHE": 15 }
  },
  {
    "disease_id": "HODGKIN",
    "name": "Hodgkin / Lymphoma",
    "risk_level": "NGHIÊM TRỌNG",
    "background_color": "#F0DCB1",
    "weights": { "MODERATE": 30, "PERIODIC_FEVER": 70 }
  },
  {
    "disease_id": "HYPERPYREXIA",
    "name": "Sốt cực cao (CNS)",
    "risk_level": "CẤP CỨU",
    "background_color": "#E4B184",
    "weights": { "SEVERE": 100, "CONVULSION": 60 }
  },
  {
    "disease_id": "TYPHOID",
    "name": "Thương hàn",
    "risk_level": "NGHIÊM TRỌNG",
    "background_color": "#F0DCB1",
    "weights": { "MODERATE": 40, "SLOW_HR": 60, "HEADACHE": 15 }
  },
  {
    "disease_id": "MENINGITIS",
    "name": "Viêm màng não",
    "risk_level": "CẤP CỨU",
    "background_color": "#E4B184",
    "weights": { "MODERATE": 40, "HEADACHE": 20, "CONVULSION": 60 }
  },
  {
    "disease_id": "FLU",
    "name": "Sốt siêu vi",
    "risk_level": "THEO DÕI",
    "background_color": "#84C5E4",
    "weights": { "MODERATE": 40, "REDUCED": 20, "SHIVERING": 40, "FAST_HR": 20 }
  }
];

// Từ điển Nội dung hiển thị chi tiết UI cho từng Bệnh
const DISEASES_FULL_INFO = {
  "COMMON_FEVER": {
    advice: "Hôm nay mình cứ thông thả đi nhé!",
    description: "Sốt thường là tình trạng tăng nhiệt độ tạm thời của cơ thể. Bạn đừng quá lo lắng nhé, đây là một cơ chế miễn dịch tự nhiên - dấu hiệu cho thấy hệ thống phòng thủ-hệ miễn dịch của bạn đang làm việc chăm chỉ để chống lại mầm bệnh đấy!<br><span class=\"font-bold\">Sốt không phải là một căn bệnh: </span> Nó chỉ là triệu chứng báo hiệu cơ thểSự thật là sốt không phải là bệnh, mà là dấu hiệu của cơ thể đang bảo vệ bạn.<br><span class=\"font-bold\">Bác sĩ xem xét nhiều hơn một cơn sốt: </span> Khi “đánh nhau” với các mầm bệnh, biểu hiện của cơ thể có thể bao gồm sốt và các dấu hiệu khác như ho, cảm, sụt sịt, đau mỏi người. Do đó, các bác sĩ sẽ chú trọng đến toàn bộ các triệu chứng đi kèm thay vì chỉ xét một mình cơn sốt đấy nha!",
    symptoms: ["Nhiệt độ cơ thể dao động từ 37,5 - 38 độ C ~ sốt nhẹ. (Nhiệt độ cơ thể thường của người là 36.5 - 37.5 độ C)", "Toát mồ hôi, dễ khát nước", "Cơ thể mệt mỏi, uể oải",],
    remedies: ["Nằm nghỉ ngơi ở nơi thoáng mát", "Uống nhiều nước (ấm) , theo từng ngụm (tầm 15-20 phút/ngụm).", "Mặc quần áo thoải mái.", "Uống thuốc hạ sốt."],
    monitoring: ["Nếu thuốc hạ sốt không giảm, bạn nên báo với người lớn hoặc đi thăm khám càng sớm càng tốt nhé",
                  `Theo dõi cơn sốt của bạn. Sau đây là một số câu hỏi gợi ý:
                  <ul class="pl-4 mt-1 space-y-1">
                    <li>+ Khoảng thời gian bị sốt</li>
                    <li>+ Các biểu hiện khác của cơ thể: ho, mệt mỏi, đau đầu,...?</li>
                    <li>+ Các hiện tượng lạ: buồn nôn, phát ban,...</li>
                  </ul>`
                ],
    source: [
            `<article>
              <a href="https://www.vinmec.com/vie/bai-viet/phan-biet-sot-thuong-sot-virus-va-sot-xuat-huyet-vi " target="_blank" rel="noopener noreferrer" class="italic underline">
                Phân biệt sốt thường, sốt virus và sốt xuất huyết - Vinmec
              </a>
            </article>`,
            `<article>
              <a href="https://www.mayoclinic.org/diseases-conditions/fever/symptoms-causes/syc-20352759" target="_blank" rel="noopener noreferrer" class="italic underline">
                Fever: Symptoms and causes - Mayo Clinic
              </a>
            </article>`
          ]

  },
  "HYPERTHERMIA": {
    advice: "Để ý kỹ đến trường hợp này nha.",
    description: "Sốc nhiệt là tình trạng cấp cứu nguy hiểm do cơ thể bị quá nhiệt khi hoạt động ngoài trời nắng nóng hoặc môi trường nhiệt độ quá cao.",
    symptoms: ["Thân nhiệt tăng cực cao (>40°C)", "Da đỏ, nóng và khô", "Chóng mặt, buồn nôn, đau đầu dữ dội", "Thở nhanh, tim đập nhanh"],
    nextStepDescription: "Sơ cứu tức thì trong lúc chờ xe cấp cứu hoặc di chuyển tới bệnh viện.",
    remedies: ["Di chuyển ngay nạn nhân vào nơi bóng râm hoặc phòng máy lạnh.", "Nới lỏng quần áo, lau toàn thân bằng nước mát.", "Quạt mát liên tục."],
    monitoring: ["Gọi ngay 115 hoặc xe cấp cứu gấp.", "Theo dõi sát nhịp thở và mức độ nhận thức."],
    source: [
            `<article>
              <a href="https://medlatec.vn/tin-tuc/dau-hieu-sot-sieu-vi-la-gi-cach-dieu-tri-va-phong-ngua-sot-sieu-vi-s64-n32492" target="_blank" rel="noopener noreferrer" class="italic underline">
                Dấu hiệu sốt siêu vi là gì? Cách điều trị và phòng ngừa sốt siêu vi - MEDLATEC
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/benh/sot-sieu-vi-2974" target="_blank" rel="noopener noreferrer" class="italic underline">
                Sốt siêu vi: Nguyên nhân, triệu chứng, chẩn đoán và điều trị - Vinmec
              </a>
            </article>`
          ]

  },
  "INFECTIOUS_FEVER": {
    advice: "Hôm nay mình cứ thong thả đi nhé",
    description: "Sốt nhiễm khuẩn (Bacterial fever) là tình trạng thân nhiệt cơ thể tăng lên để chống chọi các vi khuẩn lạ. Như đúng cái tên của nó, tác nhân chính của loại sốt này chính là các vi khuẩn. Sốt nhiễm khuẩn có thể dễ bị nhầm lẫn với Sốt siêu vi vì các triệu chứng của chúng khá là giống nhau, nhưng cách chữa rất khác nhau - nên tốt nhất là bạn theo dõi cơn sốt và gặp bác sĩ để được thăm khám nhé. ",
    symptoms: ["Cơn sốt có thể nhanh chóng trở nên nặng hơn", "Rét run", "Đau đầu, chóng mặt", "Có thể đau nhức ở một số chỗ trên cơ thể như họng, tai, bụng,... và một vài triệu chứng khác không giảm dần theo thời gian"],
    remedies: ["<span class=\"font-bold\">Uống thuốc kháng sinh:</span>  Thật vậy, uống thuốc kháng sinh dường như là 1 biện pháp có thể tắt đi cơn sốt nhiễm khuẩn.", "<span class=\"font-bold\">Tiếp sức cho cơ thể:</span> Bạn cũng nên nghỉ ngơi, uống nước đều đặn để cơ thể có năng lượng chống chọi vi khuẩn tiếp nè."],
    monitoring: ["Thuốc kháng sinh là thứ duy nhất có thể chống lại sốt nhiễm khuẩn. Vì thế, bạn nhớ theo dõi và xem xét cơn sốt đó bắt nguồn từ đâu nhé. Mình có thể gặp bác sĩ để việc xác định nguồn gốc cơn sốt dễ dàng hơn nè. Cũng như đừng quên đi thăm khám khi bạn uống thuốc hoài không qua khỏi nhé."],
    source: [
            `<article>
              <a href="https://nhathuoclongchau.com.vn/bai-viet/sot-nhiem-khuan-o-nguoi-lon-nguyen-nhan-trieu-chung-va-cach-dieu-tri.html" target="_blank" rel="noopener noreferrer" class="italic underline">
                Sốt nhiễm khuẩn ở người lớn: Nguyên nhân, triệu chứng và cách điều trị
              </a>
            </article>`,
            `<article>
              <a href="https://apollodiagnostics.in/blogs/spot-the-difference-understanding-viral-and-bacterial-fever" target="_blank" rel="noopener noreferrer" class="italic underline">
                Spot the Difference: Understanding Viral & Bacterial Fever
              </a>
            </article>`
          ]
  },
  "MALARIA": {
    advice: "Để ý kỹ đến trường hợp này nha.",
    description: "Sốt rét là một bệnh truyền nhiễm nghiêm trọng gây ra bởi muỗi ở nhiều nơi trên thế giới. Nhưng đừng quá lo lắng, sốt rét là bệnh đã có thuốc điều trị đặc trị và có thể chữa khỏi hoàn toàn nếu phát hiện kịp thời. Sốt rét giai đoạn đầu rất dễ nhầm với cảm cúm. Nếu bạn từng đi đến vùng có nhiều muỗi/dịch sốt rét trong vài tuần qua và có các triệu chứng này, hãy đi khám sớm nhé! ",
    symptoms: ["Các triệu chứng thường xuất hiện từ 7-18 ngày sau khi bị muỗi cắn (đôi khi lâu hơn). Bệnh thường bắt đầu với các biểu hiện giống như cảm cúm.", "Sốt theo cơn: sốt cao đột ngột, có cảm giác rét run", "Mệt mỏi toàn thân: đau đầu, chóng mặt, đau nhức cơ", "Tiêu hóa: buồn nôn hoặc chán ăn"],
    remedies: ["<span class=\"font-bold\">Đi khám bác sĩ:</span> Bạn nên đến ngay cơ sở y tế gần nhất để thực hiện xét nghiệm máu đơn giản. Đây là cách nhanh chóng và chính xác nhất để bác sĩ kiểm tra cho bạn. (Đừng quên báo cho bác sĩ biết nếu bạn vừa đi du lịch hay đi rừng về nhé!)", "<span class=\"font-bold\">Không tự ý dùng thuốc: </span> Tránh tự mua thuốc điều trị tại nhà. Việc dùng đúng thuốc và đúng liều dưới sự hướng dẫn của bác sĩ sẽ giúp chữa dứt điểm và ngăn bệnh tái phát đấy.</span>"],
    monitoring: ["<span class=\"font-bold\">Tránh muỗi đốt:</span> Ngủ màn/mùng, mặc quần, áo dài tay, dùng kem/xịt chống muỗi an toàn.", "<span class=\"font-bold\">Giữ không gian sạch, thoáng:</span> Phát quang bụi rậm, dọn dẹp các vùng nước đọng quanh nhà để hạn chế muỗi sinh sản.", "<span class=\"font-bold\">Chuẩn bị khi đi xa:</span> Trước khi đi du lịch, nếu sắp đến vùng có nguy cơ sốt rét (<a target=\"blank\" href=\"https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country\"><u>Thông tin phòng ngừa bệnh sốt rét theo từng quốc gia</u></a>), bạn nên tham vấn bác sĩ trước để được kê đơn thuốc phòng ngừa nhé."],
    source: [
            `<article>
              <a href="https://www.vinmec.com/vie/bai-viet/huong-dan-xu-tri-khi-bi-benh-sot-ret-vi" target="_blank" rel="noopener noreferrer" class="italic underline">
                Hướng dẫn xử trí khi bị bệnh sốt rét - Vinmec
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/benh/sot-ret-4443" target="_blank" rel="noopener noreferrer" class="italic underline">
                Bệnh Sốt rét: Nguyên nhân, triệu chứng, chẩn đoán và điều trị - Vinmec
              </a>
            </article>`,
            `<article>
              <a href="https://www.nhs.uk/conditions/malaria/" target="_blank" rel="noopener noreferrer" class="italic underline">
                Malaria Overview - NHS
              </a>
            </article>`,
            `<article>
              <a href="https://www.mayoclinic.org/diseases-conditions/malaria/symptoms-causes/syc-20351184" target="_blank" rel="noopener noreferrer" class="italic underline">
                Malaria: Symptoms & Causes - Mayo Clinic
              </a>
            </article>`,
            `<article>
              <a href="https://www.cdc.gov/malaria/prevention/index.html" target="_blank" rel="noopener noreferrer" class="italic underline">
                Malaria Prevention - CDC
              </a>
            </article>`,
            `<article>
              <a href="https://stanfordhealthcare.org/medical-conditions/primary-care/malaria/treatments/prevention.html" target="_blank" rel="noopener noreferrer" class="italic underline">
                Malaria Prevention - Stanford Health Care
              </a>
            </article>`,
            `<article>
              <a href="https://www.nhs.uk/conditions/jaundice/" target="_blank" rel="noopener noreferrer" class="italic underline">
                Jaundice Overview - NHS
              </a>
            </article>`
          ]
  },
  "HODGKIN": {
    advice: "Để ý kỹ đến trường hợp này nha.",
    description: "Bệnh Hodgkin (cổ điển) là một dạng bệnh liên quan đến hệ bạch huyết - hệ thống chịu trách nhiệm bảo vệ cơ thể khỏi các mầm bệnh.<br> Nghe tên có thể hơi đáng sợ, nhưng bạn hãy yên tâm nhé: đây là một trong những bệnh lý hệ bạch huyết <span class=\"font-bold\">có tỷ lệ điều trị thành công cao nhất hiện nay</span>, đặc biệt khi được phát hiện sớm.<br> Nổi hạch cũng có thể là phản ứng rất bình thường của cơ thể khi bạn bị cảm sốt hay viêm họng thông thường, nên đừng quá vội lo lắng nhé!<br> Nếu hạch kéo dài hơn 2 đến 4 tuần, thay đổi kích cỡ kèm thêm các triệu chứng khác, bạn nên đến gặp bác sĩ nhé.",
    symptoms: ["Nổi hạch: cảm giác có khối sưng dưới da (thường xuất hiện ở vùng xung quanh cổ, nách hoặc bẹn)", "Triệu chứng toàn thân: sốt kéo dài, mệt mỏi, ngứa da.", "Giảm cân không rõ nguyên do."],
    remedies: ["<span class=\"font-bold\">Đi khám bác sĩ:</span> Đi thăm khám hoặc báo ngay với người lớn để được kiểm tra chu đáo.", "<span class=\"font-bold\">Giữ một tâm lý thoải mái:</span> Thăm khám sớm chỉ đơn giản là cách tốt nhất để bạn giải tỏa lo lắng và chăm sóc bản thân."],
    monitoring: ["Ăn uống lành mạnh và ngủ đủ giấc", "Duy trì cân nặng hợp lí: tập thể dục giúp cơ thể hoạt động mỗi ngày", "Hạn chế hút thuốc và rượu bia", "Khám sức khỏe định kỳ để phát hiện sớm các bất thường"],
    source: [
            `<article>
              <a href="https://www.mayoclinic.org/diseases-conditions/hodgkins-lymphoma/diagnosis-treatment/drc-20352650" target="_blank" rel="noopener noreferrer" class="italic underline">
                Hodgkin's Lymphoma: Diagnosis & Treatment - Mayo Clinic
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/bai-viet/hodgkin-lymphoma-benh-hodgkin-la-gi-vi" target="_blank" rel="noopener noreferrer" class="italic underline">
                Hodgkin Lymphoma (Bệnh Hodgkin) là gì? - Vinmec
              </a>
            </article>`,
            `<article>
              <a href="https://www.health.harvard.edu/cancer/hodgkin-lymphoma-a-to-z" target="_blank" rel="noopener noreferrer" class="italic underline">
                Hodgkin Lymphoma A to Z - Harvard Health
              </a>
            </article>`,
            `<article>
              <a href="https://www.cancerresearchuk.org/about-cancer/hodgkin-lymphoma/risks-causes" target="_blank" rel="noopener noreferrer" class="italic underline">
                Hodgkin Lymphoma: Risks and Causes - Cancer Research UK
              </a>
            </article>`,
            `<article>
              <a href="https://www.cancerresearchuk.org/about-cancer/causes-of-cancer" target="_blank" rel="noopener noreferrer" class="italic underline">
                Causes of Cancer - Cancer Research UK
              </a>
            </article>`
          ]
  },
  "HYPERPYREXIA": {
    advice: "CẤP CỨU: Sốt cực cao nguy cơ ảnh hưởng thần kinh",
    description: "Tình trạng thân nhiệt tăng cực cao tác động trực tiếp tới trung khu thần kinh trung ương.",
    symptoms: ["Sốt rất cao (>40-41°C)", "Co giật, cứng cổ", "Lơ mơ, mê sảng"],
    nextStepDescription: "Đưa bệnh nhân đến phòng cấp cứu gần nhất ngay lập tức.",
    remedies: ["Chườm mát toàn thân bằng nước ấm nhẹ.", "Cởi bỏ bớt quần áo."],
    monitoring: ["Giữ đường thở thông thoáng nếu có co giật.", "Gọi 115 ngay lập tức."],
    source: [
            `<article>
              <a href="https://medlatec.vn/tin-tuc/dau-hieu-sot-sieu-vi-la-gi-cach-dieu-tri-va-phong-ngua-sot-sieu-vi-s64-n32492" target="_blank" rel="noopener noreferrer" class="italic underline">
                Dấu hiệu sốt siêu vi là gì? Cách điều trị và phòng ngừa sốt siêu vi - MEDLATEC
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/benh/sot-sieu-vi-2974" target="_blank" rel="noopener noreferrer" class="italic underline">
                Sốt siêu vi: Nguyên nhân, triệu chứng, chẩn đoán và điều trị - Vinmec
              </a>
            </article>`
          ]
  },
  "TYPHOID": {
    advice: "Nghi ngờ Thương hàn - Cần khám và dùng kháng sinh theo đơn",
    description: "Bệnh nhiễm trùng đường tiêu hóa do vi khuẩn Salmonella typhi gây ra sốt kéo dài và mạch chậm tương đối.",
    symptoms: ["Sốt cao tăng dần", "Nhịp tim chậm bất thường so với mức sốt", "Đau đầu, đau bụng, mệt mỏi"],
    nextStepDescription: "Khám bác sĩ để thực hiện cấy máu/phân và kê đơn kháng sinh.",
    remedies: ["Ăn thức ăn lỏng, chín tới, uống nước đun sôi để nguội.", "Cách ly đồ dùng cá nhân."],
    monitoring: ["Theo dõi các dấu hiệu xuất huyết tiêu hóa (đi ngoài phân đen)."],
    source: [
            `<article>
              <a href="https://medlatec.vn/tin-tuc/dau-hieu-sot-sieu-vi-la-gi-cach-dieu-tri-va-phong-ngua-sot-sieu-vi-s64-n32492" target="_blank" rel="noopener noreferrer" class="italic underline">
                Dấu hiệu sốt siêu vi là gì? Cách điều trị và phòng ngừa sốt siêu vi - MEDLATEC
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/benh/sot-sieu-vi-2974" target="_blank" rel="noopener noreferrer" class="italic underline">
                Sốt siêu vi: Nguyên nhân, triệu chứng, chẩn đoán và điều trị - Vinmec
              </a>
            </article>`
          ]
  },
  "MENINGITIS": {
    advice: "Cơ thể bạn cần được quan tâm đặc biệt hơn",
    description: "Bạn có thể hiểu đơn giản là khi lớp bảo vệ/ màng bọc xung quanh não bộ của mình bị tấn công bởi vi rút, vi khuẩn, ký sinh trùng, nấm  hoặc khi bị chấn thương.<br>Bệnh lý này cần được can thiệp sớm, nếu nhận thấy các dấu hiệu bên dưới, bạn hãy giữ bình tĩnh và đến cơ sở ý tế ngay lập tức.",
    symptoms: [
                "Sốt",
                "Cứng cổ (khó gập cằm vào ngực)",
                "Đau đầu dữ dội, kèm nôn mửa",
                "Một số dấu hiệu liên quan đến não bao gồm: lơ mơ, lú lẫn, khó tập trung,..",
                "Nhạy cảm với ánh sáng: cảm thấy chói mắt, khó chịu khi nhìn vào ánh sáng"
              ],
    remedies: [
                "<span class=\"font-bold\">Đi khám bác sĩ:</span> Đi thăm khám hoặc báo ngay với người lớn để được kiểm tra chu đáo.",
                "<span class=\"font-bold\">Bình tĩnh xử lý:</span> Bạn không nên quá hoảng sợ, nhưng việc đến cơ sở y tế kịp thời là cách tốt nhất và an toàn nhất để bác sĩ bảo vệ sức khỏe cho bạn."
              ],
    monitoring: [
                "Tiêm chủng đầy đủ, đặc biệt là các loại vaccine bạn được bác sĩ quy định từ nhỏ.",
                "Rửa tay thường xuyên, giữ cơ thể và không gian sống sạch sẽ.",
                "Chế biến thực phẩm an toàn: ăn chín, uống sôi, tránh các đồ ăn thức uống có nguy cơ bị mốc, hết hạn sử dụng."
              ],
    source: [
            `<article>
              <a href="https://my.clevelandclinic.org/health/diseases/14600-meningitis" target="_blank" rel="noopener noreferrer" class="italic underline">
                Meningitis: Causes, Symptoms, Types & Treatment - Cleveland Clinic
              </a>
            </article>`,
            `<article>
              <a href="https://www.mayoclinic.org/diseases-conditions/meningitis/symptoms-causes/syc-20350508" target="_blank" rel="noopener noreferrer" class="italic underline">
                Meningitis: Symptoms & Causes - Mayo Clinic
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/bai-viet/viem-mang-nao-o-nguoi-lon-nguyen-nhan-trieu-chung-va-cach-dieu-tri-vi" target="_blank" rel="noopener noreferrer" class="italic underline">
                Viêm màng não ở người lớn: Nguyên nhân, triệu chứng và cách điều trị - Vinmec
              </a>
            </article>`
          ]
  },
  "FLU": {
    advice: "Hôm nay mình cứ thong thả đi nhé",
    description: "Sốt siêu vi nguyên nhân chủ yếu là do các loại virus khác nhau xâm nhập vào cơ thể . Đa phần các trường hợp bị sốt siêu vi đều có thể tự khỏi nhưng cũng có những người bị sốt nghiêm trọng cần điều trị tại bệnh viện.<br>Sốt siêu vi vì có thể dễ bị nhầm lẫn với Sốt nhiễm khuẩn bởi các triệu chứng của chúng khá là giống nhau, nên tốt nhất là bạn theo dõi cơn sốt và gặp bác sĩ để được thăm khám nhé.",
    symptoms: [
                "Toàn thân: Sốt (trên 37,5 độ C), cơ thể mệt mỏi, đau nhức cơ, đau đầu",
                "Buồn nôn, nôn mửa, tiêu chảy, rối loạn tiêu hóa",
                "Rát họng, sưng đỏ họng, sổ mũi, nghẹt mũi, hoặc đỏ mắt",
                "Biểu hiện đi kèm: Nổi hạch vùng cổ hoặc phát ban (thường xảy ra sau triệu chứng sốt.)"
              ],
    remedies: [
                "<span class=\"font-bold\">Đi thăm khám:</span> Hãy đến cơ sở y tế gần nhất để thực hiện xét nghiệm theo yêu cầu. Kết quả xét nghiệm sẽ giúp bác sĩ chẩn đoán chính xác trong thời gian ngắn.",
                "<span class=\"font-bold\">Chăm sóc tại nhà:</span> Nghỉ ngơi nhiều và chườm ấm cơ thể. Tiêu thụ những loại thực phẩm dễ tiêu hóa và giàu dinh dưỡng, bổ sung nước. Mặc quần áo làm từ chất liệu thoáng mát. Sử dụng các thuốc giảm đau, hạ sốt theo hướng dẫn của bác sĩ. Có thể sử dụng các thuốc giảm đau cơ, giảm ho và giảm đau đầu."
              ],
    monitoring: [
                "<span class=\"font-bold\">Vệ sinh và phòng ngừa:</span> Tiêm vaccine đầy đủ (cúm, rubella, sởi, quai bị,...). Rửa tay xà phòng thường xuyên, ăn chín uống sôi. Giữ nhà cửa và nơi làm việc luôn thông thoáng.",
                "<span class=\"font-bold\">Tăng cường sức đề kháng:</span> Chế độ dinh dưỡng cân bằng, vận động thể thao đều đặn và ngủ đủ giấc.",
                "<span class=\"font-bold\">Chủ động trong việc bảo vệ bản thân và cộng đồng:</span> Hạn chế tiếp xúc với người bệnh đang bị sốt siêu vi. Nếu đang bị bệnh: hãy đeo khẩu trang và giữ khoảng cách an toàn với trẻ nhỏ, người già, phụ nữ mang thai và người có bệnh nền nhé."
              ],
    source: [
            `<article>
              <a href="https://medlatec.vn/tin-tuc/dau-hieu-sot-sieu-vi-la-gi-cach-dieu-tri-va-phong-ngua-sot-sieu-vi-s64-n32492" target="_blank" rel="noopener noreferrer" class="italic underline">
                Dấu hiệu sốt siêu vi là gì? Cách điều trị và phòng ngừa sốt siêu vi - MEDLATEC
              </a>
            </article>`,
            `<article>
              <a href="https://www.vinmec.com/vie/benh/sot-sieu-vi-2974" target="_blank" rel="noopener noreferrer" class="italic underline">
                Sốt siêu vi: Nguyên nhân, triệu chứng, chẩn đoán và điều trị - Vinmec
              </a>
            </article>`
          ]
  }
};

// Thứ tự ưu tiên mức độ nguy hiểm để sắp xếp khi bằng điểm %
const RISK_PRIORITY = {
  "CẤP CỨU": 3,
  "NGHIÊM TRỌNG": 2,
  "THEO DÕI": 1
};


// ==========================================
// 2. LOGIC THUẬT TOÁN CHẨN ĐOÁN & XỬ LÝ DỮ LIỆU
// ==========================================

// Hàm phụ: Tự động gom tất cả câu chữ ra khỏi Object/Mảng lồng nhau nhiều tầng
function extractStrings(data) {
  if (!data) return [];
  if (typeof data === 'string') return [data];
  if (Array.isArray(data)) return data.flatMap(extractStrings);
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap(extractStrings);
  }
  return [];
}

// Hàm chính: Đọc từ localStorage và chuyển thành mảng Mã ID chuẩn
function getUserInputsFromStorage() {
  const rawData = localStorage.getItem('userSymptomData');
  if (!rawData) return [];

  let parsedData = [];
  try {
    parsedData = JSON.parse(rawData);
  } catch (e) {
    parsedData = rawData;
  }

  // 1. Rút tất cả các chuỗi chữ ra từ Object lồng nhau (forehead_1, ...)
  const stringList = extractStrings(parsedData);

  // 2. Chuyển từng chữ thành Mã ID tiếng Anh qua hàm mapToValueId
  const mapped = stringList
    .map(item => mapToValueId(item))
    .filter(item => item !== null);

  // 3. Lọc bỏ các mã bị trùng lặp
  return [...new Set(mapped)];
}

// Thuật toán chẩn đoán chính
function diagnose(userInputs, diseasesData) {
  const results = diseasesData.map(disease => {
    let userScore = 0;
    let maxScore = 0;

    // Tính tổng điểm người dùng đạt được và tổng điểm tối đa của bệnh
    for (const [symptomId, weight] of Object.entries(disease.weights)) {
      maxScore += weight;
      if (userInputs.includes(symptomId)) {
        userScore += weight;
      }
    }

    // Phần trăm khớp
    const matchPercentage = maxScore > 0 ? Math.round((userScore / maxScore) * 100) : 0;

    // 1. Phân hạng độ khớp (Match Tiers)
    let matchTier = 'Tương thích thấp';
    if (matchPercentage >= 75) matchTier = 'Tương thích cao';
    else if (matchPercentage >= 50) matchTier = 'Tương thích trung bình';

    // 2. Quy tắc Cảnh báo (Warning Rule)
    const isHighRisk = ['CẤP CỨU', 'NGHIÊM TRỌNG'].includes(disease.risk_level);
    const triggerWarning = isHighRisk && (matchTier === 'Tương thích cao' || matchTier === 'Tương thích trung bình');

    // 3. Quy tắc Hiển thị danh sách trên UI (Display Rules)
    let isVisible = true;
    if (matchTier === 'Tương thích thấp' && disease.risk_level === 'THEO DÕI') {
      isVisible = false; // Ẩn bệnh mức THEO DÕI nhóm Low
    }

    return {
      disease_id: disease.disease_id,
      name: disease.name,
      risk_level: disease.risk_level,
      background_color: disease.background_color,
      match_percentage: matchPercentage,
      match_tier: matchTier,
      trigger_warning: triggerWarning,
      is_visible: isVisible
    };
  });

  // Sắp xếp: Ưu tiên % match giảm dần -> Mức nguy hiểm giảm dần
  return results.sort((a, b) => {
    if (b.match_percentage !== a.match_percentage) {
      return b.match_percentage - a.match_percentage;
    }
    return RISK_PRIORITY[b.risk_level] - RISK_PRIORITY[a.risk_level];
  });
}

// Hàm lấy class with theo match tier
function getBarWidthClass(matchTier) {
  switch (matchTier) {
    case 'Tương thích trung bình':
      return 'lg:w-30 w-19'; 
    case 'Tương thích thấp':
      return 'lg:w-15 w-10'; 
    case 'Tương thích cao':
    default:
      return 'lg:w-50 w-32';
  }
}


// ==========================================
// 3. BIẾN TOÀN CỤC & HÀM RENDER UI
// ==========================================
let selectedDiseaseIndex = 0;
let activeTab = 'whatIsIt'; // Trạng thái tab: 'whatIsIt' hoặc 'nextStep'

function renderDiseaseList(diseases) {
  const container = document.getElementById("diseaseListContainer");
  if (!container) return;

  if (!diseases || diseases.length === 0) {
    container.innerHTML = `<p class="p-4 text-[#253464] font-semibold lg:text-[20px] text-[16px] bg-[#C4DDE9] rounded-2xl">Chúng mình chưa thể đưa ra gợi ý phù hợp dựa trên thông tin hiện tại. Tuy nhiên, những cảm giác bạn đang trải qua đều hoàn toàn có thật và đáng được lắng nghe.</p>`;
    return;
  }

  const htmlContent = diseases.map((disease, index) => {
    const isActive = index === selectedDiseaseIndex;
    

    if (isActive) {
      return `
        <div data-index="${index}" style="background-color:${disease.background_color};" class="disease-card flex flex-col lg:items-start items-center justify-center shrink-0 lg:rounded-2xl rounded-full px-4 lg:py-5 py-2 lg:shadow-[0_4px_4px_#7185B1] shadow-[0_3px_4px_#253464] cursor-pointer transition-all duration-200">
          <span class="text-[#253464] font-semibold lg:text-[25px] text-[22px]">${disease.name}</span>
          <span class="text-[#253464] font-medium text-[16px] lg:block hidden">${disease.advice || ''}</span>
        </div>
      `;
    }

    return `
      <div data-index="${index}" class="disease-card flex flex-col lg:items-start items-center justify-center shrink-0 lg:bg-transparent bg-[#C4DDE9] lg:rounded-none rounded-full px-4 py-2 cursor-pointer transition-all duration-200">
        <span class="text-[#253464] font-semibold lg:text-[20px] lg:pb-2 text-[16px] lg:border-b-4 w-full">${disease.name}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = htmlContent;

  // Gắn sự kiện CLICK cho từng thẻ bệnh
  const cards = container.querySelectorAll('.disease-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      selectedDiseaseIndex = parseInt(card.getAttribute('data-index'), 10);
      activeTab = 'whatIsIt';
      
      renderDiseaseList(diseases);
      renderResult(diseases);
    });
  });
}

function renderResult(diseases) {
  const container = document.getElementById("result-container");
  if (!container) return;

  if (!diseases || diseases.length === 0 || !diseases[selectedDiseaseIndex]) {
    container.innerHTML = `
      <div class="max-h-130 lg:overflow-none overflow-y-auto flex flex-col justify-start items-center lg:gap-4 gap-2">
        <div class="flex flex-col gap-2 w-full">
          <span class="font-semibold lg:text-[25px] text-[20px] text-[#253464]">Kết quả này nghĩa là sao?</span>
          <span class="font-medium lg:text-[18px] text-[15px] text-[#253464]">Điều này không đồng nghĩa với việc bạn không có bệnh hay triệu chứng của bạn không quan trọng. Hệ thống chỉ chưa có đủ thông tin để phân tích chính xác. Vui lòng lưu ý rằng các công cụ tra cứu online chỉ mang tính chất tham khảo và không thể thay thế chẩn đoán từ bác sĩ chuyên khoa.</span>
          <span class="font-medium lg:text-[18px] text-[15px] text-[#253464]">Bạn có thể làm gì tiếp theo:</span>
          <div class="flex flex-row items-center justify-start gap-2">
            <a href="diagnosis.html" class="bg-[#253464] font-medium text-white lg:text-[18px] text-[15px] rounded-full px-4 cursor-pointer w-fit">Bổ sung triệu chứng</a>
            <button class="bg-[#253464] font-medium text-white lg:text-[18px] text-[15px] rounded-full px-4 cursor-pointer w-fit">More articles</button>
          </div>
          <button class="bg-[#253464] font-medium text-white lg:text-[18px] text-[15px] rounded-full px-4 cursor-pointer w-fit">Đi thăm khám trực tiếp</button>
        </div>
        <div class="flex lg:flex-row flex-col items-center justify-between w-full lg:gap-10 gap-5">
          <div class="flex flex-2 flex-col gap-2">
            <span class="font-semibold lg:text-[25px] text-[20px] text-[#253464]">Bạn chưa tìm thấy điều mình cần ở đây?</span>
            <span class="font-medium lg:text-[18px] text-[15px] text-[#253464]">Chúng mình rất muốn lắng nghe thêm trải nghiệm của bạn! Hãy để lại lời nhắn để chúng mình hoàn thiện hơn và không bỏ sót bất kỳ ai nhé.</span>
            <input type="text" placeholder="Nhập chia sẻ của bạn tại đây..." class="w-full rounded-2xl border bg-[#84C5E4] px-4 py-2 text-white placeholder:text-white font-medium lg:text-[16px] text-[14px] focus:outline-none">
          </div>
          <div class="flex-1">
            <img src="../asset/BHJT.png" class="lg:w-60 w-40 lg:h-60 h-40 object-contain rounded-2xl">
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Lấy dữ liệu bệnh đang được chọn
  const disease = diseases[selectedDiseaseIndex];
  const isWhatIsIt = activeTab === 'whatIsIt';
  const widthClass = getBarWidthClass(disease.match_tier);
  const imagePath = `../asset/result-illustration/${disease.disease_id} - ${activeTab}.png`

  let detailContentHtml = '';

  if (isWhatIsIt) {
    const symptomsList = (disease.symptoms || [])
      .map(sym => `<li class="wrap-break-word">${sym}</li>`)
      .join('');

    detailContentHtml = `
      <div class="flex lg:max-h-100 max-h-120 flex-col w-full gap-2 overflow-y-auto">
        <span class="text-[#253464] font-medium lg:text-[16px] text-[14px]">${disease.description || ''}</span>
        
        <div class="flex lg:flex-row flex-col lg:gap-0 gap-2">
          <!-- Text Content -->
          <div class="flex-1 flex flex-col gap-3">
            
            <!-- Symptoms -->
            <div class="w-full flex flex-col items-start">
              <span class="text-[#253464] font-semibold text-[20px]">Các dấu hiệu thường gặp</span>
              <ul class="flex flex-col text-[#253464] font-medium lg:text-[16px] text-[14px] list-disc pl-5">
                ${symptomsList}
              </ul>
            </div>

            <!-- Alert Dropdown -->
            <div class="lg:hidden flex flex-col w-full pb-4">
              <div class="alert-header flex flex-row items-center gap-2 cursor-pointer">
                  <ion-icon name="information-circle" class="text-lg text-[#253464]"></ion-icon>
                  <span class="text-[#253464] font-semibold lg:text-[20px] text-[15px]">How to interpret this match?</span>
                  <ion-icon name="chevron-down-outline" class="toggle-icon lg:text-[20px] text-[18px] text-[#253464]"></ion-icon>
              </div>
              <div class="alert-content max-h-0 overflow-hidden w-full px-2 transition-all duration-200">
                  <span class="text-[#253464] font-medium lg:text-[16px] text-[13px]">Please don't take these matches as absolute certainties. To get the clearest, safest answers, checking in with a doctor is always your best move.</span>
              </div>
            </div>

            <!-- Nguồn -->
            <div class="space-y-1">
              <p class="text-[#253464] font-bold lg:text-[16px] text-[14px]">Nguồn</p>
              <div class="text-[#253464] text-[14px]">
                ${disease.source.join('')}
              </div>
            </div>

          </div>

          <!-- Illustration & Action Button -->
          <div class="flex-1 w-full flex flex-col items-center justify-center lg:gap-4 gap-2 mb-2 shrink-0">
              <img src="${imagePath}" 
                   alt="${disease.name}" 
                   onerror="this.src='../asset/BHJT.png'" 
                   class="lg:w-60 w-40 lg:h-60 h-40 object-contain rounded-2xl">
          </div>
        </div>
      </div> 
    `;
  } else {
    // Giao diện NEXT STEP
    const remediesList = (disease.remedies || [])
      .map(item => `<li class="wrap-break-word">${item}</li>`)
      .join('');

    const monitoringList = (disease.monitoring || [])
      .map(item => `<li class="wrap-break-word">${item}</li>`)
      .join('');

    detailContentHtml = `
      <div class="flex lg:max-h-100 max-h-120 flex-col w-full gap-2 overflow-y-auto">
        <span class="text-[#253464] font-medium lg:text-[16px] text-[14px]">Bạn đã làm rất tốt khi chủ động lắng nghe cơ thể. Việc bạn chủ động tìm hiểu hôm nay là bước đầu tiên để bảo vệ sức khỏe của mình.</span>
        
        <div class="flex lg:flex-row flex-col lg:gap-0 gap-2">
          <!-- Text Content -->
          <div class="flex-1 flex flex-col gap-3">
            
            <!-- Simple home remedies -->
            <div class="w-full flex flex-col items-start">
              <span class="text-[#253464] font-semibold lg:text-[20px] text-[18px]">Bước xử lý an toàn</span>
              <ul class="flex flex-col text-[#253464] font-medium lg:text-[16px] text-[14px] list-disc pl-5">
                ${remediesList}
              </ul>
            </div>

            <!-- Keep a friendly eye on this! -->
            <div class="w-full flex flex-col items-start gap-1">
              <span class="text-[#253464] font-semibold lg:text-[20px] text-[18px]">Những cách bảo vệ bản thân</span>
              <ul class="flex flex-col text-[#253464] font-medium lg:text-[16px] text-[14px] list-disc pl-5">
                ${monitoringList}
              </ul>
            </div>

          </div>

          <!-- Illustration & Action Buttons -->
          <div class="flex-1 w-full flex flex-col items-center justify-center gap-2 mb-2 shrink-0">
              <img src="${disease.nextStepImagePath}" 
                          alt="${disease.name}" 
                          onerror="this.src='../asset/BHJT.png'"
                   class="lg:w-60 w-40 lg:h-60 h-40 object-contain rounded-2xl">
              <button class="bg-[#253464] font-medium text-white lg:text-[18px] text-[15px] rounded-full px-4 cursor-pointer w-fit">Lưu lại</button>
              <button class="bg-[#253464] font-medium text-white lg:text-[18px] text-[15px] rounded-full px-4 cursor-pointer">Tìm các phòng khám gần đây</button>
          </div>
        </div>
      </div> 
    `;
  }

  // Cập nhật HTML tổng thể khung kết quả
  container.innerHTML = `
    <!-- Match status -->
    <div class="flex flex-row w-full items-center justify-end gap-2">
        <div class="${widthClass} lg:h-3.5 h-3 bg-[#C7E9C4] rounded-full"></div>
        <span class="text-[16px] font-semibold">${disease.matchText}</span>
        <ion-icon name="information-circle-outline" class="text-lg"></ion-icon>
    </div>

    <!-- Disease Name -->
    <span class="lg:block hidden font-semibold text-[30px] text-[#253464] text-center">${disease.name}</span>

    <!-- Action Buttons (Tabs) -->
    <div class="flex items-center justify-center w-full lg:gap-12 gap-3 mb-2">
        <button id="btn-what-is-it" style="background-color: ${disease.background_color};" class="text-[#253464] font-semibold text-[16px] text-center rounded-full flex-1 py-1 transition-all ${isWhatIsIt ? 'shadow-[0_4px_4px_#253464] opacity-100' : 'opacity-70'} cursor-pointer">Tổng quan</button>
        <button id="btn-next-step" style="background-color: ${disease.background_color};" class="text-[#253464] font-semibold text-[16px] text-center rounded-full flex-1 py-1 transition-all ${!isWhatIsIt ? 'shadow-[0_4px_4px_#253464] opacity-100' : 'opacity-70'} cursor-pointer">Các bước tiếp theo</button>
    </div>
        
    <!-- Details Container -->
    <div id="detail-content-area">
      ${detailContentHtml}
    </div>
  `;

  // Gán sự kiện cho 2 nút chuyển Tab
  const btnWhatIsIt = document.getElementById("btn-what-is-it");
  const btnNextStep = document.getElementById("btn-next-step");

  if (btnWhatIsIt) {
    btnWhatIsIt.addEventListener("click", () => {
      activeTab = 'whatIsIt';
      renderResult(diseases);
    });
  }

  if (btnNextStep) {
    btnNextStep.addEventListener("click", () => {
      activeTab = 'nextStep';
      renderResult(diseases);
    });
  }

  if (isWhatIsIt) {
    initAccordianAlert();
  }
}

function initAccordianAlert() {
  const headers = document.querySelectorAll('.alert-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = document.querySelector('.alert-content');
      const toggleIcon = document.querySelector('.toggle-icon');

      if (!content || !toggleIcon) return;

      content.classList.toggle('max-h-0');
      content.classList.toggle('max-h-96'); 

      const isOpen = content.classList.contains('max-h-96');
      toggleIcon.name = isOpen ? "chevron-up-outline" : "chevron-down-outline";
    });
  });
}


// ==========================================
// 4. CHẠY CHẨN ĐOÁN & NẠP KẾT QUẢ KHI TẢI TRANG
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Lấy TẤT CẢ triệu chứng từ LocalStorage (Không giới hạn input)
  const userInputs = getUserInputsFromStorage();

  // 2. Chạy thuật toán chẩn đoán
  const rawResults = diagnose(userInputs, DISEASES_DB);

  // 3. Lọc bệnh được hiển thị & Lấy tối đa 5 BỆNH KẾT QUẢ khớp nhất (OUTPUT 5 KẾT QUẢ)
  const finalDiseases = rawResults
    .filter(res => res.is_visible && res.match_percentage > 0)
    .slice(0, 5) // GIỚI HẠN OUTPUT HIỂN THỊ TỐI ĐA 5 BỆNH
    .map(res => {
      const fullInfo = DISEASES_FULL_INFO[res.disease_id] || {};
      const nextStepImagePath = `../asset/nextStep/${res.risk_level}.png`;
      return {
        ...res,
        ...fullInfo,
        nextStepImagePath,
        matchText: `${res.match_tier}`,
        advice: fullInfo.advice || '',
      };
    });

  // 4. Render danh sách bệnh và nội dung chi tiết lên UI
  selectedDiseaseIndex = 0;
  renderDiseaseList(finalDiseases);
  renderResult(finalDiseases);
});

