const express=require('express')
const mysql=require('mysql')
const time=require('./node_time_set1')
const register_router=express.Router()

var connect_config={
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'gx628572',
    database:'my_database1'
}

register_router.post('/registerCheck',function(request,response){
    var url_query=request.query
    var query_db=mysql.createConnection(connect_config)
    var query_sql_str="select username from users where username= ?"
    query_db.connect()
    query_db.query(query_sql_str,[url_query.account],function(err,result){
        if(err){
            console.log(err.message)
            response.send({result:'false'})
            throw err
        }
        else{
            if(result.length!==0){
                response.send({result:'exit'})
            }
            else{
                var insert_db=mysql.createConnection(connect_config)
                var insert_sql_str="insert into users (username,password,status) values(?,?,?)"
                insert_db.connect()
                insert_db.query(insert_sql_str,[url_query.account,url_query.password,1],function(err,result){
                    if(err){
                        console.log(err.message)
                        response.send({result:'false'})
                        throw err
                    }
                    else{
                        response.send({result:'true'})
                    }
                })
                insert_db.end()
            }
        }
    })
    query_db.end()
})

module.exports=register_router