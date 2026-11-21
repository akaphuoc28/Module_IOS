// ============================================================
// Locket Photobooth AI Config (Tách riêng)
// Endpoint: firebaseremoteconfig.googleapis.com
// ============================================================

var obj = JSON.parse($response.body);

if (obj && obj.entries) {
    // 1. CẤU HÌNH KẾT NỐI WORKER
    obj.entries.photobooth_enabled = "true";
    obj.entries.photobooth_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.custom_filter_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.ai_filter_url = "https://locket-photobooth.akaphuoc28.workers.dev/";

    // 2. CẤU HÌNH DANH SÁCH FILTER & ẢNH THUMBNAIL
    obj.entries.camera_filter_config = JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        filter_button_enabled: true,
        picker_filters: [
            "cutesy", "sticker_face", "flower_crown", "love_bug", "slimed", "princess", "disco_lights", "cash_money", "happy_birthday",
            "pb_cortis", "pb_hello_kitty", "anime", "gold"
        ],
        sheet_filters: [
            { title: { en: "Hiệu ứng AI 3D Hot 🔥" }, filter_ids: ["cutesy", "sticker_face", "flower_crown"] },
            { title: { en: "Photobooth 📸" }, filter_ids: ["pb_cortis", "pb_hello_kitty"] },
            { title: { en: "Khung Viền 🖼️" }, filter_ids: ["love_bug"] },
            { title: { en: "Dáng yêu" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
            { title: { en: "AI Photobooth của tôi" }, filter_ids: ["anime", "gold"] }
        ],
        custom_filters: [
            {
                id: "anime",
                name: "Anime AI",
                thumbnail_url: "https://i.ibb.co/QF9d8L7F/test.jpg", 
                prompt: "anime style, cel shading, vibrant colors",
                type: "ai_filter"
            },
            {
                id: "gold",
                name: "Golden Hour AI",
                thumbnail_url: "https://i.ibb.co/QF9d8L7F/test.jpg", 
                prompt: "cinematic portrait, warm golden hour light",
                type: "ai_filter"
            },
            { 
                id: "pb_cortis", 
                name: "Photobooth Cortis", 
                thumbnail_url: "https://i.ibb.co/QF9d8L7F/test.jpg", 
                prompt: "cortis style", 
                type: "ai_filter" 
            },
            { 
                id: "pb_hello_kitty", 
                name: "Khung Hello Kitty", 
                thumbnail_url: "https://i.ibb.co/QF9d8L7F/test.jpg", 
                prompt: "hello kitty frame", 
                type: "ai_filter" 
            }
        ]
    });
}

$done({ body: JSON.stringify(obj) });
