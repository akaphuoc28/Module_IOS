// ============================================================
// Locket Remote Config - Bản Full (Không xung đột)
// Giao diện Duy Vinh + Filter gốc + Photobooth AI
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. CẤU HÌNH FILTER & PHOTOBOOTH
    // ============================================================
    obj.entries.photobooth_enabled = "true";
    obj.entries.photobooth_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.custom_filter_api_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    obj.entries.ai_filter_url = "https://locket-photobooth.akaphuoc28.workers.dev/";
    
    obj.entries.camera_filter_config = JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: true,
        sheet_filters: [
            // Filter gốc của Locket
            { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
            { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
            { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
            { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
            { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
            { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] },
            
            // Filter của bạn
            { title: { en: "Photobooth AI 🤖" }, filter_ids: ["pb_one_piece", "anime"] }
        ],
        picker_filters: [
            "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
            "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
            "tatted", "mohawk", "braces", "slimed", "princess",
            "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
            "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
            "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
            "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty",
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

    // ============================================================
    // 2. CẤU HÌNH GOLD, VIDEO, THÔNG BÁO (Của Duy Vinh)
    // ============================================================
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({ 
            app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled", 
            locket_views: "enabled", long_captions: "enabled", longer_video: "enabled", 
            unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled", 
            remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled", 
            streak_recovery: "enabled" 
        }),
        upsell_features: JSON.stringify({ app_icon_picker: true, camera_roll: true, camera_theme: true, locket_views: true, remove_ads: true, custom_widget_frames: true }),
        paywall_presentation_config: JSON.stringify({ uid: "paywall_testflight", onboarding: false, after_sent_moment: false, on_foreground: false, interval: 2592000, profile_banner: true }),
        android_subscribe_gold_button_enabled: "false", profile_badge_visible: "true",
        
        // CẤU HÌNH VIDEO 60s
        camera: JSON.stringify({ gold_max_duration: 60.0, max_duration: 60.0, ultra_wide: true, volume_button: true, flash_button: true, telephoto: true, quality_mbps: 1.5 }),
        camera_roll: JSON.stringify({ gold_max_duration: 60.0, max_duration: 60.0, quality_mbps: 1.5, flash_button: true }),
        live_photos: JSON.stringify({ capture: true, viewing: true, catch_up: true }),
        camera_roll_preview_enabled: "true", camera_roll_video_enabled: "true", camera_roll_video_upload_enabled: "true", internal_camera_roll_video_upload_enabled: "true", longer_camera_roll_videos_enabled: "true", camera_roll_video_max_duration: "60.0", camera_roll_max_duration: "60.0", camera_roll_duration: "60.0", max_video_duration: "60.0", video_max_duration: "60.0", video_trim_max_duration: "60.0", trim_max_duration: "60.0", gold_max_duration: "60.0", goldMaxDuration: "60.0", video_quality_mbps: "1.5", video_sound_enabled: "true", microphone_enabled: "true", camera_microphone_enabled: "true", audio_session_deactivation_enabled: "true", zoom_enabled: "true",

        // THÔNG BÁO
        live_activity_onboarding: "true", live_activity_onboarding_variant: "friending", 
        register_live_activity_push_to_start_token: "true", live_activity_remove_stale_start_token: "true", 
        notification_preferences_live_activities: "true", notification_preferences: "true", 
        notification_reply_body_visible: "true", prompt_notification_permissions_after_friending: "true", 
        activity_bar_enabled: "true", journal_activity_bar_enabled: "true"
    });

    // ============================================================
    // 3. OVERLAY & CUSTOM CAPTIONS (Của Duy Vinh - Bản đầy đủ)
    // ============================================================
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        captions_enabled: "true",
        music_caption_enabled: "true",
        music_caption_song_preview_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_items: JSON.stringify([
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
                    { overlay_id: "caption:christmas_eve_2026", source: "remote", caption: { background: { colors: ["#2FA85F", "#176B3A"] }, icon: { data: "🕯️", type: "emoji" }, max_lines: 1, text: "Giáng sinh an lành", text_color: "#FFFFFF", type: "static_content" } }
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
                section: "🎨 Decorative by Duy Vinh",
                items: [
                    { overlay_id: "caption:duyvinh09", source: "remote", caption: { background: { colors: ["#B8E7FF", "#A8F5D0", "#DCCBFF"] }, max_lines: 1, text: "💻 duyvinh09", text_color: "#183153", type: "static_content" } },
                    { overlay_id: "caption:feeling_cute", source: "remote", caption: { background: { colors: ["#F8BBD0", "#E91E63"] }, icon: { data: "🌷", type: "emoji" }, max_lines: 1, text: "Feeling Cute", text_color: "#FFFFFFE5", type: "static_content" } }
                ]
            }
        ])
    });
}
$done({ body: JSON.stringify(obj) });
