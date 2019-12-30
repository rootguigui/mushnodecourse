const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

app.listen(port, () => console.log(`App listening on port ${port}!`));