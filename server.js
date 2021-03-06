const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4444;

express()
  .use(express.static(path.join(__dirname, '.')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
