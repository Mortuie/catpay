const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;




app.get('/', (req, res) => {
axios.post(
  'https://portal.konfipay.de/api/Login/Token', {
  UUID: "e70a447575084600b0c72112c58319c0",
  Username: "moneisz@gnubis.de",
  Password: "5671f7ca5671f7ca"
  })
  .then(resp => {
    console.log(resp.data);
    res.send(resp.data.access_token);
  })
  .catch(err => console.log(err));

})


app.listen(PORT, () => {
  console.log("Listening on port..." + PORT);
});
