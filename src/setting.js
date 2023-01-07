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
        {
            key: "check_for_latest_version",
            type: "boolean",
            title: "Check for latest version",
            description: "By default, the plugin checks if it is out of date and notifies you. If you would prefer not to be notified, then uncheck this box.",
            default: true
        }
    ];
    logseq.useSettingsSchema(settingsTemplate);
};