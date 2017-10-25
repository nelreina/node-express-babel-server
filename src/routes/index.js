import fs from 'fs';
import path from 'path';

export default app => {
  console.log('Importing routes...');
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function(file) {
      const routepath = file.replace('.js', '');
      console.log(`/api/${routepath}`);
      app.use(`/api/${routepath}`, require(path.join(__dirname, file)));
    });
};
