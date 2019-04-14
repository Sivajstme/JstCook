//import { config } from '../config';
const accountSid =  'AC68067eaa276a52dd855a70ef126fcbdd';
const authToken = '830485bd8c5e152c3f49144a3fdc067f';

const client = require('twilio')(accountSid,authToken);

client.messages.create({
    to: '+61468357759',
    from: '+61428181487',
    body: 'Test From a Node JS APP'
})
.then((message) => console.log(message.sid))