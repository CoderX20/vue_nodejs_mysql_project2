const express = require('express')
const mysql = require('mysql')
const time = require('./node_time_set1')
const set_router = express.Router()
const connect_config = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'gx628572',
    database: 'my_database1'
}

set_router.get('/profile', function (requests, response) {
    const select_db = mysql.createConnection(connect_config)
    const select_sql_str = "select * from students";
    select_db.connect()
    select_db.query(select_sql_str, [], function (err, result_data) {
        if (err) {
            console.log(err.message)
            response.send([])
            throw err
        } else {
            response.send(result_data)
        }
    })
    select_db.end()
})

set_router.post('/delete', function (request, response) {
    const user_id = request.query.id
    const delete_db = mysql.createConnection(connect_config)
    const delete_sql_str = "delete from students where id= ?";
    delete_db.connect()
    delete_db.query(delete_sql_str, [user_id], function (err) {
        if (err) {
            console.log(err.message)
            response.send({result: "false"})
            throw err
        } else {
            response.send({result: 'true'})
            console.log("delete id=" + user_id + ":" + time.get_time_now())
        }
    })
    delete_db.end()
})

set_router.post('/update', function (request, response) {
    const id = request.query.id
    const name = request.query.name
    const sex = request.query.sex
    const major = request.query.major
    // const password=request.query.password
    const update_db = mysql.createConnection(connect_config)
    const update_sql_str = "update students set id=?,name=?,sex=?,major=? where id=?";
    update_db.connect()
    update_db.query(update_sql_str, [id, name, sex, major, id], function (err) {
        if (err) {
            console.log(err.message)
            response.send({result: 'false'})
            throw err
        } else {
            response.send({result: 'true'})
            console.log("update id=" + id + ":" + time.get_time_now())
        }
    })
    update_db.end()
})

set_router.post('/add', function (request, response) {
    // const id=request.query.id
    const name = request.query.name
    const sex = request.query.sex
    const major = request.query.major
    // const password=request.query.password
    const add_db = mysql.createConnection(connect_config)
    const add_sql_str = "insert into students (name,sex,major,password) values(?,?,?,?)";
    add_db.connect()
    add_db.query(add_sql_str, [name, sex, major, "123"], function (err) {
        if (err) {
            console.log(err.message)
            response.send({result: 'false'})
            throw err
        } else {
            response.send({result: 'true'})
            console.log("insert " + "&name=" + name + "&sex=" + sex + "&major=" + major + ":" + time.get_time_now())
        }
    })
    add_db.end()
})

module.exports = set_router