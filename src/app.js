// eslint-disable-next-line
import { Wechaty } from 'wechaty';
// eslint-disable-next-line
import qrTerm from 'qrcode-terminal';

/**
 *
 * 1. Declare your Bot!
 *
 */
const bot = new Wechaty({
  name: 'javascript-es6',
});


/**
 *
 * 3. Start the bot!
 *
 */
bot.start()
  .catch(async (e) => {
    console.error('Bot start() fail:', e);
    await bot.stop();
    process.exit(-1);
  });

/**
 *
 * 4. You are all set. ;-]
 *
 */

/**
 *
 * 5. Define Event Handler Functions for:
 *  `scan`, `login`, `logout`, `error`, and `message`
 *
 */
function onScan(qrcode, status) {
  qrTerm.generate(qrcode, { small: true });

  // Generate a QR Code online via
  // http://goqr.me/api/doc/create-qr-code/
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');

  console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `);
}

function onLogin(user) {
  console.log(`${user.name()} login`);
  bot.say('Wechaty login').catch(console.error);
}

function onError(e) {
  console.error('Bot error:', e);
}

/**
 *
 * 6. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage(msg) {
  console.log(msg.toString());

  if (/^ding$/i.test(msg.text())) {
    await msg.say('testing docker in Wechaty');
  }
}

/**
 *
 * 2. Register event handlers for Bot
 *
 */
bot
  .on('login', onLogin)
  .on('scan', onScan)
  .on('error', onError)
  .on('message', onMessage);
