export const settingUI = () => {
    /* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
    const settingsTemplate = [
        {
            key: "loglink_token_1",
            type: "string",
            title: "Your LogLink Token (required)",
            description: "To link with LogLink, visit https://loglink.it/  Once you authenticate with LogLink, the site will generate a token. Enter it below.",
            default: ""
        },
        {
            key: "loglink_token_2",
            type: "string",
            title: "Your LogLink Token 2 (optional)",
            description: "If you have multiple tokens (for instance from multiple services) then you can enter an additional one here.",
            default: ""
        },
        {
            key: "loglink_token_3",
            type: "string",
            title: "Your LogLink Token 3 (optional)",
            description: "If you have multiple tokens (for instance from multiple services) then you can enter an additional one here.",
            default: ""
        },
        {
            key: "loglink_server_url",
            type: "string",
            title: "LogLink server URL (optional)",
            description: "If you have self-deployed LogLink to your own server then enter the base URL below. If not, then leave this blank.",
            default: ""
        },
    ];
    logseq.useSettingsSchema(settingsTemplate);
};