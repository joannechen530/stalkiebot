export function Verification(req, res) {

    const VERIFY_TOKEN = "stalkiebot";
    const query = req.query();
    const parts = query.split('&');
    const object = parts.reduce((tmp, part) => {
        const subparts = part.split('=');
        const key = subparts[0];
        const value = subparts[1];
        tmp[key] = value;
        return tmp;
    }, {});

    // Parse params from the webhook verification request
    let mode = object['hub.mode'];
    let token = object['hub.verify_token'];
    let challenge = object['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {

        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Respond with 200 OK and challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.contentType = "text/plain";
            res.send(200, challenge);

        } else {
            // Responds with '  403 Forbidden' if verify tokens do not match
            res.send(403);
        }
    }
}

