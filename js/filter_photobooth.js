// ============================================================
// Locket Filter & Photobooth - Bản đầy đủ
// Giữ nguyên Filter gốc + Thêm Photobooth AI của bạn
// ============================================================

var obj = JSON.parse($response.body);
if (obj && obj.entries) {
    // Bật cờ Photobooth
    obj.entries.photobooth_enabled = "true";
    obj.entries.photobooth_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.custom_filter_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.ai_filter_url = "https://locket-photobooth.akaphuoc28.workers.dev/";

    // GHI ĐÈ CẤU HÌNH FILTER
    obj.entries.camera_filter_config = JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: true,
        sheet_filters: [
            // --- FILTER GỐC CỦA LOCKET ---
            { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
            { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
            { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
            { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
            { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
            { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] },
            
            // --- FILTER PHOTOBOOTH CỦA BẠN ---
            { title: { en: "Photobooth AI 🤖" }, filter_ids: ["pb_one_piece", "anime"] }
        ],
        picker_filters: [
            // --- FILTER GỐC ---
            "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
            "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
            "tatted", "mohawk", "braces", "slimed", "princess",
            "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
            "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
            "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
            "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty",
            
            // --- FILTER CỦA BẠN ---
            "pb_one_piece", "anime"
        ],
        custom_filters: [
            {
                id: "pb_one_piece",
                name: "Khung One Piece",
                thumbnail_url: "https://i.ibb.co/tMBXZgwM/test.png", 
                prompt: "photobooth one piece frame",
                type: "ai_filter"
            },
            {
                id: "anime",
                name: "Anime AI",
                thumbnail_url: "https://i.ibb.co/tMBXZgwM/test.png",
                prompt: "anime style, cel shading",
                type: "ai_filter"
            }
        ]
    });
}
$done({ body: JSON.stringify(obj) });
