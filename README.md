# LogLink Plugin
    
**NOTE: This project is under development (as of 4 Jan 2023) only available in closed beta. If you want to sign up for the beta you can [here](https://form.jotform.com/230035811319043)**

LogLink allows you to add to your LogSeq graph more easily from a variety of sources, with a focus on mobile.

You can read all about LogLink at [https://loglink.it](https://loglink.it)

Quick demo:

https://user-images.githubusercontent.com/25515609/210997564-1c8f1167-f7ba-46e8-929b-37cdeb8ec4c9.mov

## Integrations

Functioning integrations:
- Telegram

Planned integrations:
- WhatsApp
- Email
- Discord (maybe)
- Slack (maybe)

## Workflow

The simple workflow is that you send a message from your phone (or desktop) to a number via WhatsApp. You can send text (including special terms like TODO, [[links]] or #hashtags), locations (which resolve nicely including a goodle maps link) or images/videos (which are automatically uploaded to imgur and then inserted into your graph). The service stores these messages until you log into LogSeq on desktop and sync them to your graph via a slash command, at which point they are deleted from the server.

I use this to quickly add to my todo list (eg send a Telegram message saying `TODO Buy milk` or `TODO Call [[John Smith]]`), send myself quick notes or send images of things I want to remember (eg a photo of a book I want to read).

I am keen to find an intrepid group (5-10) of beta testers to help me test this out. I am even more keen to find anyone keen to collaborate with on this.

If you are interested in either (after reading the important security disclaimer below) then please register interest by either:
- Completing this form https://form.jotform.com/230035811319043
- Raising an issue on this repo offering assistance
- Diving right in by forking and raising a PR

For potential collaborators, the tech stack is:
- Python/Flask/SQLAlchemy on the backend (which I have covered, although anyone with encryption/security experience would be very welcome);
- JS for the plugin (which I could dearly use some assistance with);
- the front end web app/landing page will be build in HTML+Tailwind (again, help very much appreciated here).

- The service will be free to begin with. I have no aim to run this commercially, although at some point I may have to charge a nominal fee in due course if I start to incur costs (eg for whatsapp or imgur API usage beyond the free plans).

## Security
You should read the important security disclaimer here: https://loglink.it/security-notice

## Open source
The server and plugin are both open source, so you are welcome to read the source code (github links both below) and you could also use the source code to run your own server.

## Links
- Server: https://github.com/hankhank10/loglink-server
- Plugin: https://github.com/hankhank10/loglink-plugin
- Docs: https://loglink.it/
