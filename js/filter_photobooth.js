// File 3: Filter & Photobooth (Trỏ về Worker của BẠN)
var obj = JSON.parse($response.body);
if (obj && obj.entries) {
    // Bật các cờ báo hiệu có Filter
    obj.entries.photobooth_enabled = "true";
    obj.entries.photobooth_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.custom_filter_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.ai_filter_url = "https://locket-photobooth.akaphuoc28.workers.dev/";

    // GHI ĐÈ CẤU HÌNH FILTER
    obj.entries.camera_filter_config = JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: true, // Tự động mở khi vào Camera
        sheet_filters: [
            { title: { en: "Photobooth AI 🤖" }, filter_ids: ["pb_one_piece", "anime"] }
        ],
        picker_filters: ["pb_one_piece", "anime"],
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
