// ============================================================
// Locket Caption & Gold Config (Tách riêng)
// Base by @akaphuoc28
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
    obj.entries = obj.entries || {};

    // XỬ LÝ THỜI GIAN & LOGIC TỰ ĐỘNG
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();
    var date = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var halfHourSeed = Math.floor(now.getTime() / 1800000);
    var randomSeed = Math.floor(Math.random() * 1000);

    var widgetImages = [
        "https://i.ibb.co/TMQGn7sv/Ch-a-c-t-n-1080-x-1080-px-1.png",
        "https://i.ibb.co/C5Mjt1Cx/Ch-a-c-t-n-1080-x-1080-px-1-1.png",
        "https://i.ibb.co/NdTqbf5s/Ch-a-c-t-n-1080-x-1080-px-2-1.png",
        "https://i.ibb.co/B2X7LjtQ/Ch-a-c-t-n-1080-x-1080-px-3-1.png",
        "https://i.ibb.co/sd2wkzb5/Ch-a-c-t-n-1080-x-1080-px-4-1.png",
        "https://i.ibb.co/5gxxQ4pr/Ch-a-c-t-n-1080-x-1080-px-5-1.png",
        "https://i.ibb.co/609T0j3v/Ch-a-c-t-n-1080-x-1080-px-6-1.png",
        "https://i.ibb.co/Ld1qNgbg/Ch-a-c-t-n-1080-x-1080-px-8-1.png",
        "https://i.ibb.co/hxswWSr4/Ch-a-c-t-n-1080-x-1080-px-9-1.png",
        "https://i.ibb.co/V0jNcFnJ/Ch-a-c-t-n-1080-x-1080-px-10-1.png"
    ];
    var todayWidgetIndex = halfHourSeed % widgetImages.length; 
    var selectedWidgetUrl = widgetImages[todayWidgetIndex] + "?v=" + halfHourSeed;

    var greetingTime = (hour >= 5 && hour < 11) ? "Chào buổi sáng ☀️" : (hour >= 11 && hour < 14) ? "Chào buổi trưa 🌤️" : (hour >= 14 && hour < 18) ? "Chào buổi chiều 🌇" : (hour >= 18 && hour < 22) ? "Chào buổi tối 🌆" : "Khuya rồi ngủ đi 🌙";
    var greetingDay = (day === 0) ? "Chủ nhật chill nhé 🛋️" : (day === 1) ? "Thứ 2 đầu tuần cố lên 💪" : (day === 6) ? "Thứ 7 vui vẻ nha 🎉" : "Ngày thường nhưng vẫn chất 😎";
    var greetingSeason = (month >= 3 && month <= 5) ? "Mùa xuân ấm áp 🌸" : (month >= 6 && month <= 8) ? "Mùa hè rực rỡ ☀️" : (month >= 9 && month <= 11) ? "Mùa thu lá vàng 🍂" : "Mùa đông lạnh giá ❄️";

    var holidayCaption = "Ngày bình thường nhưng vẫn chất 😎";
    var holidayColor1 = "#8E2DE2", holidayColor2 = "#4A00E0"; 
    if (month === 1 && date === 1) { holidayCaption = "🎆 Chúc mừng năm mới Dương lịch!"; holidayColor1 = "#FFD700"; holidayColor2 = "#FF8C00"; } 
    else if (month === 2 && date === 14) { holidayCaption = "💝 Valentine vui vẻ!"; holidayColor1 = "#FF6B81"; holidayColor2 = "#FF8E9E"; } 
    else if (month === 12 && date === 25) { holidayCaption = "🎄 Chúc mừng Giáng sinh!"; holidayColor1 = "#2FA85F"; holidayColor2 = "#176B3A"; }

    // CẤU HÌNH HỆ THỐNG
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({ app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled", locket_views: "enabled", long_captions: "enabled", longer_video: "enabled", unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled", remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled", streak_recovery: "enabled" }),
        camera: JSON.stringify({ gold_max_duration: 60.0, max_duration: 60.0, quality_mbps: 1.5 }),
        max_friends_count: "999999",
        widget_frame_event: JSON.stringify({ uid: "hello_kitty_rotation_30m_" + halfHourSeed + "_" + todayWidgetIndex, url: selectedWidgetUrl, use_local_time_zone: true, placement: "below", start_at: "2020-01-01T00:00:00", end_at: "2099-12-31T23:59:59" }),

        // OVERLAY & CAPTION
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        captions_enabled: "true",
        overlay_dynamic_captions: JSON.stringify([ "standard", "poll", "color_palette", "review", "music", "location", "weather", "time", "streak", "star_sign", "party_time", "locket_count", "good_morning", "goodnight", "ootd", "miss_you", "custom" ]),
        
        overlay_items: JSON.stringify([
            {
                section: "🕐 Theo thời gian",
                items: [
                    { overlay_id: "caption:greeting_time", source: "remote", caption: { background: { colors: ["#FFD700", "#FF8C00"] }, icon: { data: "⏰", type: "emoji" }, max_lines: 1, text: greetingTime, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:greeting_day", source: "remote", caption: { background: { colors: ["#4CAF50", "#2E7D32"] }, icon: { data: "📅", type: "emoji" }, max_lines: 1, text: greetingDay, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:holiday_vn", source: "remote", caption: { background: { colors: [holidayColor1, holidayColor2] }, icon: { data: "🎊", type: "emoji" }, max_lines: 1, text: holidayCaption, text_color: "#FFFFFF", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Decorative by Locket",
                items: [
                    { overlay_id: "caption:good_morning", source: "remote", daily_start_hour: 5, daily_end_hour: 10, caption: { background: { colors: ["#EF7402", "#EABF0F"] }, icon: { data: "☀️", type: "emoji" }, max_lines: 1, text: "Good morning", text_color: "#FFFFFFE5", type: "static_content" } },
                    { overlay_id: "caption:goodnight", source: "remote", daily_start_hour: 19.5, daily_end_hour: 24, caption: { background: { colors: ["#370C6F", "#575CD4"] }, icon: { data: "🌙", type: "emoji" }, max_lines: 1, text: "Goodnight", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            }
        ])
    });
}

$done({ body: JSON.stringify(obj) });
