import '@logseq/libs';
import {logseq as PL} from "../package.json";
import {settingUI} from './setting';

const pluginId = PL.id;
const pluginName = "Whatsapp plugin: "


/* function to fetch data from LogWhat */
async function loadWhatsappData() {

	const appURL = 'https://api.loglink.it';
	const userID = logseq.settings["LogLink"];
	const endpoint = appURL + '/get_new_messages/';

	let results_array = [];

	if (userID === "") {
		results_array.push("This plugin has not yet been initialised.")
		results_array.push("In order to use this plugin, you must first authenticate with LogLink by visiting " + appURL);
		results_array.push("Once you have authenticated, you will be given a token (a long string of letters and numbers). Enter that token in the LogLink plugin settings.");
		return results_array
	}

	const object_to_send = {
		'user_id': userID
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

	console.log(data.messages)

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

	return results_array;
}

async function displayWhatsappData() {


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

	// Get the data from Whatsapp
	let data = await loadWhatsappData();

	// If the data is empty, display a message
	if (data.length === 0) {
		logseq.UI.showMsg(`
        	[:div.p-2
        		[:h1 "No new messages found"]
        	]
    	`);
	} else {
		logseq.Editor.updateBlock(targetBlockUuid, "Imported from [[LogLink]]:");
	}
	
	// Iterate through the data and insert each item into the current block
	data.forEach(function (item, index) {
		logseq.Editor.insertBlock(targetBlockUuid, item);
	});
}


/* main */
const main = async () => {

	settingUI(); /* -setting */
	console.info(`
		#$
		{
			pluginId
		}
	:
		main`); /* -plugin-id */

	logseq.Editor.registerSlashCommand('🔄 LogLink messages', async () => {
			displayWhatsappData()
		}
	);

	logseq.Editor.registerBlockContextMenuItem('🔄 LogLink integration',
		({blockId}) => {
			logseq.UI.showMsg('🔄LogLink integration')
		}
	);
	
	console.info(`
		#$
		{
			pluginId
		}
	:
		loaded`);
}/* end_main */


logseq.ready(main).catch(console.error);