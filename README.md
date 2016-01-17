# ChordURL
A URL shortener written using the Node.js ecosystem.

## Install & run

1. Make sure `bower` and `gulp` are installed.
1. Install missing Node packages: `npm install`.
1. Install missing Bower packages: `bower install`.
1. Create a new MySQL database and execute `db.sql` on this database.
1. In `config.js`, fill in the correct MySQL settings for your database.
1. Build and run the application: `gulp build && gulp`.
1. Go to the URL (default `http://localhost:4000`).
1. If you want to deploy the code to your server, copy the "release" folder. In this, you'll need to execute the command `npm install --production`.

## Configuration

- In the `config.js` file, you can set some important variables.
  - The MySQL connection data.
  - Whether the URL shortener has a frontpage. If the URL shortener doesn't have a frontpage, you can set a redirect URL (when the user hits the root of the website).
  - You can set admin accounts here.
  - You can set keys for URL shortening here. When at least one key is filled in, you have to fill in a key when you're shortening a URL (either through the API or the web interface).
  - More... take a look
- If you want to support more types of databases (only MySQL is supported at the moment), you can add a new folder with the database type (e.g. "mongo") in the data folder.
- The only thing you need to do here is copy "url.js" from the MySQL folder and reimplement it for your favourite database system.
- The "db_driver" variable corresponds to the folder name in the data folder.
 
## API

There is a very simple API call to create short URLs. The pattern is like this:

`http://chordurl/shorten?customString=ducode&url=https%3A%2F%2Fducode.org`

- `url`: the URL that should be shortened (should be URL encoded)
- `customString` (optional): a custom string for the short URL. If this isn't filled in, a custom string is made for you. This string should not contain more than 15 characters and can only contain numbers, letters and the characters "-" and ".".

The response is the shortened URL (e.g. chordu.rl/ducode). This URL is free to call, except when you've set at least one key in the config file. If this is the case, you'll need to send an extra header called "ApiKey" with one of the specified keys.