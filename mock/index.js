const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const mockPort = require('../config').dev.mockPort || 9993
const config = require('./config.js')();
const routers = [];


function createServer(name, fullpath, jsonpath) {
    const errjson = { success: false, error_msg: '网络或服务器错误' }
    router.all(fullpath, (req, res) => {
        fs.readFile(jsonpath, 'utf-8', (err, data) => {
            if (err) {
                res.status(503).json(errjson)
            } else {
                const obj = JSON.parse(data)
                res.status(200).json(obj)
            }
        })

    })
}

for (let i = 0; i < config.length; i++) {
    const filename = config[i]['name']
    const fullpath = config[i]['path']
    const readpath = path.join(__dirname, './jsons/' + filename + '.json')
    createServer(filename, fullpath, readpath)
}

module.exports = function() {
    const app = express()
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        next()
    })
    app.use('/', router)
    app.listen(mockPort)
}
