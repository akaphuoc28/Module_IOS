// ============================================================
// Locket Remote Config Rewrite (ULTIMATE STATIC - AI NATIVE)
// Base by @akaphuoc28 | Upgrade: No Battery Drain, Full Filters, Full Captions
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
    obj.entries = obj.entries || {};

    // ============================================================
    // KHO ẢNH WIDGET TĨNH (Không xoay vòng để chống nóng máy)
    // ============================================================
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
        "https://i.ibb.co/V0jNcFnJ/Ch-a-c-t-n-1080-x-1080-px-10-1.png",
        "https://i.ibb.co/5WxBX6Tt/Ch-a-c-t-n-1080-x-1080-px-11-1.png",
        "https://i.ibb.co/p6vqPvTW/Ch-a-c-t-n-1080-x-1080-px-12-1.png",
        "https://i.ibb.co/Mkn3sb56/Ch-a-c-t-n-1080-x-1080-px-13-1.png",
        "https://i.ibb.co/QFPP6fVb/Ch-a-c-t-n-1080-x-1080-px-14-1.png",
        "https://i.ibb.co/9mvm1BPN/Ch-a-c-t-n-1080-x-1080-px-15-1.png",
        "https://i.ibb.co/SwV5QwjG/Ch-a-c-t-n-1080-x-1080-px-16-1.png",
        "https://i.ibb.co/xtQHxmq2/Ch-a-c-t-n-1080-x-1080-px-17-1.png"
    ];

    // ============================================================
    // CẤU HÌNH HỆ THỐNG & FILTER
    // ============================================================
    Object.assign(obj.entries, {
        // Bật Gold và AI (Để mặc định Locket tự xử lý)
        feature_gates: JSON.stringify({ 
            app_icon_picker: "true", camera_roll: "true", camera_theme: "true", locket_views: "true", 
            long_captions: "true", longer_video: "true", unlimited_friends: "true", priority_support: "true", 
            profile_badge: "true", remove_ads: "true", video: "true", custom_widget_frames: "true", 
            streak_recovery: "true", lunar_new_year_app_icon: "true", christmas_app_icon: "true", 
            halloween_app_icon: "true", autumn_app_icon: "true",
            // Cờ AI Native
            locket_looks: "true", ai_image_generation: "true", locket_ai: "true"
        }),
        upsell_features: JSON.stringify({ app_icon_picker: true, camera_roll: true, camera_theme: true, locket_views: true, remove_ads: true, custom_widget_frames: true }),
        paywall_presentation_config: JSON.stringify({ uid: "paywall_testflight", onboarding: false, after_sent_moment: false, on_foreground: false, interval: 2592000, profile_banner: true }),
        feature_discovery_popup_config: JSON.stringify({ tag: "LOCKET GOLD", tag_gradient: true, tag_style: "gold_gradient", title: "Phước nó sống thế đấy 😎", feature_set: [ { title: "Chúc bạn có những khoảnh khắc thật đẹp ✨", body: "Hãy tận hưởng Locket Gold của bạn 💛", imageURL: "https://i.ibb.co/SwvxCVK2/image.png" } ], primary_button_title: "Đã hiểu", campaign: "locket_gold_welcome_v3", start_at: "2020-01-01T00:00:00", end_at: "2099-12-31T23:59:59", use_local_time_zone: true }),
        android_subscribe_gold_button_enabled: "false", profile_badge_visible: "true", lunar_new_year_app_icon_enabled: "true",
        app_icon_picker_enabled: "true", custom_app_icon_enabled: "true",
        settings_instagram_url: "https://www.instagram.com/aka_phw2812/", settings_facebook_url: "https://www.facebook.com/nvp2812",
        history_ads_mode: "off", history_ads_prefetch_count: "0", history_ads_prefetch_immediate: "false", history_ads_prefetch_reroute: "false", history_ads_dynamic_insertion: "false", history_ads_refresh_prefetch_on_foreground: "false", history_ads_floor_price: "0", history_ads_floor_price_att: "0", history_ad_log_displayed_on_background: "false", history_ads_debug_menu: "false", sentry_sample_rate: "0", sentry_network_tracing: "false", sentry_performance_tracking: "false", sentry_trace_sample_rate: "0", sentry_profiles_sample_rate: "0",
        
        camera: JSON.stringify({ gold_max_duration: 60.0, goldMaxDuration: 60.0, max_duration: 60.0, maxDuration: 60.0, ultra_wide: true, ultraWide: true, volume_button: true, volumeButton: true, flash_button: true, telephoto: true, srgb: true, lanczos: true, quality_mbps: 1.5, qualityMbps: 1.5 }),
        camera_roll: JSON.stringify({ gold_max_duration: 60.0, goldMaxDuration: 60.0, video_max_duration: 60.0, videoMaxDuration: 60.0, max_duration: 60.0, maxDuration: 60.0, trim_max_duration: 60.0, trimMaxDuration: 60.0, camera_roll_max_duration: 60.0, quality_mbps: 1.5, qualityMbps: 1.5, flash_button: true }),
        live_photos: JSON.stringify({ capture: true, viewing: true, catch_up: true, widget_looping_mode: "never" }),
        
        // SIÊU FILTER TỪ ẢNH BẠN GỬI
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true,
            show_filter_button: true,
            sheet_enabled: true,
            open_sheet_immediately: false, 
            filter_button_enabled: true,
            sheet_filters: [
                { title: { en: "Lut Filter - Chụp người" }, filter_ids: ["skintone_1", "skintone_10", "skintone_11", "skintone_12", "skintone_13"] },
                { title: { en: "Lut Filter - Chụp cảnh" }, filter_ids: ["landscape_1", "landscape_10", "landscape_11", "landscape_12", "landscape_13"] },
                { title: { en: "Lut Filter - Chụp cả" }, filter_ids: ["film_vintage_1", "film_vintage_2", "film_vintage_3", "film_vintage_4", "film_vintage_5"] },
                { title: { en: "Hài hước" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brow", "big_lips"] }
            ],
            picker_filters: [
                "skintone_1", "skintone_10", "landscape_1", "film_vintage_1", "okay_wig", "influencer", "big_lips"
            ]
        }),

        camera_roll_preview_enabled: "true", camera_roll_video_enabled: "true", camera_roll_video_upload_enabled: "true", internal_camera_roll_video_upload_enabled: "true", longer_camera_roll_videos_enabled: "true", camera_roll_video_max_duration: "60.0", camera_roll_max_duration: "60.0", camera_roll_duration: "60.0", max_video_duration: "60.0", video_max_duration: "60.0", video_trim_max_duration: "60.0", trim_max_duration: "60.0", gold_max_duration: "60.0", goldMaxDuration: "60.0", video_quality_mbps: "1.5", video_sound_enabled: "true", microphone_enabled: "true", camera_microphone_enabled: "true", audio_session_deactivation_enabled: "true", zoom_enabled: "true", upload_main: "false", upload_main_image_quality: "1.0", upload_main_image_size: "1440", upload_thumbnail_image_quality: "1.0", upload_thumbnail_image_size: "1020",
        
        max_friends_count: "999999", friend_limit_mode: "0", soft_friend_limit_threshold_count: "999999", show_friend_limit_on_cam: "false", signup_max_friends_count: "999999", celebrity_inbox_limit: "999999", friend_limit_geo_override: JSON.stringify({ experiments: {}, area_code_overrides: {} }),
        friends_sheet_locket_count_config: JSON.stringify({ items: [ { threshold: 0, icon_name: "heart" }, { threshold: 1, icon_name: "heart.fill" }, { threshold: 10, emoji: "🤍" }, { threshold: 100, emoji: "💛" }, { threshold: 500, emoji: "❤️‍🔥" }, { threshold: 1000, emoji: "🌟🫶🌟" }, { threshold: 2000, emoji: "✨💟✨" }, { threshold: 5000, emoji: "⚡️😵‍💫⚡" }, { threshold: 10000, emoji: "✨⚡️😱⚡✨" } ] }),
        friend_locket_count_config: JSON.stringify({ items: [ { threshold: 0, icon_name: "heart" }, { threshold: 1, icon_name: "heart.fill" }, { threshold: 10, emoji: "🤍" }, { threshold: 100, emoji: "💛" }, { threshold: 500, emoji: "❤️‍🔥" }, { threshold: 1000, emoji: "✨💗✨" }, { threshold: 2000, emoji: "✨️⭐️✨" }, { threshold: 5000, emoji: "✨💎✨" }, { threshold: 10000, emoji: "✨🔐💛✨" } ] }),
        new_friends_monitoring_enabled: "true", improved_friend_suggestions: "true", show_friend_suggestions_by_default: "true", emoji_friend_suggestions: "true", prompt_contact_permissions_on_search: "true", populate_phone_numbers_from_suggest_friends: "true", hide_friends_enabled: "true", hide_invite_links: "false", hide_skip_contacts: "true", show_all_contacts: "true", show_invite_suggestions: "true", show_no_friends_bottom_sheet: "false", signup_allow_skip_add_friends: "true",
        
        moment_views_enabled: "true", moment_views_v2: "true", record_moment_views: "true", notify_moment_views: "true", get_moment_views_as_cloud_function: "true", moment_reactions_v2: "true", chat_reactions_enabled: "true", conversation_reactions: "true", typing_indicators_enabled: "true", unsend_message_enabled: "true", reply_prototype_enabled: "true", messages_integration: "true", conversations_enabled: "true", fetch_moments_in_conversation: "true", hide_chat_button: "false", groups_enabled: "true", send_to_self_only_mode: "always_enabled", time_travel_rewind_v2_enabled: "true", calendar_delete_moment_enabled: "true", calendar_rewind_enabled: "false", locket_yearbook_story_sharing_encouraged: "true", rollcall_enabled: "true", rollcall_comment_actions: "true", rollcall_profile_button: "true", rollcall_prompt_export_after_share: "true", rollcall_confirm_skip_tagging: "false", rollcall_tap_to_tag_enabled: "false",
        
        widget_frame_event_max_images: "5", 
        android_widget_frame_event_enabled: "true", 
        widget_badge_enabled: "true", 
        widget_badge_v2: "true", 
        widget_stale_state_enabled: "false", 
        widget_last_sent_indicator: "false", 
        widget_sync_token_reload_mode: "clearTokenNever",
        
        widget_frame_event: JSON.stringify({ 
            uid: "static_widget_phuoc", 
            url: widgetImages[0], 
            use_local_time_zone: true, 
            placement: "below", 
            start_at: "2020-01-01T00:00:00", 
            end_at: "2099-12-31T23:59:59" 
        }),

        live_activity_onboarding: "true", live_activity_onboarding_variant: "friending", register_live_activity_push_to_start_token: "true", live_activity_remove_stale_start_token: "true", notification_preferences_live_activities: "true", notification_preferences: "true", notification_reply_body_visible: "true", prompt_notification_permissions_after_friending: "true", activity_bar_enabled: "true", journal_activity_bar_enabled: "true",
        journal_settings: JSON.stringify({ debug_menu_enabled: false, focus_animation: true, compact_header: true, friends_button: true, reverse_scroll_direction: false, streak_visualization: true, streak_visualization_style: "gradient", streak_header_minimum_count: 0, streak_visualization_minimum_count: 2, overlay_indicators: { location: true, music: true, static_content: true, weather: true } }),
        qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }), custom_profile_pics: "true", profile_menu_v2_enabled: "true",
        cdn_domain_replacements: JSON.stringify({ "firebasestorage.googleapis.com": "cdn.locketcamera.com" }), cdn_domain_replacements_video: "true", storage_bucket: "gs://locket-img", storage_bucket_video: "gs://locket-video", image_cache_max_age_sec: "157680000", image_cache_max_size: "400000000", history_cache_age_days: "1000", user_cache_max_age_sec: "691200", friends_cache_max_age_sec: "2592000", image_fetch_cache: "true", image_cache_use_shared: "true", use_doc_dir_for_image_cache: "true", efficient_history_cache_invalidation: "true", timestamp_based_history_fetches: "true", get_latest_moment_v2: "true", fetch_users_from_cloud_function: "true", refresh_interval: "60", firestore_refresh_v2: "true", firestore_refresh_v3: "true", keychain_access_retries: "true", blocked_users_cached_sync_enabled: "true", beta_features_enabled: "true", join_testflight_enabled: "true", safety_center: "true", help_center: "true", support_v2: "true", privacy_choices_setting: "true", request_att_permission: "true", invite_link_preview_variant: "4", share_history_config: JSON.stringify({ prompt_enabled: false, fetching_enabled: true }), share_history_prompt_enabled: "false", use_thumbnails_for_sharing: "true", use_thumbnails_in_timeline: "true", persist_onboarding_step: "true", onboarding_contact_permission_step: "true"
    });

    // ============================================================
    // OVERLAY & CUSTOM CAPTIONS (TĨNH HOÀN TOÀN)
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
                section: "📸 Khung Ảnh Photobooth & Custom",
                items: widgetImages.map(function(imgUrl, index) {
                    return {
                        overlay_id: "caption:test_widget_" + index,
                        source: "remote",
                        alt_text: "Khung Ảnh " + (index + 1),
                        caption: {
                            background: { image: { type: "image", data: imgUrl, source: "url" }, colors: ["#000000", "#000000"] },
                            max_lines: 1, text: "", type: "static_content"
                        }
                    };
                })
            },
            {
                section: "🌸 My life",
                items: [
                    { overlay_id: "caption:gut_mo_ningg", source: "remote", caption: { background: { colors: ["#FFB300", "#F4511E"] }, icon: { data: "🌙", type: "emoji" }, max_lines: 1, text: "Gút mơ ningg", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:gut_nayy", source: "remote", caption: { background: { colors: ["#3A1C71", "#D76D77", "#FFAF7B"] }, icon: { data: "moon.zzz.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Gút nayy", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:miss_youu", source: "remote", caption: { background: { colors: ["#ED213A", "#93291E"] }, icon: { data: "heart.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Miss youu", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:ayy_lop_dluu", source: "remote", caption: { background: { colors: ["#FF758C", "#FF7EB3"] }, icon: { data: "🫶", type: "emoji" }, max_lines: 1, text: "Ayy lớp dluu", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:minh_la_lop", source: "remote", caption: { background: { colors: ["#F2AFC6", "#F7C9D9"] }, icon: { data: "😎", type: "emoji" }, max_lines: 1, text: "Mình là lớp", text_color: "#754454", type: "static_content" } }
                ]
            },
            {
                section: "🔥 Caption Xéo Xắt & Chất Chơi",
                items: [
                    { overlay_id: "caption:ngang_vua", source: "remote", caption: { background: { colors: ["#FF0000", "#000000"] }, icon: { data: "crown.fill", type: "sf_symbol", color: "#FFD700" }, max_lines: 1, text: "ngang vua", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:kiep_sau_nguoi_mot_nha", source: "remote", caption: { background: { colors: ["#FF9A9E", "#FECFEF"] }, icon: { data: "heart.fill", type: "sf_symbol", color: "#FF0062" }, max_lines: 2, text: "Nếu có kiếp sau ta hứa với nhau ta vẫn là người một nhà", text_color: "#6A2C3A", type: "static_content" } },
                    { overlay_id: "caption:nguoi_yeu_nho_be", source: "remote", caption: { background: { colors: ["#FF758C", "#FF7EB3"] }, icon: { data: "shield.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 2, text: "Người yêu của anh nhỏ bé, vắng anh ai sẽ chở che", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:duy_nhat_hoac_bien_mat", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "flame.fill", type: "sf_symbol", color: "#FF4500" }, max_lines: 2, text: "Duy nhất hoặc biến mất. Đừng có lằng nhằng với anh, yêu ạ", text_color: "#FFD700", type: "static_content" } },
                    { overlay_id: "caption:song_to_gan", source: "remote", caption: { background: { colors: ["#00B4DB", "#0083B0"] }, icon: { data: "sparkles", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 2, text: "Sống to gan lên một chút, bạn không có nhiều khán giả tới vậy đâu.", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:anh_van_vay_lac_cac", source: "remote", caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "🤡", type: "emoji" }, max_lines: 2, text: "Anh vẫn vậy, vẫn lấc cấc, vẫn vay nợ lung tung", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:tu_te_giai_vo", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200"] }, icon: { data: "😎", type: "emoji" }, max_lines: 2, text: "Tử tế anh có thể giải vờ nhưng đẹp trai thì không", text_color: "#5D3A00", type: "static_content" } },
                    { overlay_id: "caption:don_gian_la_dep_trai", source: "remote", caption: { background: { colors: ["#FF512F", "#DD2476"] }, icon: { data: "🔥", type: "emoji" }, max_lines: 1, text: "Đơn giản là đẹp trai quáaaaaaaaa !", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:vo_ai_day_aaa", source: "remote", caption: { background: { colors: ["#F77062", "#FE5196"] }, icon: { data: "heart.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Vợ ai đây ạaa", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:khong_danh_khong_phan", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "hand.thumbsup.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Không danh không phận", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:het_tien_vi_cai_nay", source: "remote", caption: { background: { colors: ["#1FA2FF", "#12D8FA"] }, icon: { data: "creditcard.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Hết tiền vì cái này", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:qua_tang_cuoc_song", source: "remote", caption: { background: { colors: ["#ED213A", "#93291E"] }, icon: { data: "gift.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Quà tặng cuộc sống =))", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:may_chan_dong_thiet", source: "remote", caption: { background: { colors: ["#FC466B", "#3F5EFB"] }, icon: { data: "iphone.radiowaves.left.and.right", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Má chấn động thiệt chứ", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:khong_hoang_tinh_than", source: "remote", caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "face.smiling", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Không hoảng tinh thần =)))", text_color: "#FFFFFF", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Trend TikTok & Xéo Xắt Cũ",
                items: [
                    { overlay_id: "caption:tiktok_cha_de_bum", source: "remote", caption: { background: { colors: ["#434343", "#000000"] }, icon: { data: "🫥", type: "emoji" }, max_lines: 1, text: "chả để bụm,", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:tiktok_um_hum", source: "remote", caption: { background: { colors: ["#4CB8C4", "#3CD3AD"] }, icon: { data: "🤫", type: "emoji" }, max_lines: 1, text: "ùm húm,", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:tiktok_anh_la_con_nguoi", source: "remote", caption: { background: { colors: ["#FF758C", "#FF7EB3"] }, icon: { data: "🗣️", type: "emoji" }, max_lines: 1, text: "anh là con người, em cũng là con người...", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:tiktok_flop_qua", source: "remote", caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "📝", type: "emoji" }, max_lines: 1, text: "Flop quá thì ghi tên anh vào", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:tiktok_can_phuoc", source: "remote", caption: { background: { colors: ["#870000", "#190A05"] }, icon: { data: "💀", type: "emoji" }, max_lines: 1, text: "Cạn phước !", text_color: "#FFFFFF", type: "static_content" } }
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
                    { overlay_id: "caption:streak", source: "local", caption: { type: "streak" } }
                ]
            }
        ])
    });
}

$done({ body: JSON.stringify(obj) });
