// ============================================================
// Locket Remote Config Rewrite (Custom Bản Nâng Cấp)
// Endpoint: firebaseremoteconfig.googleapis.com
// Dựa trên nền tảng của @duyvinh09 & @akaphuoc28
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
    obj.entries = obj.entries || {};

    // ============================================================
    // XỬ LÝ THỜI GIAN ĐỘNG (Đã tối ưu để không bị cắt chữ)
    // ============================================================
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();
    var date = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    var greetingTime;
    if (hour >= 5 && hour < 11) greetingTime = "Chào buổi sáng ☀️";
    else if (hour >= 11 && hour < 14) greetingTime = "Chào buổi trưa 🌤️";
    else if (hour >= 14 && hour < 18) greetingTime = "Chào buổi chiều 🌇";
    else if (hour >= 18 && hour < 22) greetingTime = "Chào buổi tối 🌆";
    else greetingTime = "Khuya rồi ngủ đi 🌙";

    var greetingDay;
    if (day === 0) greetingDay = "Chủ nhật chill nhé 🛋️";
    else if (day === 1) greetingDay = "Thứ 2 đầu tuần cố lên 💪";
    else if (day === 6) greetingDay = "Thứ 7 vui vẻ nha 🎉";
    else greetingDay = "Ngày thường nhưng vẫn chất 😎";

    var greetingSeason;
    if (month >= 3 && month <= 5) greetingSeason = "Mùa xuân ấm áp 🌸";
    else if (month >= 6 && month <= 8) greetingSeason = "Mùa hè rực rỡ ☀️";
    else if (month >= 9 && month <= 11) greetingSeason = "Mùa thu lá vàng 🍂";
    else greetingSeason = "Mùa đông lạnh giá ❄️";

    var events = [
        { name: "Tết", date: new Date(year + 1, 0, 29), emoji: "🧧" },
        { name: "Valentine", date: new Date(year, 1, 14), emoji: "💝" },
        { name: "8/3", date: new Date(year, 2, 8), emoji: "🌹" },
        { name: "Trung Thu", date: new Date(year, 8, 25), emoji: "🏮" },
        { name: "Noel", date: new Date(year, 11, 25), emoji: "🎄" },
        { name: "Sinh nhật Phước", date: new Date(year, 11, 28), emoji: "🎂" },
        { name: "Năm mới", date: new Date(year + 1, 0, 1), emoji: "🎆" }
    ];

    var eventCountdown = "";
    var minDays = 9999;
    events.forEach(function(ev) {
        var diff = Math.ceil((ev.date - now) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < minDays) {
            minDays = diff;
            eventCountdown = ev.emoji + " " + diff + " ngày: " + ev.name; // Rút gọn
        }
    });

    var specialDayCaption = "";
    if (month === 12 && date === 28) specialDayCaption = "🎂 Sinh nhật Phước! 🎉";
    else if (month === 2 && date === 14) specialDayCaption = "💝 Valentine vui vẻ!";
    else if (month === 1 && date === 1) specialDayCaption = "🎆 Năm mới an khang!";
    else if (month === 12 && date === 25) specialDayCaption = "🎄 Giáng sinh an lành!";
    else if (month === 9 && date === 2) specialDayCaption = "🇻🇳 Quốc khánh VN!";
    else if (month === 3 && date === 8) specialDayCaption = "🌹 Quốc tế Phụ nữ!";

    // ============================================================
    // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL
    // ============================================================
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({
            app_icon_picker: "enabled",
            camera_roll: "enabled",
            camera_theme: "enabled",
            locket_views: "enabled",
            long_captions: "enabled",
            longer_video: "enabled",
            unlimited_friends: "enabled",
            priority_support: "enabled",
            profile_badge: "enabled",
            remove_ads: "enabled",
            video: "enabled",
            custom_widget_frames: "enabled",
            streak_recovery: "enabled"
        }),
        upsell_features: JSON.stringify({
            app_icon_picker: true,
            camera_roll: true,
            camera_theme: true,
            locket_views: true,
            remove_ads: true,
            custom_widget_frames: true
        }),
        paywall_presentation_config: JSON.stringify({
            uid: "paywall_testflight",
            onboarding: false,
            after_sent_moment: false,
            on_foreground: false,
            interval: 2592000,
            profile_banner: true
        }),
        feature_discovery_popup_config: JSON.stringify({
            tag: "LOCKET GOLD",
            tag_gradient: true,
            tag_style: "gold_gradient",
            title: "Phước nó sống thế đấy 😎",
            feature_set: [
                {
                    title: "Chúc bạn có những khoảnh khắc thật đẹp ✨",
                    body: "Hãy tận hưởng Locket Gold của bạn 💛",
                    imageURL: "https://i.ibb.co/SwvxCVK2/image.png"
                }
            ],
            primary_button_title: "Đã hiểu",
            campaign: "locket_gold_welcome_v3",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59",
            use_local_time_zone: true
        }),
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
        history_ads_mode: "off",
        history_ads_prefetch_count: "0",
        history_ads_prefetch_immediate: "false",
        history_ads_prefetch_reroute: "false",
        history_ads_dynamic_insertion: "false",
        history_ads_refresh_prefetch_on_foreground: "false",
        history_ads_floor_price: "0",
        history_ads_floor_price_att: "0",
        history_ad_log_displayed_on_background: "false",
        history_ads_debug_menu: "false",
        sentry_sample_rate: "0",
        sentry_network_tracing: "false",
        sentry_performance_tracking: "false",
        sentry_trace_sample_rate: "0",
        sentry_profiles_sample_rate: "0"
    });

    // ============================================================
    // 3. CAMERA, VIDEO, FILTERS
    // ============================================================
    Object.assign(obj.entries, {
        camera: JSON.stringify({
            gold_max_duration: 30.0,
            goldMaxDuration: 30.0,
            max_duration: 30.0,
            maxDuration: 30.0,
            ultra_wide: true,
            ultraWide: true,
            volume_button: true,
            volumeButton: true,
            flash_button: true,
            telephoto: true,
            srgb: true,
            lanczos: true,
            quality_mbps: 0.9,
            qualityMbps: 0.9
        }),
        camera_roll: JSON.stringify({
            gold_max_duration: 30.0,
            goldMaxDuration: 30.0,
            video_max_duration: 30.0,
            videoMaxDuration: 30.0,
            max_duration: 30.0,
            maxDuration: 30.0,
            trim_max_duration: 30.0,
            trimMaxDuration: 30.0,
            camera_roll_max_duration: 30.0,
            quality_mbps: 0.9,
            qualityMbps: 0.9,
            flash_button: true
        }),
        live_photos: JSON.stringify({
            capture: true,
            viewing: true,
            catch_up: true,
            widget_looping_mode: "never"
        }),
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true,
            show_filter_button: true,
            sheet_enabled: true,
            open_sheet_immediately: true,
            sheet_filters: [
                { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
                { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
                { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
                { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
                { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
                { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
            ],
            picker_filters: [
                "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
                "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
                "tatted", "mohawk", "braces", "slimed", "princess",
                "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
                "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
                "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
                "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"
            ]
        }),
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        internal_camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        camera_roll_video_max_duration: "30.0",
        camera_roll_max_duration: "30.0",
        camera_roll_duration: "30.0",
        max_video_duration: "30.0",
        video_max_duration: "30.0",
        video_trim_max_duration: "30.0",
        trim_max_duration: "30.0",
        gold_max_duration: "30.0",
        goldMaxDuration: "30.0",
        video_quality_mbps: "0.9",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        zoom_enabled: "true",
        upload_main: "false",
        upload_main_image_quality: "1.0",
        upload_main_image_size: "1440",
        upload_thumbnail_image_quality: "1.0",
        upload_thumbnail_image_size: "1020"
    });

    // ============================================================
    // 4. BẠN BÈ & GIỚI HẠN
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999",
        friend_limit_mode: "0",
        soft_friend_limit_threshold_count: "999999",
        show_friend_limit_on_cam: "false",
        signup_max_friends_count: "999999",
        celebrity_inbox_limit: "999999",
        friend_limit_geo_override: JSON.stringify({ experiments: {}, area_code_overrides: {} }),
        friends_sheet_locket_count_config: JSON.stringify({
            items: [
                { threshold: 0, icon_name: "heart" },
                { threshold: 1, icon_name: "heart.fill" },
                { threshold: 10, emoji: "🤍" },
                { threshold: 100, emoji: "💛" },
                { threshold: 500, emoji: "❤️‍🔥" },
                { threshold: 1000, emoji: "🌟🫶🌟" },
                { threshold: 2000, emoji: "✨💟✨" },
                { threshold: 5000, emoji: "⚡️😵‍💫⚡" },
                { threshold: 10000, emoji: "✨⚡️😱⚡✨" }
            ]
        }),
        friend_locket_count_config: JSON.stringify({
            items: [
                { threshold: 0, icon_name: "heart" },
                { threshold: 1, icon_name: "heart.fill" },
                { threshold: 10, emoji: "🤍" },
                { threshold: 100, emoji: "💛" },
                { threshold: 500, emoji: "❤️‍🔥" },
                { threshold: 1000, emoji: "✨💗✨" },
                { threshold: 2000, emoji: "✨️⭐️✨" },
                { threshold: 5000, emoji: "✨💎✨" },
                { threshold: 10000, emoji: "✨🔐💛✨" }
            ]
        }),
        new_friends_monitoring_enabled: "true",
        improved_friend_suggestions: "true",
        show_friend_suggestions_by_default: "true",
        emoji_friend_suggestions: "true",
        prompt_contact_permissions_on_search: "true",
        populate_phone_numbers_from_suggest_friends: "true",
        hide_friends_enabled: "true",
        hide_invite_links: "false",
        hide_skip_contacts: "true",
        show_all_contacts: "true",
        show_invite_suggestions: "true",
        show_no_friends_bottom_sheet: "false",
        signup_allow_skip_add_friends: "true"
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
        moment_views_enabled: "true",
        moment_views_v2: "true",
        record_moment_views: "true",
        notify_moment_views: "true",
        get_moment_views_as_cloud_function: "true",
        moment_reactions_v2: "true",
        chat_reactions_enabled: "true",
        conversation_reactions: "true",
        typing_indicators_enabled: "true",
        unsend_message_enabled: "true",
        reply_prototype_enabled: "true",
        messages_integration: "true",
        conversations_enabled: "true",
        fetch_moments_in_conversation: "true",
        hide_chat_button: "false",
        groups_enabled: "true",
        send_to_self_only_mode: "always_enabled",
        time_travel_rewind_v2_enabled: "true",
        calendar_delete_moment_enabled: "true",
        calendar_rewind_enabled: "false",
        locket_yearbook_story_sharing_encouraged: "true",
        rollcall_enabled: "true",
        rollcall_comment_actions: "true",
        rollcall_profile_button: "true",
        rollcall_prompt_export_after_share: "true",
        rollcall_confirm_skip_tagging: "false",
        rollcall_tap_to_tag_enabled: "false"
    });

    // ============================================================
    // 6. WIDGET, THÔNG BÁO & GIAO DIỆN
    // ============================================================
    Object.assign(obj.entries, {
        widget_frame_event_max_images: "5",
        android_widget_frame_event_enabled: "true",
        widget_badge_enabled: "true",
        widget_badge_v2: "true",
        widget_stale_state_enabled: "false",
        widget_last_sent_indicator: "false",
        widget_sync_token_reload_mode: "clearTokenNever",
        widget_frame_event: JSON.stringify({
            uid: "midautumn_2026",
            url: "https://i.ibb.co/RTm5P1n9/kitty-1.png",
            use_local_time_zone: true,
            placement: "below",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59"
        }),
        live_activity_onboarding: "true",
        live_activity_onboarding_variant: "friending",
        register_live_activity_push_to_start_token: "true",
        live_activity_remove_stale_start_token: "true",
        notification_preferences_live_activities: "true",
        notification_preferences: "true",
        notification_reply_body_visible: "true",
        prompt_notification_permissions_after_friending: "true",
        activity_bar_enabled: "true",
        journal_activity_bar_enabled: "true",
        journal_settings: JSON.stringify({
            debug_menu_enabled: false,
            focus_animation: true,
            compact_header: true,
            friends_button: true,
            reverse_scroll_direction: false,
            streak_visualization: true,
            streak_visualization_style: "gradient",
            streak_header_minimum_count: 0,
            streak_visualization_minimum_count: 2,
            overlay_indicators: { location: true, music: true, static_content: true, weather: true }
        }),
        qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
        custom_profile_pics: "true",
        profile_menu_v2_enabled: "true"
    });

    // ============================================================
    // 7. HỆ THỐNG & CACHE
    // ============================================================
    Object.assign(obj.entries, {
        cdn_domain_replacements: JSON.stringify({
            "firebasestorage.googleapis.com": "cdn.locketcamera.com"
        }),
        cdn_domain_replacements_video: "true",
        storage_bucket: "gs://locket-img",
        storage_bucket_video: "gs://locket-video",
        image_cache_max_age_sec: "157680000",
        image_cache_max_size: "400000000",
        history_cache_age_days: "1000",
        user_cache_max_age_sec: "691200",
        friends_cache_max_age_sec: "2592000",
        image_fetch_cache: "true",
        image_cache_use_shared: "true",
        use_doc_dir_for_image_cache: "true",
        efficient_history_cache_invalidation: "true",
        timestamp_based_history_fetches: "true",
        get_latest_moment_v2: "true",
        fetch_users_from_cloud_function: "true",
        refresh_interval: "60",
        firestore_refresh_v2: "true",
        firestore_refresh_v3: "true",
        keychain_access_retries: "true",
        blocked_users_cached_sync_enabled: "true",
        beta_features_enabled: "true",
        join_testflight_enabled: "true",
        safety_center: "true",
        help_center: "true",
        support_v2: "true",
        privacy_choices_setting: "true",
        request_att_permission: "true",
        invite_link_preview_variant: "4",
        share_history_config: JSON.stringify({ prompt_enabled: false, fetching_enabled: true }),
        share_history_prompt_enabled: "false",
        use_thumbnails_for_sharing: "true",
        use_thumbnails_in_timeline: "true",
        persist_onboarding_step: "true",
        onboarding_contact_permission_step: "true"
    });

    // ============================================================
    // 8. OVERLAY & CUSTOM CAPTIONS (ĐÃ CẬP NHẬT CHUẨN ẢNH)
    // ============================================================
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
        captions_enabled: "true",
        music_caption_enabled: "true",
        music_caption_song_preview_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_dynamic_captions: JSON.stringify([
            "standard", "poll", "color_palette", "review", "music", "location",
            "weather", "time", "streak", "star_sign", "party_time", "locket_count",
            "good_morning", "goodnight", "ootd", "miss_you", "custom", "phunu_2010", "halloween_2026"
        ]),
        overlay_items: JSON.stringify([
            {
                section: "🕐 Theo thời gian",
                items: [
                    {
                        overlay_id: "caption:greeting_time",
                        source: "remote",
                        caption: { background: { colors: ["#FFD700", "#FF8C00"] }, icon: { data: "⏰", type: "emoji" }, max_lines: 1, text: greetingTime, text_color: "#FFFFFFE6", type: "static_content" }
                    },
                    {
                        overlay_id: "caption:greeting_day",
                        source: "remote",
                        caption: { background: { colors: ["#4CAF50", "#2E7D32"] }, icon: { data: "📅", type: "emoji" }, max_lines: 1, text: greetingDay, text_color: "#FFFFFFE6", type: "static_content" }
                    },
                    {
                        overlay_id: "caption:greeting_season",
                        source: "remote",
                        caption: { background: { colors: ["#FFAFBD", "#FFC3A0"] }, icon: { data: "🌿", type: "emoji" }, max_lines: 1, text: greetingSeason, text_color: "#000000E6", type: "static_content" }
                    },
                    {
                        overlay_id: "caption:event_countdown",
                        source: "remote",
                        caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "🎯", type: "emoji" }, max_lines: 1, text: eventCountdown || "Sắp có sự kiện rồi! ✨", text_color: "#FFFFFFE6", type: "static_content" }
                    },
                    {
                        overlay_id: "caption:special_day",
                        source: "remote",
                        caption: { background: { colors: ["#FF0062", "#FF783F"] }, icon: { data: "🎊", type: "emoji" }, max_lines: 1, text: specialDayCaption || "Hôm nay là ngày đẹp trời 🌤️", text_color: "#FFFFFFE6", type: "static_content" }
                    }
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
                    { overlay_id: "caption:no_memory", source: "remote", caption: { background: { image: { type: "image", data: "https://public.locketcamera.com/locket-public/overlays/forgotten_island/forgotten_island_bg.png", source: "url" }, colors: ["#1A1A2E", "#16213E"] }, max_lines: 1, text: "NO MEMORY LEFT BEHIND", text_color: "#FFFFFFE6", type: "static_content" } },
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
                section: "🎨 Ảnh Nền (Custom)",
                items: [
                    { 
                        overlay_id: "caption:love_vietnam", 
                        source: "remote", 
                        alt_text: "Tôi yêu Việt Nam", 
                        caption: { 
                            background: { 
                                image: { type: "image", data: "https://i.ibb.co/1t92SQbJ/download-1.jpghttps://i.ibb.co/gM3RXPG8/download-1.png", source: "url" }, 
                                colors: ["#DA251D", "#DA251D"] 
                            }, 
                            icon: { type: "image", data: "https://storage.googleapis.com/locket-public/journal_calendar_assets/holiday_indicators/valentines_indicator%403x.png", source: "url" }, 
                            max_lines: 1, 
                            text: "Tôi yêu Việt Nam", 
                            text_color: "#FFFF00", 
                            type: "static_content" 
                        } 
                    },
                    { 
                        overlay_id: "caption:film_diary", 
                        source: "remote", 
                        alt_text: "Một ngày rất chill", 
                        caption: { 
                            background: { 
                                image: { type: "image", data: "https://public.locketcamera.com/locket-public/gold_promos/gold_promo_camera_roll.png", source: "url" }, 
                                colors: ["#D2B48C", "#8B4513"] 
                            }, 
                            icon: { type: "image", data: "https://public.locketcamera.com/locket-public/journal_calendar_assets/holiday_indicators/st_patricks_indicator%403x.png", source: "url" }, 
                            max_lines: 1, 
                            text: "Một ngày rất chill", 
                            text_color: "#FFFDD0", 
                            type: "static_content" 
                        } 
                    },
                    { 
                        overlay_id: "caption:strangers", 
                        source: "remote", 
                        alt_text: "Người lạ", 
                        caption: { 
                            background: { 
                                image: { type: "image", data: "https://public.locketcamera.com/locket-public/gold_promos/gold_promo_views.png", source: "url" }, 
                                colors: ["#1C1C1E", "#2C2C2E"] 
                            }, 
                            icon: { data: "eye.fill", type: "sf_symbol", color: "#0A84FF" }, 
                            max_lines: 1, 
                            text: "Người lạ", 
                            text_color: "#FFFFFF", 
                            type: "static_content" 
                        } 
                    },
                    { 
                        overlay_id: "caption:genz_flex", 
                        source: "remote", 
                        alt_text: "Mood: Chill", 
                        caption: { 
                            background: { 
                                image: { type: "image", data: "https://public.locketcamera.com/locket-public/gold_promos/gold_promo_widgets.png", source: "url" }, 
                                colors: ["#FF9A9E", "#FECFEF"] 
                            }, 
                            icon: { data: "camera.fill", type: "sf_symbol", color: "#FF007F" }, 
                            max_lines: 1, 
                            text: "Mood: Chill 💅", 
                            text_color: "#FFFFFF", 
                            type: "static_content" 
                        } 
                    }
                ]
            },
            {
                section: "🎨 Chứng nhận từ Locket",
                items: [
                    { overlay_id: "caption:locket_cuti", source: "remote", caption: { background: { colors: ["#35B5E8", "#19A1D8"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn cutii", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:locket_xinh", source: "remote", caption: { background: { colors: ["#FFD45C", "#F5B91E"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn xjnh gái", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:locket_dep", source: "remote", caption: { background: { colors: ["#258DEB", "#1672D4"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn đẹp chai", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:locket_dangiu", source: "remote", caption: { background: { colors: ["#FF638B", "#F44772"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn dangiu", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:gai_dep", source: "remote", caption: { background: { colors: ["#FF91AE", "#F8759B"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Đã xác minh bạn là gái đẹp", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:trai_dep", source: "remote", caption: { background: { colors: ["#4A9FEF", "#267DD7"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Đã xác minh bạn là trai đẹp", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:be_ngoan", source: "remote", caption: { background: { colors: ["#E9B9C5", "#D9A4B3"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Đã xác nhận bạn là bé ngoan", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:tuyen_duong", source: "remote", caption: { background: { colors: ["#D94A77", "#B82D59"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket tuyên dương bạn cute", text_color: "#FFFFFF", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Tình yêu & Cơm chó 💕",
                items: [
                    { overlay_id: "caption:em_nho_anhh", source: "remote", caption: { background: { colors: ["#FF6B81", "#FF8E9E", "#FFB3C6"] }, icon: { data: "🥺", type: "emoji" }, max_lines: 1, text: "em nhớ anhh", text_color: "#8C1938", type: "static_content" } },
                    { overlay_id: "caption:i_love_you", source: "remote", caption: { background: { colors: ["#FF8FAB", "#FFC2D1", "#FFE5EC"] }, icon: { data: "💗", type: "emoji" }, max_lines: 1, text: "i love you", text_color: "#8A304F", type: "static_content" } },
                    { overlay_id: "caption:yeu_cuc_dang", source: "remote", caption: { background: { colors: ["#F2B5C8", "#F8D5D9", "#F6E5D2"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "yêu cục dàng", text_color: "#754454", type: "static_content" } },
                    { overlay_id: "caption:yeu_emmm", source: "remote", caption: { background: { colors: ["#F2AFC6", "#F7C9D9", "#E5CFF4"] }, icon: { data: "💗", type: "emoji" }, max_lines: 1, text: "Yeu Emmm", text_color: "#70445C", type: "static_content" } },
                    { overlay_id: "caption:cho_hun_mieng", source: "remote", caption: { background: { colors: ["#F3AFC7", "#F8D0D8", "#F4C9BB"] }, icon: { data: "😘", type: "emoji" }, max_lines: 1, text: "cho hun miếng coi", text_color: "#754252", type: "static_content" } },
                    { overlay_id: "caption:me_anh_me_ngu", source: "remote", caption: { background: { colors: ["#C4C8EF", "#DED3F4", "#EBCDE4"] }, icon: { data: "💤", type: "emoji" }, max_lines: 1, text: "mê anh hơn mê ngủ", text_color: "#4F4770", type: "static_content" } },
                    { overlay_id: "caption:be_be_can_do", source: "remote", caption: { background: { colors: ["#FF8FAB", "#FFC2D1", "#FFE5EC"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "em bé cần được dỗ", text_color: "#812D4A", type: "static_content" } },
                    { overlay_id: "caption:iu_hong_thi_bao", source: "remote", caption: { background: { colors: ["#FF6B6B", "#FF9999", "#FFD1C9"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "iu hong thì bảo", text_color: "#812626", type: "static_content" } },
                    { overlay_id: "caption:anh_thuong_em", source: "remote", caption: { background: { colors: ["#A0C4FF", "#BDE0FE", "#DFF3FF"] }, icon: { data: "🥹", type: "emoji" }, max_lines: 1, text: "anh có thương em thiệt hong", text_color: "#23466F", type: "static_content" } },
                    { overlay_id: "caption:minh_cuoi_nhau", source: "remote", caption: { background: { colors: ["#F0B8CD", "#F7D4DF", "#E7C9EF"] }, icon: { data: "💍", type: "emoji" }, max_lines: 1, text: "hông ấy mình cưới nhau đi", text_color: "#70465B", type: "static_content" } },
                    { overlay_id: "caption:muon_duoc_om", source: "remote", caption: { background: { colors: ["#FF9A9E", "#FECFEF"] }, icon: { data: "🫂", type: "emoji" }, max_lines: 1, text: "Muốn được ôm", text_color: "#FFFFFF", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Gen Z & Xéo xắt 💅",
                items: [
                    { overlay_id: "caption:xinh_dep_tuyet_voi", source: "remote", caption: { background: { colors: ["#FC5C7D", "#6A82FB"] }, icon: { data: "💅", type: "emoji" }, max_lines: 1, text: "Xinh đẹp tuyệt vời", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:hom_nay_slay", source: "remote", caption: { background: { colors: ["#C5B5E8", "#DDD0F2", "#F0C9DD"] }, icon: { type: "sf_symbol", data: "sparkles", color: "#514368" }, max_lines: 1, text: "hôm nay cũng slay", text_color: "#514368", type: "static_content" } },
                    { overlay_id: "caption:tinh_hoa_hoi_tu", source: "remote", caption: { background: { image: { type: "image", data: "star_sign_background", source: "local" }, colors: ["#FFD700", "#FF8C00"] }, icon: { type: "sf_symbol", data: "wand.and.sparkles", color: "#000000E6" }, max_lines: 1, text: "Tinh hoa hội tụ", text_color: "#000000E6", type: "static_content" } },                    
                    { overlay_id: "caption:xinh_gai_an_phim_1", source: "remote", caption: { background: { colors: ["#F77062", "#FE5196"] }, icon: { data: "💅", type: "emoji" }, max_lines: 1, text: "Xinh gái ấn phím 1", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:dep_trai_co_gi_sai", source: "remote", caption: { background: { colors: ["#FF5722", "#FFC107"] }, icon: { data: "😎", type: "emoji" }, max_lines: 1, text: "Đẹp trai có gì sai", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:phu_tinh_khong_phu_ban", source: "remote", caption: { background: { colors: ["#8E2DE2", "#4A00E0"] }, icon: { data: "🕶️", type: "emoji" }, max_lines: 1, text: "Phụ tình không phụ bản", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:sieu_cap_ba_khi", source: "remote", caption: { background: { colors: ["#EC407A", "#F44336"] }, icon: { data: "🐉", type: "emoji" }, max_lines: 1, text: "siêu cấp bá khí", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:ra_duong_ne_moi_anh", source: "remote", caption: { background: { colors: ["#BCC5D6", "#D7DEEA", "#EDE8F5"] }, icon: { data: "🕶️", type: "emoji" }, max_lines: 1, text: "Ra đường nể mỗi anh", text_color: "#384358", type: "static_content" } },
                    { overlay_id: "caption:nhin_la_biet_uy_tin", source: "remote", caption: { background: { colors: ["#2980B9", "#2C3E50"] }, icon: { data: "👌", type: "emoji" }, max_lines: 1, text: "Nhìn là biết uy tín", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:flex_den_hoi_tho_cuoi", source: "remote", caption: { background: { colors: ["#00BFA5", "#64E8C8", "#C4FFF0"] }, icon: { data: "💎", type: "emoji" }, max_lines: 1, text: "Flex đến hơi thở cuối", text_color: "#064D43", type: "static_content" } },
                    { overlay_id: "caption:tui_khong_hon_thua", source: "remote", caption: { background: { colors: ["#8E2430", "#C0394B", "#F08A8E"] }, icon: { data: "😎", type: "emoji" }, max_lines: 1, text: "tui không hơn thua, tui hơn hẳn", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:khong_phai_gu", source: "remote", caption: { background: { colors: ["#FF6F91", "#FF9A9E", "#FFD1BA"] }, icon: { data: "💅", type: "emoji" }, max_lines: 1, text: "không phải gu của tất cả, may quá", text_color: "#70243D", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Bất ổn & Hết cứu 🫠",
                items: [
                    { overlay_id: "caption:bat_on_that_su", source: "remote", caption: { background: { colors: ["#636363", "#A2AB58"] }, icon: { data: "🫠", type: "emoji" }, max_lines: 1, text: "Bất ổn thật sự", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:nay_la_het_cuu", source: "remote", caption: { background: { colors: ["#607D8B", "#455A64"] }, icon: { type: "sf_symbol", data: "bolt.badge.xmark", color: "#FFFFFFE6" }, max_lines: 1, text: "Này là hết cứu", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:toang_that_roi", source: "remote", caption: { background: { colors: ["#F44336", "#B71C1C"] }, icon: { data: "🐉", type: "emoji" }, max_lines: 1, text: "Toang thật rồi", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:guc_nga", source: "remote", caption: { background: { colors: ["#3A1C71", "#D76D77"] }, icon: { data: "📉", type: "emoji" }, max_lines: 1, text: "Gục ngã", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:nao_bao_tri", source: "remote", caption: { background: { colors: ["#B8E0D2", "#D8EAD8", "#C9D9F0"] }, icon: { data: "🧠", type: "emoji" }, max_lines: 1, text: "não đang bảo trì", text_color: "#35564F", type: "static_content" } },
                    { overlay_id: "caption:overthinking_vai_chuong", source: "remote", caption: { background: { colors: ["#2C3E50", "#4CA1AF"] }, icon: { data: "🤯", type: "emoji" }, max_lines: 1, text: "Overthinking vai chưởng", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:tram_cam_nhe", source: "remote", caption: { background: { colors: ["#1F1C2C", "#928DAB"] }, icon: { data: "🫠", type: "emoji" }, max_lines: 1, text: "Trầm cảm nhẹ", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:khong_cam_xuc", source: "remote", caption: { background: { colors: ["#434343", "#000000"] }, icon: { data: "🗿", type: "emoji" }, max_lines: 1, text: "Không cảm xúc", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:em_on_ap_luc", source: "remote", caption: { background: { colors: ["#FFB26B", "#FFD08A", "#FFF0B5"] }, icon: { data: "🥲", type: "emoji" }, max_lines: 1, text: "em ổn, ổn áp lực", text_color: "#70401F", type: "static_content" } },
                    { overlay_id: "caption:ai_cuu_tui", source: "remote", caption: { background: { colors: ["#F0B6B6", "#F5D0C3", "#E8C6DE"] }, icon: { data: "sos", type: "sf_symbol", color: "#6A4248"  }, max_lines: 1, text: "òi ai cứu tui", text_color: "#6A4248", type: "static_content" } },
                    { overlay_id: "caption:doi_roi", source: "remote", caption: { background: { colors: ["#FF5F6D", "#FFC371"] }, icon: { data: "😤", type: "emoji" }, max_lines: 1, text: "Dỗi rồi", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:ua_alo", source: "remote", caption: { background: { colors: ["#FFB347", "#FFD166", "#FFF0A8"] }, icon: { data: "questionmark", type: "sf_symbol", color: "#654018" }, max_lines: 1, text: "Ủa alo", text_color: "#654018", type: "static_content" } },
                    { overlay_id: "caption:vl_m_oi", source: "remote", caption: { background: { colors: ["#20212D", "#51566D", "#A8B4C9"] }, icon: { data: "😳", type: "emoji" }, max_lines: 1, text: "vl m ơi?", text_color: "#FFFFFF", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Deadline & Tiền bạc 💸",
                items: [
                    { overlay_id: "caption:deadline_ruot", source: "remote", caption: { background: { colors: ["#ED213A", "#93291E"] }, icon: { data: "🔥", type: "emoji" }, max_lines: 1, text: "Deadline dí tụt quần", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:di_lam_vi_dam_me", source: "remote", caption: { background: { colors: ["#FDC830", "#F37335"] }, icon: { data: "🤡", type: "emoji" }, max_lines: 1, text: "Đi làm vì đam mê", text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:ca_o_ran_doc", source: "remote", caption: { background: { colors: ["#0F2027", "#1B5E20", "#66BB6A"] }, icon: { data: "🐍", type: "emoji" }, max_lines: 1, text: "Cả ổ rắn độc", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:tien_dau_ma_tieu", source: "remote", caption: { background: { colors: ["#11998E", "#38EF7D"] }, icon: { data: "💸", type: "emoji" }, max_lines: 1, text: "Tiền đâu mà tiêu", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:doc_so_tai_khoan", source: "remote", caption: { background: { colors: ["#1E90FF", "#00D4FF"] }, icon: { data: "💳", type: "emoji" }, max_lines: 1, text: "đọc số tài khoản", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:co_tien_lam_phien_thien_ha", source: "remote", caption: { background: { colors: ["#BFA06A", "#E8D5AD", "#F6EBDD"] }, icon: { data: "💰", type: "emoji" }, max_lines: 1, text: "Có tiền làm phiền thiên hạ", text_color: "#493824", type: "static_content" } },
                    { overlay_id: "caption:kiem_tra_nhan_pham", source: "remote", caption: { background: { colors: ["#654EA3", "#EAAFC8"] }, icon: { data: "🎲", type: "emoji" }, max_lines: 1, text: "Kiểm tra nhân phẩm", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Daily & Đời sống ☕",
                items: [
                    { overlay_id: "caption:ngay_moi_vui_ve", source: "remote", caption: { background: { colors: ["#FFB703", "#FFD166", "#FFF0A8"] }, icon: { data: "☀️", type: "emoji" }, max_lines: 1, text: "Ngày mới vui vẻ", text_color: "#69420A", type: "static_content" } },
                    { overlay_id: "caption:matcha_latte", source: "remote", caption: { background: { colors: ["#C8E6C9", "#A5D6A7", "#81C784"] }, icon: { data: "🍃", type: "emoji" }, max_lines: 1, text: "Matcha Latte 🍵", text_color: "#1B5E20E6", type: "static_content" } },
                    { overlay_id: "caption:tien_mua_tra_sua", source: "remote", caption: { background: { colors: ["#D7B77D", "#EAD6AA", "#F5E7CC"] }, icon: { data: "🧋", type: "emoji" }, max_lines: 1, text: "tiền không mua được tất cả, nhưng mua được trà sữa", text_color: "#5D472B", type: "static_content" } },
                    { overlay_id: "caption:rainy_day", source: "remote", caption: { background: { image: { type: "image", data: "cloud_cover", source: "local" }, colors: ["#6D4C41", "#8D6E63", "#BCAAA4"] }, icon: { data: "☕", type: "emoji" }, max_lines: 1, text: "Rainy Day ☕🌧️", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:2am_thoughts", source: "remote", daily_start_hour: 1, daily_end_hour: 3, caption: { background: { colors: ["#0F2027", "#203A43", "#2C5364"] }, icon: { type: "sf_symbol", data: "cloud.bolt.fill", color: "#FFFFFFE6" }, max_lines: 1, text: "2:00 AM Thoughts 🌙", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:ngu_ngon", source: "remote", caption: { background: { colors: ["#3F51B5", "#1A237E"] }, icon: { type: "sf_symbol", data: "moon.zzz.fill", color: "#FFFFFFE6" }, max_lines: 1, text: "Ngủ ngon", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:sweet_dream", source: "remote", caption: { background: { colors: ["#A1C4FD", "#C2E9FB", "#E0F7FA"] }, icon: { data: "☁️", type: "emoji" }, max_lines: 1, text: "Sweet Dream 🧊", text_color: "#1A237EE6", type: "static_content" } },
                    { overlay_id: "caption:nhiem_vu_di_ngu", source: "remote", caption: { background: { colors: ["#172554", "#334EAC", "#91A7FF"] }, icon: { data: "🫡", type: "emoji" }, max_lines: 1, text: "nhiệm vụ hệ thống: đi ngủ", text_color: "#FFFFFF", type: "static_content" } }
                ]
            }
        ])
    });
}

$done({ body: JSON.stringify(obj) });
