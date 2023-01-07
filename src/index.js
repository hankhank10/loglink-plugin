import '@logseq/libs';
import {logseq as PL} from "../package.json";
import {settingUI} from './setting';

const pluginId = PL.id;
const pluginName = "LogLink plugin: "

let pluginVersion = '0.0.0';

/* function to fetch data from LogLink */
async function loadRemoteData() {

	// Set the URL to either the default or the user's custom URL
	let appURL = 'https://api.loglink.it';
	if (logseq.settings['loglink_server_url'] !== "") {
		appURL = logseq.settings['loglink_server_url'];
	}
	let endpoint = appURL + '/get_new_messages/';

	// Crete the results array, which we will use to return the responses
	let results_array = [];

	// Work out how many tokens there are
	let token_count = 0;
	if (logseq.settings["loglink_token_1"] !== "") {
		token_count = 1;
	}
	if (logseq.settings["loglink_token_2"] !== "") {
		token_count = 2;
	}
	if (logseq.settings["loglink_token_3"] !== "") {
		token_count = 3;
	}

	// Check that there is at least 1 token provided
	if (token_count === 0) {
		results_array.push("This plugin has not yet been initialised.")
		results_array.push("In order to use this plugin, you must first authenticate with LogLink by visiting " + appURL);
		results_array.push("Once you have authenticated, you will be given a token (a long string of letters and numbers). Enter that token in the LogLink plugin settings.");
		return results_array
	}

	// Iterate through the tokens
	for (let i = 1; i <= token_count; i++) {
		let userID = logseq.settings["loglink_token_" + i];

		let object_to_send = {
			'user_id': userID,
			'plugin_version': pluginVersion
		}

		console.log(pluginName, "fetching data from ", endpoint)
		console.log(pluginName, "sending data pacakge", object_to_send)

		let response = await fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(object_to_send),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})

		let data = await response.json();
		let status = await response.status;

		console.log(pluginName, "returned status code", status)

		if (status === 200) {
			let messages = data.messages.contents;
			messages.forEach(function (item, index) {
				results_array.push(item['contents']);
				console.log(item['contents']);
			});

		} else {
			results_array.push("There was an error fetching your data from LogLink. Error code was " + status + ".");
			results_array.push(data.message)
			console.log(data);
		}
	}

	return results_array;
}

async function displayRemoteData() {


	// Display the toast
	logseq.UI.showMsg(`
        [:div.p-2
          [:h1 "Fetching from LogLink..."]
        ]
    `);
	console.log(`#${pluginId}: fetching`);

	// Get the current block
	let targetBlock = await logseq.Editor.getCurrentBlock();
	let targetBlockUuid = targetBlock.uuid;

	console.log(`#${pluginId}: ` + targetBlockUuid);

	// Get the data from the remote server
	let data = await loadRemoteData();

	// If the data is empty, display a message
	if (data.length === 0) {
		logseq.UI.showMsg(`
        	[:div.p-2
        		[:h1 "No new messages found on LogLink"]
        	]
    	`,
		'warning');
	} else {
		logseq.UI.showMsg(`
        	[:div.p-2
        		[:h1 "Imported ` + data.length + ` messages from LogLink successfully"]
        	]
    	`,
		'success');

		logseq.Editor.updateBlock(targetBlockUuid, "Imported from [[LogLink]]:");

		// Iterate through the data and insert each item into the current block
		data.forEach(function (item, index) {
			logseq.Editor.insertBlock(targetBlockUuid, item);
		});

		// and then add another blank to the end
		logseq.Editor.insertBlock(targetBlockUuid, "");
	}

}


/* main */
const main = async () => {

	// Get the version number
	try {
		let pjson = require('../package.json');
		pluginVersion = pjson.version;
		console.log(pluginName, "You are running version", pluginVersion, " of the LogLink plugin for Logseq.");
	} catch (e) {
		console.log(pluginName, "Error getting plugin version number.")
		pluginVersion = '0.0.0';
	}

	settingUI(); /* -setting */

	logseq.Editor.registerSlashCommand('🔄 LogLink messages', async () => {
			displayRemoteData()
		}
	);

	logseq.Editor.registerBlockContextMenuItem('🔄 LogLink integration',
		({blockId}) => {
			logseq.UI.showMsg('🔄LogLink integration')
		}
	);

}/* end_main */


logseq.ready(main).catch(console.error);