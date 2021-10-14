const https = require('https');

function checkShopOwnerLogin() {
  EMAIL_HOST = process.env.EMAIL_HOST
  SHOP_OWNER_TEST_EMAIL = process.env.SHOP_OWNER_TEST_EMAIL
  SHOP_OWNER_EMAIL_PASSWORD = process.env.SHOP_OWNER_EMAIL_PASSWORD
  IMAP_SEARCH_SUBJECT_MAGIC_LOGIN = process.env.IMAP_SEARCH_SUBJECT_MAGIC_LOGIN
  IMAP_SEARCH_UNSEEN = process.env.IMAP_SEARCH_UNSEEN
  IMAP_SEARCH_SINCE_DATE = process.env.IMAP_SEARCH_SINCE_DATE

  EMAIL_SEARCH_API_HOST = process.env.EMAIL_SEARCH_API_HOST

  const data = JSON.stringify({
    EMAIL_HOST: EMAIL_HOST,
    SHOP_OWNER_TEST_EMAIL: SHOP_OWNER_TEST_EMAIL,
    SHOP_OWNER_EMAIL_PASSWORD: SHOP_OWNER_EMAIL_PASSWORD,
    IMAP_SEARCH_SUBJECT_MAGIC_LOGIN: IMAP_SEARCH_SUBJECT_MAGIC_LOGIN,
    IMAP_SEARCH_UNSEEN: IMAP_SEARCH_UNSEEN,
    IMAP_SEARCH_SINCE_DATE: IMAP_SEARCH_SINCE_DATE
  })

  console.log("environment is:");
  console.log(process.env);

  const options = {
    hostname: EMAIL_SEARCH_API_HOST,
    port: 443,
    path: '/search-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    if ( res.statusCode != 200 ) {
      console.error("Non 200 statusCode received");
      process.exit(-5);
    }
    res.on('data', resp => {
      process.stdout.write(resp)
      emails = JSON.parse(resp.toString())
      if ( emails.length == 0 ) {
        console.error("Zero emails were returned.")
        process.exit(5)
      }
      lastEmail = emails[emails.length -1]['email_body']
      if ( lastEmail.includes('/auth/login/')) {
        //json to string
        jsonToString = JSON.stringify(lastEmail);

        // filter email magic login url
        const regex = /href=\\"(http.*)(?:\\">)/gm;
        magic_login_url = regex.exec(jsonToString)[1];
        module.exports.magic_login_url = magic_login_url;
        return true
      } else {
        console.error("Could not find login text in email")
        process.exit(5)
      }
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}
exports.checkShopOwnerLogin = checkShopOwnerLogin;

