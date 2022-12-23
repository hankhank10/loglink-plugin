export const settingUI = () => {
    /* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
    const settingsTemplate = [
        {
            key: "LogWhatToken",
            type: "string",
            title: "Your LogWhat Token",
            description: "To link with Whatsapp, visit https://whatsapp.logspot.top/  Once you authenticate with LogWhat, the site will generate a token. Enter it below.",
            default: ""
        },
    ];
    logseq.useSettingsSchema(settingsTemplate);
};