module.exports = {
    slackToken: process.env["SLACK_TOKEN"], // xoxp-...
    statusByWiFiName: {
        "Home": {
            "status_text": "Working remotely",
            "status_emoji": ":house:"
        },
        "Office": {
            "status_text": "In the office",
            "status_emoji": ":office:"
        }
    },
    statusByIpAddress: {
        "10.0.0.1": { // office - clear status
            "status_text": "",
            "status_emoji": ""
        }
    },
    updateInterval: 1000 // every second
}
