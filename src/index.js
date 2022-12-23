import '@logseq/libs';
import { logseq as PL } from "../package.json";
import { settingUI } from './setting';

const pluginId = PL.id;
const pluginName = "Spotify plugin: "


/* function to fetch data from logspot */
async function loadSpotifyData() {

  const appURL = 'https://spotify.logspot.top';
  const userID = logseq.settings["LogSpotToken"];
  const endpoint = appURL + '/getsongs/';

  let results_array = [];

  if (userID === "") {
    results_array.push("This plugin has not yet been initialised.")
    results_array.push("In order to use this plugin, you must first authenticate with Spotify by visiting " + appURL);
    results_array.push("Once you have authenticated, you will be given a token (a long string of letters and numbers). Enter that token in the LogSpot plugin settings.");
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

  if (status === 200) {
    let children = data.data.children;
    children.forEach(function (item, index) {
      const link_artist = logseq.settings["LogSpotLinkArtist"];

      if (link_artist) {
        results_array.push(item['track_name'] + " by [[" + item['artist'] + "]]");
      } else {
        results_array.push(item['track_name'] + " by " + item['artist']);
      }
      //console.log(item['track_name'] + " by [[" + item['artist'] + "]]");
    });
  } else {
    results_array.push("There was an error fetching your data from logspot. Error code was " + status +".");
    results_array.push(data.message)
    console.log(data);
  }

  return results_array;
}


/* main */
function main () {

  settingUI(); /* -setting */
  console.info(`#${pluginId}: main`); /* -plugin-id */

  logseq.Editor.registerSlashCommand('💿 Recently played from Spotify!', async () => {

    let SpotifyHeading = logseq.settings["LogSpotHeading"]
    if (SpotifyHeading === "") {
      SpotifyHeading = "🎺 Today on [[spotify]]:"
    }

    const { content, uuid } = await logseq.Editor.getCurrentBlock();

    // Display the toast
    logseq.UI.showMsg(`
        [:div.p-2
          [:h1 "Fetching from Spotify..."]
        ]
    `);
    console.log(`#${pluginId}: fetching`);

    // Get the current block
    let targetBlock = await logseq.Editor.getCurrentBlock();
    let targetBlockUuid = targetBlock.uuid;

    console.log(`#${pluginId}: ` + targetBlockUuid);

    // Set the current block content
    logseq.Editor.updateBlock(targetBlockUuid, SpotifyHeading);

    // Get the data from Spotify
    let data = await loadSpotifyData();

    // Iterate through the data and insert each item into the current block
    data.forEach(function (item, index) {
      logseq.Editor.insertBlock(targetBlockUuid, item);
    });

  }
  );

  logseq.Editor.registerBlockContextMenuItem('🎺 Spotify integration',
    ({ blockId }) => { logseq.UI.showMsg('🎺 Spotify integration') }
  );

  console.info(`#${pluginId}: loaded`);
}/* end_main */


logseq.ready(main).catch(console.error);