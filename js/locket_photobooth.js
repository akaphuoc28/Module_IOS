var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};

    // Bật Gold cơ bản
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({ longer_video: "enabled", unlimited_friends: "enabled", remove_ads: "enabled", custom_widget_frames: "enabled" }),
        overlay_navigator_enabled: "true",
        captions_enabled: "true"
    });

    // CẤU HÌNH FILTER PHOTOBOOTH
    obj.entries.camera_filter_config = JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: true,
        sheet_filters: [
            { title: { en: "Photobooth AI 🤖" }, filter_ids: ["pb_one_piece"] }
        ],
        picker_filters: ["pb_one_piece"],
        custom_filters: [
            {
                id: "pb_one_piece",
                name: "Khung One Piece",
                thumbnail_url: "https://i.ibb.co/QF9d8L7F/anhtest.png", 
                prompt: "photobooth one piece frame",
                type: "ai_filter"
            }
        ]
    });
}
$done({ body: JSON.stringify(obj) });
