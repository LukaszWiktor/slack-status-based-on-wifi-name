"use strict";

require('dotenv').config()
const os = require('os');
const axios = require("axios");
const execSync = require("child_process").execSync;
const querystring = require("querystring");
const config = require("./config");

if (!config.slackToken) {
    console.error("Missing Slack token. Set it in config.js");
    process.exit(1);
}

function getMacWiFiName() {
    return execSync("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I") // macos only
            .toString()
            .split("\n")
            .filter(line => line.includes(" SSID: "))
            .map(line => line.match(/: (.*)/)[1])
            .find(ssid => true); // find first
}

function getWinWiFiName() {
    return execSync("netsh wlan show interfaces") // Windows only
            .toString()
            .split("\n")
            .filter(line => line.includes(" SSID "))
            .map(line => line.match(/: (.*)/)[1])
            .find(ssid => true); // find first
}

function setSlackStatus(token, status) {
    return axios.post("https://slack.com/api/users.profile.set",
        querystring.stringify({
            token: token,
            profile: JSON.stringify(status)
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
            console.log("Set Slack status API response: %j", response.data);
        })
        .catch(function(error) {
            console.error("Set Slack status error: %s", error);
        });
}

const platform = os.platform();

let wiFiName;
let getWiFiName;
// Get appropriate function for platform
switch (platform) {
  case 'darwin':
    getWiFiName = getMacWiFiName;
    break;
  case 'win32':
    getWiFiName = getWinWiFiName;
    break;
  default:
    console.error('Currently only Mac OS X and Windows are supported');
    process.exit(2);
}

setInterval(function() {
    const newWiFiName = getWiFiName();
    if (newWiFiName === wiFiName) {
        return;
    }
    wiFiName = newWiFiName;
    console.log("Connected WiFi SSID: %s", wiFiName);

    const status = config.statusByWiFiName[wiFiName];
    if (!status) {
        console.log("Status not specified for WiFi: %s", wiFiName);
        return;
    }
    console.log("Setting Slack status to: %j", status);
    setSlackStatus(config.slackToken, status);
}, config.updateInterval);
