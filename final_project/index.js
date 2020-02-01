const container = require('./startup/index');
const app = container.resolve('app');

app.start();
