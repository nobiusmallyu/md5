const mysql = require('mysql2/promise');
const md5 = require('./md5');

const newRowsToBeAdded = 100;

async function main() {
    let conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'adminadmin',
        database: 'md5',
        socketPath: '/tmp/mysql.sock'
    });
    // Create table
    let createQuery = `CREATE TABLE IF NOT EXISTS hashes (
                    value VARCHAR(50),
                    hash VARCHAR(50)
                )`;
    await conn.execute(createQuery);
    // Check how many lines
    let countQuery = `SELECT COUNT(*) FROM hashes`;
    let countedResult = await conn.execute(countQuery);
    let count = countedResult[0][0]['COUNT(*)'];
    let values = generateValues(count + 1, newRowsToBeAdded);
    let insert = `INSERT INTO hashes (value, hash) VALUES ?`;
    await conn.query(insert, [values]);
    await conn.end();
}

function generateValues(start, count) {
    let result = [];
    for(let i = 0; i < count; i++) {
        let num = i + start;
        let value = num.toString(36);
        let hash = md5(value);
        result.push([value, hash]);
    }
    return result;
}

main();
