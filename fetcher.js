const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(process.argv[2], (error, response, body) => {
  if (fs.existsSync(process.argv[3])) {
    rl.question('file already exits - Overwrite? Y - ', (answer) => {
      const response = answer.toLowerCase();
      if (response === 'y' || response === 'yes') {
        fs.writeFile(process.argv[3], body, function(err) {
          const info = fs.statSync(process.argv[3]);
          const size = info['size'];
          if (err) throw err;
          console.log(`Downloaded and saved ${size} bytes to ${process.argv[3]}`);
        });
        rl.close();
      } else {
        rl.close();
      }
    });
  } else {
    fs.writeFile(process.argv[3], body, function(err) {
      const info = fs.statSync(process.argv[3]);
      const size = info['size'];
      if (err) throw err;
      console.log(`Downloaded and saved ${size} bytes to ${process.argv[3]}`);
      rl.close();
    });
  }
});