# slack-status-based-on-wifi-name
Set your status on Slack based on the WiFi network you are connected to.

## How to run it?

You need to obtain a Slack token for your account from https://api.slack.com/custom-integrations/legacy-tokens.
Copy and paste the token to [config.js](./config.js) or set it as an environment variable `SLACK_TOKEN`.

    C:\slack-status-based-on-wifi-name>set SLACK_TOKEN=xoxp-...

You also need to have node.js installed to run the script. Currently it works on Windows only.

    C:\slack-status-based-on-wifi-name>node app.js
    
## How does it work?

The script checks periodically the WiFi network name (SSID) you are connected to and sets your status on Slack according to the mapping defined in [config.js](./config.js).

![](https://raw.githubusercontent.com/LukaszWiktor/slack-status-based-on-wifi-name/master/docs/slack-status-based-on-wifi-name-example-screenshot.png)
