const express=require('express')
const register_router=require('./node_register1')
const login_router=require('./node_login1')
const time=require('./node_time_set1')
const app=express()

app.all('*',function(request,response,next){
    request.header("Access-Control-Allow-Origin", "*")
    next()
})
app.use(express.urlencoded({extended:false}))
app.use(express.static('./dist/dist/'))
app.use(login_router)
app.use(register_router)
app.get('/',function(request,response){})
app.listen(8080,function(){
    console.log("server running at http://127.0.0.1:8080/ : "+time.get_time_now())
})