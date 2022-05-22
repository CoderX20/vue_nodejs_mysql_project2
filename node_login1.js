const express=require('express')
const fs=require('fs')
const path=require('path')
const mysql=require('mysql')
const time=require('./node_time_set1')
const login_router=express.Router()

var database_config={
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'gx628572',
    database:'my_database1'
}



login_router.post('/loginCheck',function(request,response){
    console.log(request.method+'>'+request.url+":"+time.get_time_now())
    var url_query=request.query
    var check_db=mysql.createConnection(database_config)
    var query_sql_str='select * from users where username=? and password=?'
    check_db.connect()
    check_db.query(query_sql_str,[url_query.account,url_query.password],function(err,res_data){
        if(err){
            console.log(err.message)
            response.send({result:'false'})
            throw err
        }
        else{
            // console.log(res_data)
            if(res_data.length===0){
                response.send({result:'false'})
            }
            else{
                response.send({result:'true'})
            }
        }
    })
    check_db.end()
})

module.exports=login_router