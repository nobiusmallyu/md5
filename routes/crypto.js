const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

/* GET users listing. */
router.get('/', processor);

function a(req, res, next) {
    let md5hash = req.query.q
    let result = decrypt(md5hash);
    res.send();
}

async function processor(req, res) {
    let md5hash = req.query.q;
    let conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'adminadmin',
        database: 'md5',
        socketPath: '/tmp/mysql.sock'
    });
    let [queriedResult, _] = await conn.query('SELECT * FROM hashes WHERE hash = ?', md5hash);
    if (queriedResult.length === 0) {
        res.send({
            'found': false
        });
    } else {
        res.send({
            'found': true,
            'result': queriedResult[0]['value']
        });
    }
    await conn.end();
}

module.exports = router;
