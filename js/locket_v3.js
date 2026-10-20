// ============================================================
// Locket Remote Config Rewrite (Custom Bản Nâng Cấp Siêu VIP)
// Endpoint: firebaseremoteconfig.googleapis.com
// Dựa trên nền tảng của @duyvinh09 & @akaphuoc28
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
    obj.entries = obj.entries || {};

    // ============================================================
    // XỬ LÝ THỜI GIAN & LOGIC TỰ ĐỘNG (ĐÃ TỐI ƯU)
    // ============================================================
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();
    var date = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    
    // Seed tạo ngẫu nhiên ổn định trong ngày
    var seed = (year * 12 + month) * 31 + date;

    // --- CÁC BIẾN CƠ BẢN ---
    var greetingTime = (hour >= 5 && hour < 11) ? "Chào buổi sáng ☀️" : (hour >= 11 && hour < 14) ? "Chào buổi trưa 🌤️" : (hour >= 14 && hour < 18) ? "Chào buổi chiều 🌇" : (hour >= 18 && hour < 22) ? "Chào buổi tối 🌆" : "Khuya rồi ngủ đi 🌙";
    var greetingDay = (day === 0) ? "Chủ nhật chill nhé 🛋️" : (day === 1) ? "Thứ 2 đầu tuần cố lên 💪" : (day === 6) ? "Thứ 7 vui vẻ nha 🎉" : "Ngày thường nhưng vẫn chất 😎";
    var greetingSeason = (month >= 3 && month <= 5) ? "Mùa xuân ấm áp 🌸" : (month >= 6 && month <= 8) ? "Mùa hè rực rỡ ☀️" : (month >= 9 && month <= 11) ? "Mùa thu lá vàng 🍂" : "Mùa đông lạnh giá ❄️";

    // --- ĐẾM NGƯỢC SỰ KIỆN ---
    var events = [
        { name: "Tết", date: new Date(year + 1, 0, 29), emoji: "🧧" },
        { name: "Valentine", date: new Date(year, 1, 14), emoji: "💝" },
        { name: "8/3", date: new Date(year, 2, 8), emoji: "🌹" },
        { name: "Trung Thu", date: new Date(year, 8, 25), emoji: "🏮" },
        { name: "Noel", date: new Date(year, 11, 25), emoji: "🎄" },
        { name: "Sinh nhật Phước", date: new Date(year, 11, 28), emoji: "🎂" },
        { name: "Năm mới", date: new Date(year + 1, 0, 1), emoji: "🎆" }
    ];
    var eventCountdown = "", minDays = 9999;
    events.forEach(function(ev) {
        var diff = Math.ceil((ev.date - now) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < minDays) { minDays = diff; eventCountdown = ev.emoji + " " + diff + " ngày: " + ev.name; }
    });

    var specialDayCaption = "";
    if (month === 12 && date === 28) specialDayCaption = "🎂 Sinh nhật Phước! 🎉";
    else if (month === 2 && date === 14) specialDayCaption = "💝 Valentine vui vẻ!";
    else if (month === 1 && date === 1) specialDayCaption = "🎆 Năm mới an khang!";
    else if (month === 12 && date === 25) specialDayCaption = "🎄 Giáng sinh an lành!";
    else if (month === 9 && date === 2) specialDayCaption = "🇻🇳 Quốc khánh VN!";
    else if (month === 3 && date === 8) specialDayCaption = "🌹 Quốc tế Phụ nữ!";

    // --- LOGIC ĐỘNG & RANDOM ---
    var luckyNum = (seed * 7) % 100;
    var luckyCaption = "Số may mắn: " + (luckyNum < 10 ? "0" + luckyNum : luckyNum);
    var colors = ["Đỏ 🔴", "Xanh dương 🔵", "Xanh lá 🟢", "Vàng 🟡", "Tím 🟣", "Hồng 🌸", "Trắng ⚪", "Đen ⚫", "Cam 🟠"];
    var luckyColor = "Màu: " + colors[seed % colors.length];
    var items = ["Ví tiền 👛", "Điện thoại 📱", "Tai nghe 🎧", "Gương 🪞", "Nước hoa 🌺", "Kẹo ngọt 🍬", "Móc khóa 🔑", "Sách 📚"];
    var luckyItem = "Vật: " + items[(seed + 2) % items.length];
    var monthTexts = ["Tháng 1 chill 🌸", "Tháng 2 yêu thương 💝", "Tháng 3 rực rỡ 🌷", "Tháng 4 mát mẻ 🌧️", "Tháng 5 bùng nổ 🔥", "Tháng 6 mùa thi 📚", "Tháng 7 du lịch ✈️", "Tháng 8 chữa lành 🌿", "Tháng 9 tựu trường 🎒", "Tháng 10 se lạnh 🍂", "Tháng 11 tri ân 🥰", "Tháng 12 sum vầy 🎄"];
    var monthText = monthTexts[month - 1];
    var hoursArray = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    var hourIndex = Math.floor((hour + 1) % 24 / 2);
    var hoangDaoCaption = "Giờ " + hoursArray[hourIndex] + " (" + (hourIndex * 2) + "h - " + (hourIndex * 2 + 2) + "h)";
    var moods = ["Vui vẻ tích cực 🌞", "Hơi lười biếng 🦥", "Muốn cà khịa xíu 😈", "Cần được yêu thương 🥺", "Bất ổn nhẹ 🫠", "Chill như không có gì 🍃", "Đang cố tỏ ra ngầu 😎", "Thực sự muốn đi ngủ 💤", "Muốn flex nhẹ 💅", "Đang ăn dưa hấu 🍉", "Trầm cảm lâm sàng 🗿", "Năng lượng tích cực 🔋", "Hơi đói bụng 🍜", "Mệt mỏi vì cuộc sống 🥲", "Cảm thấy bản thân hơi bá đạo 🐉", "Mood: Thất tình 🥀", "Đang suy nghĩ về vũ trụ 🌌", "Muốn đi trốn cả thế giới 🏃‍♂️"];
    var moodCaption = "Mood: " + moods[seed % moods.length];
    var daysToWeekend = (day === 0 || day === 6) ? 0 : 6 - day;
    var weekendCaption = daysToWeekend === 0 ? "Cuối tuần tung tóe! 🎉" : "Còn " + daysToWeekend + " ngày đến cuối tuần 🏃";
    var weatherVibes = ["Nắng nhẹ, lòng an yên ☀️", "Mưa rơi, tâm trạng chill 🌧️", "Gió thổi, thả hồn theo mây 🍃", "Âm u, hợp ở nhà ngủ 💤", "Trời trong xanh, vibe tích cực 💙", "Nắng gắt, nhớ bôi kem chống nắng ☀️", "Se lạnh, thích hợp ngủ nướng 🛌", "Mây đen kéo đến, chuẩn bị mưa 🌩️", "Thời tiết đẹp, thích hợp đi chơi 🌈"];
    var weatherCaption = weatherVibes[(seed + 5) % weatherVibes.length];
    var personalities = ["Hướng nội nhưng thích quậy 🤫", "Ngoại giao thiên tài, nội tâm phức tạp 🎭", "Nhạy cảm, tinh tế, dễ thương 🥺", "Lý trí nhưng thích mơ mộng 🧠", "Sôi nổi nhưng cần không gian riêng 🔥", "Sâu sắc, ít nói nhưng thấu hiểu 🗿", "Ngoại lạnh nội nóng 🧊", "Đang trong chế độ sinh tồn 🆘", "Cười nhiều nhưng tâm hồn mong manh 💔", "Thẳng thắn nhưng không ác ý 🎯", "Thích sự yên tĩnh nhưng sợ cô đơn 🌙", "Hoạt ngôn khi ở cạnh người thân 🗣️"];
    var traitCaption = "Tính cách: " + personalities[(seed + 3) % personalities.length];
    var flexFriends = (seed * 3) % 50 + 100;
    var flexCaption = "Flex nhẹ: " + flexFriends + " bạn thân";
    var can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"][year % 10];
    var chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"][year % 12];
    var canChiCaption = "Năm " + can + " " + chi;
    var waterReminder = (hour === 9 || hour === 11 || hour === 14 || hour === 16 || hour === 20) ? "Đến giờ uống nước rồi! 🚰" : "Uống nước đi bạn ơi 💧";
    var zodiacSign = "Bảo Bình";
    if ((month == 1 && date >= 20) || (month == 2 && date <= 18)) zodiacSign = "Bảo Bình";
    else if ((month == 2 && date >= 19) || (month == 3 && date <= 20)) zodiacSign = "Song Ngư";
    else if ((month == 3 && date >= 21) || (month == 4 && date <= 19)) zodiacSign = "Bạch Dương";
    else if ((month == 4 && date >= 20) || (month == 5 && date <= 20)) zodiacSign = "Kim Ngưu";
    else if ((month == 5 && date >= 21) || (month == 6 && date <= 20)) zodiacSign = "Song Tử";
    else if ((month == 6 && date >= 21) || (month == 7 && date <= 22)) zodiacSign = "Cự Giải";
    else if ((month == 7 && date >= 23) || (month == 8 && date <= 22)) zodiacSign = "Sư Tử";
    else if ((month == 8 && date >= 23) || (month == 9 && date <= 22)) zodiacSign = "Xử Nữ";
    else if ((month == 9 && date >= 23) || (month == 10 && date <= 22)) zodiacSign = "Thiên Bình";
    else if ((month == 10 && date >= 23) || (month == 11 && date <= 21)) zodiacSign = "Bọ Cạp";
    else if ((month == 11 && date >= 22) || (month == 12 && date <= 21)) zodiacSign = "Nhân Mã";
    else zodiacSign = "Ma Kết";
    var zodiacCaption = "Cung: " + zodiacSign + " ✨";
    var score = (8 + ((seed) % 21) / 10).toFixed(1);
    var comments = ["Quá xuất sắc ✨", "Đẹp trai nhưng hơi khó gần 😎", "Xinh gái có tâm 💅", "Visual đỉnh cao 👑", "Toả sáng rực rỡ 🌟", "Góc này hơi cháy 🔥", "Đẹp nghiêng nước nghiêng thùng 🌊", "Visual áp đảo 💯"];
    var beautyCaption = "AI chấm: " + score + "/10";
    var singleWarnings = ["Hệ thống báo: Bạn vẫn chưa có người yêu 🚨", "Cảnh báo: Lễ tình nhân đang đến gần 💔", "Trạng thái: FA lâu năm, cần người dỗ 🥺", "Đã kích hoạt chế độ tự yêu bản thân 🪞", "Lỗi 404: Không tìm thấy người yêu ⚠️", "Nhắc nhở: Đừng quên thả thính hôm nay 💌", "Báo cáo: Độc thân vui vẻ, không lo nghĩ 🎉", "Cảnh báo: Hôm nay có thể bị sát muối 🧂"];
    var singleCaption = singleWarnings[(seed + 7) % singleWarnings.length];
    var budgets = ["50.000đ", "100.000đ", "0đ", "200.000đ", "5.000đ", "1.000.000đ", "Hết sạch 💸", "Âm tiền 📉"];
    var budgetLeft = budgets[(seed + 1) % budgets.length];
    var budgetCaption = "Ngân sách: " + budgetLeft + (budgetLeft === "0đ" ? " - Ăn mì tôm 🍜" : " - Vẫn ổn 🥲");
    var tarots = [
        { card: "The Sun", msg: "Ngày rực rỡ ☀️" }, { card: "The Moon", msg: "Cẩn thận lừa dối 🌙" }, { card: "The Star", msg: "Hy vọng chữa lành 🌟" }, { card: "The Fool", msg: "Bắt đầu hành trình mới 🃏" }, { card: "The Lovers", msg: "Tình duyên thăng hoa 💕" }, { card: "The Magician", msg: "Vạn sự như ý 🪄" }, { card: "The High Priestess", msg: "Tin vào trực giác 🔮" }, { card: "The Empress", msg: "Thịnh vượng 🌺" }, { card: "The Emperor", msg: "Kỷ luật bản thân 👑" }, { card: "The Hierophant", msg: "Học hỏi từ tiền bối 📜" }, { card: "The Chariot", msg: "Tiến lên không lùi bước 🛡️" }, { card: "Strength", msg: "Sức mạnh nội tâm 🦁" }, { card: "The Hermit", msg: "Dành thời gian cho bản thân 🕯️" }, { card: "Wheel of Fortune", msg: "Vận may đang đến 🎡" }, { card: "Justice", msg: "Công bằng và sự thật ⚖️" }, { card: "The Hanged Man", msg: "Thay đổi góc nhìn 🙃" }, { card: "Death", msg: "Khởi đầu mới 🦋" }, { card: "Temperance", msg: "Cân bằng cảm xúc ⚖️" }, { card: "The Devil", msg: "Đừng để cám dỗ điều khiển 😈" }, { card: "The Tower", msg: "Thay đổi đột ngột 🗼" }, { card: "Judgement", msg: "Thức tỉnh và tái sinh 🌅" }, { card: "The World", msg: "Viên mãn 🌍" }
    ];
    var todayTarot = tarots[seed % tarots.length];
    var tarotCaption = todayTarot.card + ": " + todayTarot.msg;
    var quests = ["Uống đủ 2L nước 💧", "Khen 1 người hôm nay 💬", "Mỉm cười ít nhất 3 lần 😊", "Đi bộ 15 phút 🚶", "Ngủ trước 12h đêm 🛌", "Đọc 5 trang sách 📖", "Gửi 1 meme cho bạn thân 🤣", "Nghe 1 bài hát mới 🎧", "Dành 5 phút thiền 🧘", "Dọn dẹp 1 góc nhỏ 🧹", "Chụp 1 bức ảnh phong cảnh 📸", "Nhắn tin hỏi thăm gia đình 💌", "Tập thể dục 10 phút 🏃", "Ăn 1 món gì đó thật ngon 🍜", "Không dùng điện thoại 30 phút 📵"];
    var questCaption = "Quest: " + quests[(seed + 4) % quests.length];
    var foods = ["Trà sữa trân châu 🧋", "Mì tôm trứng 🍜", "Cơm tấm sườn 🍛", "Bánh mì thịt 🥖", "Gà rán 🍗", "Pizza 🍕", "Sushi 🍣", "Bún chả 🥢", "Phở bò 🥣", "Trà đào cam sả 🍹", "Bánh tráng trộn 🌯", "Ốc hút 🐚", "Lẩu 🍲", "Đồ nướng 🍢", "Chè khúc bạch 🍧"];
    var foodCaption = "Ăn gì? " + foods[seed % foods.length];
    var randomTexts = ["Hôm nay đẹp trời 🌤️", "Vibe hôm nay rất chill 🍃", "Tự nhiên thấy iu đời 💖", "Cần một cái ôm 🤗", "Muốn đi trốn 🏕️", "Đang cố gắng 🤧", "Sống là phải chất 😎", "Cà khịa xíu thôi 😈", "Cuộc sống là trải nghiệm 🌍", "Hít thở sâu nào 🧘", "Đừng lo lắng quá nhé 🌻", "Mọi chuyện rồi sẽ ổn thôi ✨", "Bạn xứng đáng với điều tốt đẹp 🌟"];
    var randomCaption = randomTexts[(seed + 8) % randomTexts.length];

    // --- NGÀY LỄ VIỆT NAM ---
    var holidayCaption = "Ngày bình thường nhưng vẫn chất 😎";
    var holidayColor1 = "#8E2DE2", holidayColor2 = "#4A00E0"; 
    if (month === 1 && date === 1) { holidayCaption = "🎆 Chúc mừng năm mới Dương lịch!"; holidayColor1 = "#FFD700"; holidayColor2 = "#FF8C00"; } 
    else if (month === 2 && date === 14) { holidayCaption = "💝 Valentine vui vẻ!"; holidayColor1 = "#FF6B81"; holidayColor2 = "#FF8E9E"; } 
    else if (month === 3 && date === 8) { holidayCaption = "🌹 Chúc mừng Quốc tế Phụ nữ 8/3!"; holidayColor1 = "#FF9A9E"; holidayColor2 = "#FECFEF"; } 
    else if (month === 3 && date === 26) { holidayCaption = "🎉 Chào mừng 26/3 - Ngày thành lập Đoàn!"; holidayColor1 = "#1E90FF"; holidayColor2 = "#00D4FF"; } 
    else if (month === 4 && date === 30) { holidayCaption = "🇻🇳 Chào mừng Ngày Giải phóng miền Nam 30/4!"; holidayColor1 = "#DA251D"; holidayColor2 = "#FFCD00"; } 
    else if (month === 5 && date === 1) { holidayCaption = "🛠️ Chúc mừng Quốc tế Lao động 1/5!"; holidayColor1 = "#E53935"; holidayColor2 = "#B71C1C"; } 
    else if (month === 5 && date === 19) { holidayCaption = "🌻 Kỷ niệm ngày sinh Bác Hồ 19/5!"; holidayColor1 = "#FFD700"; holidayColor2 = "#FF8C00"; } 
    else if (month === 6 && date === 1) { holidayCaption = "🧸 Chúc mừng Quốc tế Thiếu nhi 1/6!"; holidayColor1 = "#FF9A9E"; holidayColor2 = "#FBC2EB"; } 
    else if (month === 7 && date === 27) { holidayCaption = "🕊️ Tri ân các Anh hùng Liệt sĩ 27/7!"; holidayColor1 = "#B71C1C"; holidayColor2 = "#E53935"; } 
    else if (month === 9 && date === 2) { holidayCaption = "🇻🇳 Chào mừng Quốc khánh 2/9!"; holidayColor1 = "#DA251D"; holidayColor2 = "#FFCD00"; } 
    else if (month === 10 && date === 20) { holidayCaption = "🌹 Chúc mừng Ngày Phụ nữ Việt Nam 20/10!"; holidayColor1 = "#FF758C"; holidayColor2 = "#FF7EB3"; } 
    else if (month === 11 && date === 20) { holidayCaption = "📚 Chúc mừng Ngày Nhà giáo Việt Nam 20/11!"; holidayColor1 = "#4CAF50"; holidayColor2 = "#2E7D32"; } 
    else if (month === 12 && date === 22) { holidayCaption = "🪖 Chào mừng Ngày thành lập QĐND VN 22/12!"; holidayColor1 = "#2E7D32"; holidayColor2 = "#1B5E20"; } 
    else if (month === 12 && date === 24) { holidayCaption = "🎅 Đêm Giáng sinh an lành!"; holidayColor1 = "#2FA85F"; holidayColor2 = "#176B3A"; } 
    else if (month === 12 && date === 25) { holidayCaption = "🎄 Chúc mừng Giáng sinh!"; holidayColor1 = "#2FA85F"; holidayColor2 = "#176B3A"; }

    // --- ĐẾM NGƯỢC TẾT NGUYÊN ĐÁN ---
    var tetDates = { 2024: "2024-02-10", 2025: "2025-01-29", 2026: "2026-02-17", 2027: "2027-02-06", 2028: "2028-01-26", 2029: "2029-02-13", 2030: "2030-02-03", 2031: "2031-01-23", 2032: "2032-02-11", 2033: "2033-01-31", 2034: "2034-02-19", 2035: "2035-02-08", 2036: "2036-01-28", 2037: "2037-02-15", 2038: "2038-02-04", 2039: "2039-01-24", 2040: "2040-02-12" };
    var tetString = tetDates[year] || "2025-01-29";
    var tetDateObj = new Date(tetString + "T00:00:00");
    if (now > tetDateObj) {
        var nextYear = year + 1;
        tetString = tetDates[nextYear] || "2025-01-29";
        tetDateObj = new Date(tetString + "T00:00:00");
    }
    var daysToTet = Math.ceil((tetDateObj - now) / (1000 * 60 * 60 * 24));
    var tetCountdownCaption = (daysToTet === 0) ? "Hôm nay là Mùng 1 Tết! 🎉" : (daysToTet === 1) ? "Ngày mai là Mùng 1 Tết rồi!" : "Còn " + daysToTet + " ngày nữa là Tết!";
    var tetStatusCaption = "Đang cày cuốc kiếm tiền lì xì 🧧";
    var tetDay = new Date(year, tetDateObj.getMonth(), tetDateObj.getDate());
    var diffToday = Math.floor((now - tetDay) / (1000 * 60 * 60 * 24));
    if (diffToday === 0) tetStatusCaption = "Mùng 1 Tết: Chúc bạn an khang thịnh vượng! 🧧";
    else if (diffToday === 1) tetStatusCaption = "Mùng 2 Tết: Chúc bạn mạnh khỏe, bình an! 🌸";
    else if (diffToday === 2) tetStatusCaption = "Mùng 3 Tết: Chúc bạn tài lộc dồi dào! 🍀";


    // ============================================================
    // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL
    // ============================================================
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({ app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled", locket_views: "enabled", long_captions: "enabled", longer_video: "enabled", unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled", remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled", streak_recovery: "enabled" }),
        upsell_features: JSON.stringify({ app_icon_picker: true, camera_roll: true, camera_theme: true, locket_views: true, remove_ads: true, custom_widget_frames: true }),
        paywall_presentation_config: JSON.stringify({ uid: "paywall_testflight", onboarding: false, after_sent_moment: false, on_foreground: false, interval: 2592000, profile_banner: true }),
        feature_discovery_popup_config: JSON.stringify({ tag: "LOCKET GOLD", tag_gradient: true, tag_style: "gold_gradient", title: "Phước nó sống thế đấy 😎", feature_set: [ { title: "Chúc bạn có những khoảnh khắc thật đẹp ✨", body: "Hãy tận hưởng Locket Gold của bạn 💛", imageURL: "https://i.ibb.co/SwvxCVK2/image.png" } ], primary_button_title: "Đã hiểu", campaign: "locket_gold_welcome_v3", start_at: "2020-01-01T00:00:00", end_at: "2099-12-31T23:59:59", use_local_time_zone: true }),
        android_subscribe_gold_button_enabled: "false",
        profile_badge_visible: "true",
        lunar_new_year_app_icon_enabled: "true",
        settings_instagram_url: "https://www.instagram.com/aka_phw2812/",
        settings_facebook_url: "https://www.facebook.com/nvp2812"
    });

    // ============================================================
    // 2. CHẶN QUẢNG CÁO & TẮT TRACKING
    // ============================================================
    Object.assign(obj.entries, {
        history_ads_mode: "off", history_ads_prefetch_count: "0", history_ads_prefetch_immediate: "false", history_ads_prefetch_reroute: "false", history_ads_dynamic_insertion: "false", history_ads_refresh_prefetch_on_foreground: "false", history_ads_floor_price: "0", history_ads_floor_price_att: "0", history_ad_log_displayed_on_background: "false", history_ads_debug_menu: "false", sentry_sample_rate: "0", sentry_network_tracing: "false", sentry_performance_tracking: "false", sentry_trace_sample_rate: "0", sentry_profiles_sample_rate: "0"
    });

    // ============================================================
    // 3. CAMERA, VIDEO, FILTERS
    // ============================================================
    Object.assign(obj.entries, {
        camera: JSON.stringify({ gold_max_duration: 30.0, goldMaxDuration: 30.0, max_duration: 30.0, maxDuration: 30.0, ultra_wide: true, ultraWide: true, volume_button: true, volumeButton: true, flash_button: true, telephoto: true, srgb: true, lanczos: true, quality_mbps: 0.9, qualityMbps: 0.9 }),
        camera_roll: JSON.stringify({ gold_max_duration: 30.0, goldMaxDuration: 30.0, video_max_duration: 30.0, videoMaxDuration: 30.0, max_duration: 30.0, maxDuration: 30.0, trim_max_duration: 30.0, trimMaxDuration: 30.0, camera_roll_max_duration: 30.0, quality_mbps: 0.9, qualityMbps: 0.9, flash_button: true }),
        live_photos: JSON.stringify({ capture: true, viewing: true, catch_up: true, widget_looping_mode: "never" }),
        camera_filter_config: JSON.stringify({ allows_custom_filters: true, show_filter_button: true, sheet_enabled: true, open_sheet_immediately: true, sheet_filters: [ { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] }, { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] }, { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] }, { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] }, { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] }, { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] } ], picker_filters: [ "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows", "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "slimed", "princess", "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face", "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe", "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty" ] }),
        camera_roll_preview_enabled: "true", camera_roll_video_enabled: "true", camera_roll_video_upload_enabled: "true", internal_camera_roll_video_upload_enabled: "true", longer_camera_roll_videos_enabled: "true", camera_roll_video_max_duration: "30.0", camera_roll_max_duration: "30.0", camera_roll_duration: "30.0", max_video_duration: "30.0", video_max_duration: "30.0", video_trim_max_duration: "30.0", trim_max_duration: "30.0", gold_max_duration: "30.0", goldMaxDuration: "30.0", video_quality_mbps: "0.9", video_sound_enabled: "true", microphone_enabled: "true", camera_microphone_enabled: "true", audio_session_deactivation_enabled: "true", zoom_enabled: "true", upload_main: "false", upload_main_image_quality: "1.0", upload_main_image_size: "1440", upload_thumbnail_image_quality: "1.0", upload_thumbnail_image_size: "1020"
    });

    // ============================================================
    // 4. BẠN BÈ & GIỚI HẠN
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999", friend_limit_mode: "0", soft_friend_limit_threshold_count: "999999", show_friend_limit_on_cam: "false", signup_max_friends_count: "999999", celebrity_inbox_limit: "999999", friend_limit_geo_override: JSON.stringify({ experiments: {}, area_code_overrides: {} }),
        friends_sheet_locket_count_config: JSON.stringify({ items: [ { threshold: 0, icon_name: "heart" }, { threshold: 1, icon_name: "heart.fill" }, { threshold: 10, emoji: "🤍" }, { threshold: 100, emoji: "💛" }, { threshold: 500, emoji: "❤️‍🔥" }, { threshold: 1000, emoji: "🌟🫶🌟" }, { threshold: 2000, emoji: "✨💟✨" }, { threshold: 5000, emoji: "⚡️😵‍💫⚡" }, { threshold: 10000, emoji: "✨⚡️😱⚡✨" } ] }),
        friend_locket_count_config: JSON.stringify({ items: [ { threshold: 0, icon_name: "heart" }, { threshold: 1, icon_name: "heart.fill" }, { threshold: 10, emoji: "🤍" }, { threshold: 100, emoji: "💛" }, { threshold: 500, emoji: "❤️‍🔥" }, { threshold: 1000, emoji: "✨💗✨" }, { threshold: 2000, emoji: "✨️⭐️✨" }, { threshold: 5000, emoji: "✨💎✨" }, { threshold: 10000, emoji: "✨🔐💛✨" } ] }),
        new_friends_monitoring_enabled: "true", improved_friend_suggestions: "true", show_friend_suggestions_by_default: "true", emoji_friend_suggestions: "true", prompt_contact_permissions_on_search: "true", populate_phone_numbers_from_suggest_friends: "true", hide_friends_enabled: "true", hide_invite_links: "false", hide_skip_contacts: "true", show_all_contacts: "true", show_invite_suggestions: "true", show_no_friends_bottom_sheet: "false", signup_allow_skip_add_friends: "true"
    });

    // ============================================================
    // 5. MOMENTS, STREAK, CHAT
    // ============================================================
    try {
        var streak = JSON.parse(obj.entries.streak_config || "{}");
        streak.minimum_recovery_count = 0;
        streak.minimum_display_count = 0;
        obj.entries.streak_config = JSON.stringify(streak);
    } catch (e) {}

    Object.assign(obj.entries, {
        moment_views_enabled: "true", moment_views_v2: "true", record_moment_views: "true", notify_moment_views: "true", get_moment_views_as_cloud_function: "true", moment_reactions_v2: "true", chat_reactions_enabled: "true", conversation_reactions: "true", typing_indicators_enabled: "true", unsend_message_enabled: "true", reply_prototype_enabled: "true", messages_integration: "true", conversations_enabled: "true", fetch_moments_in_conversation: "true", hide_chat_button: "false", groups_enabled: "true", send_to_self_only_mode: "always_enabled", time_travel_rewind_v2_enabled: "true", calendar_delete_moment_enabled: "true", calendar_rewind_enabled: "false", locket_yearbook_story_sharing_encouraged: "true", rollcall_enabled: "true", rollcall_comment_actions: "true", rollcall_profile_button: "true", rollcall_prompt_export_after_share: "true", rollcall_confirm_skip_tagging: "false", rollcall_tap_to_tag_enabled: "false"
    });

    // ============================================================
    // 6. WIDGET, THÔNG BÁO & GIAO DIỆN
    // ============================================================
    Object.assign(obj.entries, {
        widget_frame_event_max_images: "5", android_widget_frame_event_enabled: "true", widget_badge_enabled: "true", widget_badge_v2: "true", widget_stale_state_enabled: "false", widget_last_sent_indicator: "false", widget_sync_token_reload_mode: "clearTokenNever",
        widget_frame_event: JSON.stringify({ uid: "midautumn_2026", url: "https://i.ibb.co/RTm5P1n9/kitty-1.png", use_local_time_zone: true, placement: "below", start_at: "2020-01-01T00:00:00", end_at: "2099-12-31T23:59:59" }),
        live_activity_onboarding: "true", live_activity_onboarding_variant: "friending", register_live_activity_push_to_start_token: "true", live_activity_remove_stale_start_token: "true", notification_preferences_live_activities: "true", notification_preferences: "true", notification_reply_body_visible: "true", prompt_notification_permissions_after_friending: "true", activity_bar_enabled: "true", journal_activity_bar_enabled: "true",
        journal_settings: JSON.stringify({ debug_menu_enabled: false, focus_animation: true, compact_header: true, friends_button: true, reverse_scroll_direction: false, streak_visualization: true, streak_visualization_style: "gradient", streak_header_minimum_count: 0, streak_visualization_minimum_count: 2, overlay_indicators: { location: true, music: true, static_content: true, weather: true } }),
        qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
        custom_profile_pics: "true", profile_menu_v2_enabled: "true"
    });

    // ============================================================
    // 7. HỆ THỐNG & CACHE
    // ============================================================
    Object.assign(obj.entries, {
        cdn_domain_replacements: JSON.stringify({ "firebasestorage.googleapis.com": "cdn.locketcamera.com" }), cdn_domain_replacements_video: "true", storage_bucket: "gs://locket-img", storage_bucket_video: "gs://locket-video", image_cache_max_age_sec: "157680000", image_cache_max_size: "400000000", history_cache_age_days: "1000", user_cache_max_age_sec: "691200", friends_cache_max_age_sec: "2592000", image_fetch_cache: "true", image_cache_use_shared: "true", use_doc_dir_for_image_cache: "true", efficient_history_cache_invalidation: "true", timestamp_based_history_fetches: "true", get_latest_moment_v2: "true", fetch_users_from_cloud_function: "true", refresh_interval: "60", firestore_refresh_v2: "true", firestore_refresh_v3: "true", keychain_access_retries: "true", blocked_users_cached_sync_enabled: "true", beta_features_enabled: "true", join_testflight_enabled: "true", safety_center: "true", help_center: "true", support_v2: "true", privacy_choices_setting: "true", request_att_permission: "true", invite_link_preview_variant: "4", share_history_config: JSON.stringify({ prompt_enabled: false, fetching_enabled: true }), share_history_prompt_enabled: "false", use_thumbnails_for_sharing: "true", use_thumbnails_in_timeline: "true", persist_onboarding_step: "true", onboarding_contact_permission_step: "true"
    });

    // ============================================================
    // 8. OVERLAY & CUSTOM CAPTIONS (ĐÃ CẬP NHẬT SIÊU VIP)
    // ============================================================
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        captions_enabled: "true",
        music_caption_enabled: "true",
        music_caption_song_preview_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_dynamic_captions: JSON.stringify([ "standard", "poll", "color_palette", "review", "music", "location", "weather", "time", "streak", "star_sign", "party_time", "locket_count", "good_morning", "goodnight", "ootd", "miss_you", "custom", "phunu_2010", "halloween_2026" ]),
        overlay_items: JSON.stringify([
            {
                section: "🕐 Theo thời gian",
                items: [
                    { overlay_id: "caption:greeting_time", source: "remote", caption: { background: { colors: ["#FFD700", "#FF8C00"] }, icon: { data: "⏰", type: "emoji" }, max_lines: 1, text: greetingTime, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:greeting_day", source: "remote", caption: { background: { colors: ["#4CAF50", "#2E7D32"] }, icon: { data: "📅", type: "emoji" }, max_lines: 1, text: greetingDay, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:greeting_season", source: "remote", caption: { background: { colors: ["#FFAFBD", "#FFC3A0"] }, icon: { data: "🌿", type: "emoji" }, max_lines: 1, text: greetingSeason, text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:event_countdown", source: "remote", caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "🎯", type: "emoji" }, max_lines: 1, text: eventCountdown || "Sắp có sự kiện rồi! ✨", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:special_day", source: "remote", caption: { background: { colors: ["#FF0062", "#FF783F"] }, icon: { data: "🎊", type: "emoji" }, max_lines: 1, text: specialDayCaption || "Hôm nay là ngày đẹp trời 🌤️", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:holiday_vn", source: "remote", caption: { background: { colors: [holidayColor1, holidayColor2] }, icon: { data: "🎊", type: "emoji" }, max_lines: 1, text: holidayCaption, text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:tet_countdown", source: "remote", caption: { background: { colors: ["#DA251D", "#FFCD00"] }, icon: { data: "🧨", type: "emoji" }, max_lines: 1, text: tetCountdownCaption, text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:tet_status", source: "remote", caption: { background: { colors: ["#EC407A", "#F8BBD0"] }, icon: { data: "🧧", type: "emoji" }, max_lines: 1, text: tetStatusCaption, text_color: "#8C1938", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Động & Random 🎲",
                items: [
                    { overlay_id: "caption:lucky_num", source: "remote", caption: { background: { colors: ["#11998E", "#38EF7D"] }, icon: { data: "🎲", type: "emoji" }, max_lines: 1, text: luckyCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:lucky_color", source: "remote", caption: { background: { colors: ["#FFD700", "#FF8C00"] }, icon: { data: "🎨", type: "emoji" }, max_lines: 1, text: luckyColor, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:lucky_item", source: "remote", caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "🔮", type: "emoji" }, max_lines: 1, text: luckyItem, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:month_greet", source: "remote", caption: { background: { colors: ["#FC5C7D", "#6A82FB"] }, icon: { data: "📅", type: "emoji" }, max_lines: 1, text: monthText, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:hoang_dao", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200"] }, icon: { data: "⏰", type: "emoji" }, max_lines: 1, text: hoangDaoCaption, text_color: "#5D3A00", type: "static_content" } },
                    { overlay_id: "caption:mood_today", source: "remote", caption: { background: { colors: ["#FF9A9E", "#FECFEF"] }, icon: { data: "🎭", type: "emoji" }, max_lines: 1, text: moodCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:weekend_countdown", source: "remote", caption: { background: { colors: ["#DA22FF", "#9733EE"] }, icon: { data: "🏖️", type: "emoji" }, max_lines: 1, text: weekendCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:weather_vibe", source: "remote", caption: { background: { colors: ["#89F7FE", "#66A6FF"] }, icon: { data: "🌦️", type: "emoji" }, max_lines: 1, text: weatherCaption, text_color: "#1A3A5C", type: "static_content" } },
                    { overlay_id: "caption:personality_test", source: "remote", caption: { background: { colors: ["#654ea3", "#eaafc8"] }, icon: { data: "🧠", type: "emoji" }, max_lines: 1, text: traitCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:flex_friends", source: "remote", caption: { background: { colors: ["#00B4DB", "#0083B0"] }, icon: { data: "🫂", type: "emoji" }, max_lines: 1, text: flexCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:can_chi", source: "remote", caption: { background: { colors: ["#870000", "#190A05"] }, icon: { data: "📜", type: "emoji" }, max_lines: 1, text: canChiCaption, text_color: "#FFD700", type: "static_content" } },
                    { overlay_id: "caption:drink_water", source: "remote", caption: { background: { colors: ["#4CB8C4", "#3CD3AD"] }, icon: { data: "💧", type: "emoji" }, max_lines: 1, text: waterReminder, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:zodiac", source: "remote", caption: { background: { colors: ["#FF512F", "#DD2476"] }, icon: { data: "♈", type: "emoji" }, max_lines: 1, text: zodiacCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:beauty_ai", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200"] }, icon: { data: "🤖", type: "emoji" }, max_lines: 1, text: beautyCaption, text_color: "#5D3A00", type: "static_content" } },
                    { overlay_id: "caption:single_warn", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "🚨", type: "emoji" }, max_lines: 1, text: singleCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:budget", source: "remote", caption: { background: { colors: ["#11998E", "#38EF7D"] }, icon: { data: "💸", type: "emoji" }, max_lines: 1, text: budgetCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:tarot", source: "remote", caption: { background: { colors: ["#200122", "#6F0000"] }, icon: { data: "🔮", type: "emoji" }, max_lines: 1, text: tarotCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:quest", source: "remote", caption: { background: { colors: ["#654ea3", "#eaafc8"] }, icon: { data: "🕹️", type: "emoji" }, max_lines: 1, text: questCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:food_random", source: "remote", caption: { background: { colors: ["#F2994A", "#F2C94C"] }, icon: { data: "🍔", type: "emoji" }, max_lines: 1, text: foodCaption, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:random_txt", source: "remote", caption: { background: { colors: ["#E0EAFC", "#CFDEF3"] }, icon: { data: "✨", type: "emoji" }, max_lines: 1, text: randomCaption, text_color: "#2C3E50", type: "static_content" } }
                ]
            },
            {
                section: "🎨 General",
                items: [
                    { overlay_id: "caption:standard", source: "local", caption: { type: "standard" } },
                    { overlay_id: "caption:review", source: "local", caption: { type: "review" } },
                    { overlay_id: "caption:music", source: "local", caption: { type: "music" } },
                    { overlay_id: "caption:location", source: "local", caption: { type: "location" } },
                    { overlay_id: "caption:weather", source: "local", caption: { type: "weather" } },
                    { overlay_id: "caption:time", source: "local", caption: { type: "time" } },
                    { overlay_id: "caption:streak", source: "local", caption: { type: "streak" } },
                    { overlay_id: "caption:star_sign", source: "local", caption: { type: "star_sign" } },
                    { overlay_id: "caption:poll", source: "local", caption: { type: "poll" } },
                    { overlay_id: "caption:color_palette", source: "local", caption: { type: "color_palette" } },
                    { overlay_id: "caption:locket_count", source: "local", caption: { type: "locket_count" } }
                ]
            },
            {
                section: "🎨 Holiday Caption",
                items: [
                    { overlay_id: "caption:halloween_2026", source: "remote", caption: { background: { colors: ["#150804", "#C8540D"] }, icon: { data: "🎃", type: "emoji" }, max_lines: 1, text: "Halloween", text_color: "#FFB182", type: "static_content" } },
                    { overlay_id: "caption:christmas_eve_2026", source: "remote", caption: { background: { colors: ["#2FA85F", "#176B3A"] }, icon: { data: "🕯️", type: "emoji" }, max_lines: 1, text: "Giáng sinh an lành", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:no_memory", source: "remote", caption: { background: { image: { type: "image", data: "https://public.locketcamera.com/locket-public/overlays/forgotten_island/forgotten_island_bg.png", source: "url" }, colors: ["#1A1A2E", "#16213E"] }, max_lines: 1, text: "NO MEMORY LEFT BEHIND", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Decorative by Locket",
                items: [
                    { overlay_id: "caption:toi_nho_em", source: "remote", caption: { background: { colors: ["#FFFFFF", "#6D9EEB"] }, max_lines: 1, text: "보고 싶어 🥺", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:party_time", source: "remote", caption: { background: { colors: ["#5EFFF5", "#FCFF57"] }, icon: { data: "🪩", type: "emoji" }, max_lines: 1, text: "Party Time!", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:good_morning", source: "remote", daily_start_hour: 5, daily_end_hour: 10, caption: { background: { colors: ["#EF7402", "#EABF0F"] }, icon: { data: "☀️", type: "emoji" }, max_lines: 1, text: "Good morning", text_color: "#FFFFFFE5", type: "static_content" } },
                    { overlay_id: "caption:goodnight", source: "remote", daily_start_hour: 19.5, daily_end_hour: 24, caption: { background: { colors: ["#370C6F", "#575CD4"] }, icon: { data: "🌙", type: "emoji" }, max_lines: 1, text: "Goodnight", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:ootd", source: "remote", caption: { background: { colors: ["#FFFFFF", "#DBDBDB"] }, icon: { data: "🕶", type: "emoji" }, max_lines: 1, text: "OOTD", text_color: "#101010E6", type: "static_content" } },
                    { overlay_id: "caption:miss_you", source: "remote", caption: { background: { colors: ["#EC0C00", "#FF493F"] }, icon: { data: "🥰", type: "emoji" }, max_lines: 1, text: "Miss you", text_color: "#FFFFFFDB", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Decorative by akaphuoc28",
                items: [
                    { overlay_id: "caption:akaphuoc28", source: "remote", caption: { background: { colors: ["#B8E7FF", "#A8F5D0", "#DCCBFF"] }, icon: { data: "tortoise.fill", type: "sf_symbol", color: "#183153" }, max_lines: 1, text: "akaphuoc28", text_color: "#183153", type: "static_content" } },
                    { overlay_id: "caption:feeling_cute", source: "remote", caption: { background: { colors: ["#F8BBD0", "#E91E63"] }, icon: { data: "🌷", type: "emoji" }, max_lines: 1, text: "Feeling Cute", text_color: "#FFFFFFE5", type: "static_content" } },
                    { overlay_id: "caption:cu", source: "remote", caption: { background: { colors: ["#FFD6A5", "#FFF1A8", "#FFC4D6"] }, max_lines: 1, text: "Cu 🐎", text_color: "#633B24", type: "static_content" } },
                    { overlay_id: "caption:tuat", source: "remote", caption: { background: { colors: ["#2C1A0E", "#5D4037", "#D7A86E"] }, icon: { data: "🐕", type: "emoji" }, max_lines: 1, text: "Tuất", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:wedding_time", source: "remote", caption: { background: { colors: ["#FFE4E1", "#E73C7E"] }, icon: { data: "💍", type: "emoji" }, max_lines: 1, text: "Wedding Time!", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:cam_thay_hanh_phuc", source: "remote", caption: { background: { colors: ["#EC407A", "#F8BBD0"] }, icon: { data: "🇻🇳", type: "emoji" }, max_lines: 1, text: "Cảm thấy hạnh phúc", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:coffee_time", source: "remote", caption: { background: { colors: ["#4E342E", "#8D6E63"] }, icon: { data: "☕", type: "emoji" }, max_lines: 1, text: "Coffee Time!", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:snake_vibes", source: "remote", caption: { background: { colors: ["#2E7D32", "#66BB6A"] }, icon: { data: "🐍", type: "emoji" }, max_lines: 1, text: "Snake Vibes", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:mixue_time", source: "remote", caption: { background: { colors: ["#FFF9C4", "#F8BBD0"] }, icon: { data: "🍦", type: "emoji" }, max_lines: 1, text: "Mixue Time!", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:locket_time", source: "remote", caption: { background: { colors: ["#ECEFF1", "#B3E5FC"] }, icon: { data: "📷", type: "emoji" }, max_lines: 1, text: "Locket Time!", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:cinema_time", source: "remote", caption: { background: { colors: ["#1A237E", "#455A64"] }, icon: { data: "🎬", type: "emoji" }, max_lines: 1, text: "Cinema Time!", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:dating_time", source: "remote", caption: { background: { colors: ["#E91E63", "#F44336"] }, icon: { data: "💕", type: "emoji" }, max_lines: 1, text: "Dating Time!", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:graduation_day", source: "remote", caption: { background: { colors: ["#1A237E", "#283593"] }, icon: { data: "🎓", type: "emoji" }, max_lines: 1, text: "Happy Graduation Day!", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:shopping_time", source: "remote", caption: { background: { colors: ["#B3E5FC", "#FFFFFF"] }, icon: { data: "🛍️", type: "emoji" }, max_lines: 1, text: "Shopping Time!", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:dinner_time", source: "remote", caption: { background: { colors: ["#FFCCBC", "#FF8A80"] }, icon: { data: "🍽️", type: "emoji" }, max_lines: 1, text: "Dinner Time!", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:chilling_time", source: "remote", caption: { background: { colors: ["#E1BEE7", "#F8BBD0"] }, icon: { data: "🌴", type: "emoji" }, max_lines: 1, text: "Chilling Time!", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Học sinh & Sinh viên 📚",
                items: [
                    { overlay_id: "caption:chay_deadline", source: "remote", caption: { background: { colors: ["#1E3C72", "#2A5298"] }, icon: { data: "📚", type: "emoji" }, max_lines: 1, text: "Chạy deadline muốn xỉu", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:hoc_ngay_hoc_dem", source: "remote", caption: { background: { colors: ["#141E30", "#243B55"] }, icon: { data: "☕", type: "emoji" }, max_lines: 1, text: "Học ngày học đêm", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:thu_khoa_keo_ve", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200"] }, icon: { data: "🏆", type: "emoji" }, max_lines: 1, text: "Thủ khoa kéo về", text_color: "#5D3A00", type: "static_content" } },
                    { overlay_id: "caption:gap_thay_co", source: "remote", caption: { background: { colors: ["#56CCF2", "#2F80ED"] }, icon: { data: "🙏", type: "emoji" }, max_lines: 1, text: "Gặp thầy cô nhớ chào", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:sinh_vien_ngheo", source: "remote", caption: { background: { colors: ["#3E5151", "#DECBA4"] }, icon: { data: "🥲", type: "emoji" }, max_lines: 1, text: "Sinh viên nghèo rớt mồng tơi", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:thi_rot_roi", source: "remote", caption: { background: { colors: ["#8E0E00", "#1F1C18"] }, icon: { data: "💀", type: "emoji" }, max_lines: 1, text: "Thi rớt rồi hu hu", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:qua_mon_la_vui", source: "remote", caption: { background: { colors: ["#11998E", "#38EF7D"] }, icon: { data: "✅", type: "emoji" }, max_lines: 1, text: "Qua môn là vui rồi", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:nghi_hoc_1_buoi", source: "remote", caption: { background: { colors: ["#FBD3E9", "#BB377D"] }, icon: { data: "🛌", type: "emoji" }, max_lines: 1, text: "Nghỉ học 1 buổi thôi", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Ăn uống & Foodie 🍔",
                items: [
                    { overlay_id: "caption:an_gi_cung_ngon", source: "remote", caption: { background: { colors: ["#F2994A", "#F2C94C"] }, icon: { data: "🍜", type: "emoji" }, max_lines: 1, text: "Ăn gì cũng ngon", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:foodie_chinh_hieu", source: "remote", caption: { background: { colors: ["#FF512F", "#DD2476"] }, icon: { data: "🍴", type: "emoji" }, max_lines: 1, text: "Foodie chính hiệu", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:an_cho_quen_mieng", source: "remote", caption: { background: { colors: ["#D66D75", "#E29587"] }, icon: { data: "🍰", type: "emoji" }, max_lines: 1, text: "Ăn cho quen miệng", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:an_khuya_cung_phai_an", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "🌙", type: "emoji" }, max_lines: 1, text: "Ăn khuya cũng phải ăn", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:buffet_kg", source: "remote", caption: { background: { colors: ["#F12711", "#F5AF19"] }, icon: { data: "🍖", type: "emoji" }, max_lines: 1, text: "Buffet 1kg thịt", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:tra_sua_cuu_nguy", source: "remote", caption: { background: { colors: ["#C79081", "#DFA579"] }, icon: { data: "🧋", type: "emoji" }, max_lines: 1, text: "Trà sữa cứu rỗi cuộc đời", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:do_an_la_chan_ay", source: "remote", caption: { background: { colors: ["#FF9966", "#FF5E62"] }, icon: { data: "🍕", type: "emoji" }, max_lines: 1, text: "Đồ ăn là chân ái", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:het_tien_vi_an", source: "remote", caption: { background: { colors: ["#603813", "#B29F94"] }, icon: { data: "💸", type: "emoji" }, max_lines: 1, text: "Hết tiền vì ăn", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Thú cưng & Pet 🐾",
                items: [
                    { overlay_id: "caption:sen_ham_meo", source: "remote", caption: { background: { colors: ["#F7B733", "#FC4A1A"] }, icon: { data: "🐱", type: "emoji" }, max_lines: 1, text: "Sen hầu mèo", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:meo_la_chu", source: "remote", caption: { background: { colors: ["#B993D6", "#8CA6DB"] }, icon: { data: "👑", type: "emoji" }, max_lines: 1, text: "Mèo là chủ, tôi là sen", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:cho_ngu_ngon", source: "remote", caption: { background: { colors: ["#56AB2F", "#A8E063"] }, icon: { data: "🐶", type: "emoji" }, max_lines: 1, text: "Chó nhà tôi ngủ ngon quá", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:pet_la_gia_dinh", source: "remote", caption: { background: { colors: ["#FFAFBD", "#FFC3A0"] }, icon: { data: "💕", type: "emoji" }, max_lines: 1, text: "Pet là gia đình", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:meo_ham_an", source: "remote", caption: { background: { colors: ["#FDC830", "#F37335"] }, icon: { data: "🍗", type: "emoji" }, max_lines: 1, text: "Mèo đói = thảm họa", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Du lịch & Check-in 🌴",
                items: [
                    { overlay_id: "caption:di_de_ve_co_qua", source: "remote", caption: { background: { colors: ["#00C9FF", "#92FE9D"] }, icon: { data: "✈️", type: "emoji" }, max_lines: 1, text: "Đi để về có quà", text_color: "#0B3D3F", type: "static_content" } },
                    { overlay_id: "caption:check_in_dao_xa", source: "remote", caption: { background: { colors: ["#1FA2FF", "#12D8FA", "#A6FFCB"] }, icon: { data: "🏝️", type: "emoji" }, max_lines: 1, text: "Check-in đảo xa", text_color: "#063B4F", type: "static_content" } },
                    { overlay_id: "caption:di_choi_khong_lo_nghi", source: "remote", caption: { background: { colors: ["#FF8008", "#FFC837"] }, icon: { data: "🌞", type: "emoji" }, max_lines: 1, text: "Đi chơi không lo nghĩ", text_color: "#5A2E00", type: "static_content" } },
                    { overlay_id: "caption:muon_di_bien", source: "remote", caption: { background: { colors: ["#2E3192", "#1BFFFF"] }, icon: { data: "🌊", type: "emoji" }, max_lines: 1, text: "Muốn đi biển quá", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:travel_diary", source: "remote", caption: { background: { colors: ["#F4E2D8", "#BA5370"] }, icon: { data: "📖", type: "emoji" }, max_lines: 1, text: "Travel Diary 📔", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:di_la_ghiền", source: "remote", caption: { background: { colors: ["#00B4DB", "#0083B0"] }, icon: { data: "🧳", type: "emoji" }, max_lines: 1, text: "Đi là ghiền", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Thể thao & Gym 💪",
                items: [
                    { overlay_id: "caption:gym_la_chan_ai", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "🏋️", type: "emoji" }, max_lines: 1, text: "Gym là chân ái", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:khong_dau_hang", source: "remote", caption: { background: { colors: ["#F00000", "#DC281E"] }, icon: { data: "🔥", type: "emoji" }, max_lines: 1, text: "Không đầu hàng", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:moi_ngay_1_percent", source: "remote", caption: { background: { colors: ["#134E5E", "#71B280"] }, icon: { data: "📈", type: "emoji" }, max_lines: 1, text: "Mỗi ngày 1% tốt hơn", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:no_pain_no_gain", source: "remote", caption: { background: { colors: ["#360033", "#0B8793"] }, icon: { data: "💯", type: "emoji" }, max_lines: 1, text: "No pain no gain", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:sweat_today_glow", source: "remote", caption: { background: { colors: ["#FF416C", "#FF4B2B"] }, icon: { data: "💦", type: "emoji" }, max_lines: 1, text: "Sweat today, glow tomorrow", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:body_moi_ngay", source: "remote", caption: { background: { colors: ["#43C6AC", "#191654"] }, icon: { data: "🫸", type: "emoji" }, max_lines: 1, text: "Body mới mỗi ngày", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Tình yêu (Bonus) 💕",
                items: [
                    { overlay_id: "caption:nguoi_yeu_ban_than", source: "remote", caption: { background: { colors: ["#FF9A9E", "#FAD0C4", "#FBC2EB"] }, icon: { data: "🫶", type: "emoji" }, max_lines: 1, text: "người yêu là bạn thân", text_color: "#6A2C3A", type: "static_content" } },
                    { overlay_id: "caption:iu_anh_nhat_tren_doi", source: "remote", caption: { background: { colors: ["#FF758C", "#FF7EB3", "#FFD3E0"] }, icon: { data: "💘", type: "emoji" }, max_lines: 1, text: "iu anh nhất trên đời", text_color: "#7A1F3D", type: "static_content" } },
                    { overlay_id: "caption:gap_dung_nguoi", source: "remote", caption: { background: { colors: ["#A1C4FD", "#C2E9FB"] }, icon: { data: "🍀", type: "emoji" }, max_lines: 1, text: "may mắn vì gặp đúng người", text_color: "#1F3A5F", type: "static_content" } },
                    { overlay_id: "caption:yeu_xa_nho_nhieu", source: "remote", caption: { background: { colors: ["#D4A5A5", "#F6D5C8", "#FFF0E5"] }, icon: { data: "✉️", type: "emoji" }, max_lines: 1, text: "yêu xa nhớ nhiều", text_color: "#6B3A2E", type: "static_content" } },
                    { overlay_id: "caption:chong_tuong_lai", source: "remote", caption: { background: { colors: ["#B79891", "#94716B"] }, icon: { data: "💍", type: "emoji" }, max_lines: 1, text: "chồng tương lai của em", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:crush_oi", source: "remote", caption: { background: { colors: ["#FF9A8B", "#FF6A88", "#FF99AC"] }, icon: { data: "👀", type: "emoji" }, max_lines: 1, text: "crush ơi để ý em với", text_color: "#7A1F2B", type: "static_content" } }
                ]
            }
        ])
    });
}

$done({ body: JSON.stringify(obj) });
