const express = require("express");
const bodyParser = require("body-parser");
const app  = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose  = require("mongoose");
var dateFormat = require("dateformat");
const { Date } = require("./Models/calender");



mongoose.connect("mongodb://localhost:27017/CalenderGitDB", {useNewUrlParser: true, useUnifiedTopology : true});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

app.get("/", (req, res) => {

    // res.send("hello");
    // var now = new Date();

    res.send("HOLA!!!! ");
});

app.post("/", (req, res) => {

    var date = req.body.date;
    JSON.stringify(date);
    // Basic usage

    let x=dateFormat(date, "dd mm yyyy");
    // res.send(x);
    console.log("hi       "+x)
    let day=(x[0]-'0')*10+(x[1]-'0');
    let month=(x[3]-'0')*10+(x[4]-'0');
    let year=(x[6]-'0')*1000+(x[7]-'0')*100+(x[8]-'0')*10+(x[9]-'0');
// console.log(day+" "+month+" "+year);
    Date.find({ day:day,month:month,year:year}, function (err, date) {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(date.length!==0){
            res.send({data:date[0].activity})
        }
        else{
            res.send({data:[]})
        }

    });
});

app.post("/add",(req,res)=>{
    let date = req.body.date;
    let data=req.body.data;
    // console.log("add");
    JSON.stringify(data);
    JSON.stringify(date);
    // console.log(typeof(data))
    // console.log(typeof(date))
    // console.log(date,data)
    let x=dateFormat(date, "dd mm yyyy");
    // console.log(x)
    let day=(x[0]-'0')*10+(x[1]-'0');
    let month=(x[3]-'0')*10+(x[4]-'0');
    let year=(x[6]-'0')*1000+(x[7]-'0')*100+(x[8]-'0')*10+(x[9]-'0');
    // console.log(day+" "+month+" "+year);
    // const embeddedday={
    //     date:day,
    //     activity:data
    // }
    // const embeddedmonth={
    //     day:embeddedday,
    //     month:month
    // }
    // const embeddedyear = new Year({
    //     year:year,
    //     month:embeddedmonth
    // })
    // embeddedyear.save();
    Date.find({ day:day,month:month,year:year}, function (err, date) {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(date.length!==0){
            console.log(date);
            date[0].activity.push(data);
            date[0].save();
            res.send({data:date[0].activity})
        }
        else{
            const date=new Date({
                day:day,
                month:month,
                year:year,
                activity:[data]
            })
            date.save();
            res.send({data:date.activity})
        }

    });

})

app.post("/delete",(req,res)=>{
    console.log("hellojo")
    let date = req.body.date;
    let data=req.body.data;
    JSON.stringify(data);
    JSON.stringify(date);
    let x=dateFormat(date, "dd mm yyyy");
    let day=(x[0]-'0')*10+(x[1]-'0');
    let month=(x[3]-'0')*10+(x[4]-'0');
    let year=(x[6]-'0')*1000+(x[7]-'0')*100+(x[8]-'0')*10+(x[9]-'0');
    Date.find({ day:day,month:month,year:year}, function (err, date) {
        if(err){
            console.log(err);
            res.send(err);
        }
            date[0].activity = date[0].activity.filter(e => e !== data);
            date[0].save();
            // date[0].activity.map(e=>console.log(e));
            res.send({data:date[0].activity})


    });

})





app.listen(PORT, function(){
    console.log(`server is up and running on port ${PORT}`);
})