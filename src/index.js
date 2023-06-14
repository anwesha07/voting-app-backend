const app = require('./app');
require('./db');

app.listen(8000, () => {
  console.log('Server started at port 8000');
});
