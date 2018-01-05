const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Getcontacts = function () {};
Getcontacts.prototype.getcontacts = function (req,res) {
    req.checkBody('userid', 'Please enter user id').notEmpty()
    req.checkBody('item_categoryid', 'Please enter status').notEmpty()
    var errors = req.validationErrors();
    if (errors) {  
        res.send({ "status": false, errors: errors});
    }else{
        getItemCategories(req,res,callBack);
    }
};
function getItemCategories(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var item_categoryid = params.item_categoryid;
    
    var tbl1  = HMS_HOSP_ITEM_CATEGORY;
   
    if(item_categoryid == 0){
        var query  = "SELECT * FROM  ?? ";
        var queryData = [tbl1];
        query = mysql.format(query,queryData);
        db.query(query,function(err,rows){
            if (err) {
                callback(err,{},1,req,res);
            }else{
                callback({},rows,1,req,res);
            }
        });
    }
    else {
            var query = "SELECT * from ?? where item_category_id = ? ";
            var queryData = [tbl1,item_categoryid];
            query = mysql.format(query,queryData);
            db.query(query,function(err,rows){
                if (err) {
                    callback(err,{},1,req,res);
                }else{
                    callback({},rows,1,req,res);
                }
            });
      

    }
    
}
function callBack(err,data,func_type,req,res) {
    if (!isEmptyObject(err) ) {
        res.json({"status":false,"error":err});
    }else if(func_type == 1){ //getChatList method
        console.log(data);
        res.send({"status":true,"data":data})
    }
}
function isEmptyObject(obj) {
    for (var key in obj) {		
        return false;
    }
    return true;
}
exports.Getitemcategories = new Getitemcategories();