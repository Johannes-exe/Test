const fs = require('fs');
const pool = require('./connection');

async function init() {
  const schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
  await pool.query(schema);
  console.log('Database initialized');
  process.exit(0);
}

init().catch(err => {
  console.error('DB init error:', err);
  process.exit(1);
});
