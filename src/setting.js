export const settingUI = () => {
    /* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
    const settingsTemplate = [
        {
            key: "loglink_token",
            type: "string",
            title: "Your LogLink Token",
            description: "To link with LogLink, visit https://loglink.it/  Once you authenticate with LogLink, the site will generate a token. Enter it below.",
            default: ""
        },
    ];
    logseq.useSettingsSchema(settingsTemplate);
};