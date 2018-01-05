const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Kitchenchart = function () {};
Kitchenchart.prototype.kitchenchart = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getKitchenChartDetails(req,res,callBack);
    }else if(query_type == "set_data"){

       // req.checkBody('type', 'Please enter demographics type').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            ChcekKitchenChartExists(req,res,callBack);
        }

    }else if(query_type == "del_data") {
		
		DeleteKitchenChart(req,res,callBack);
	}
	
};


function ChcekKitchenChartExists(req,res,callback){
	var params = req.body;

	var kitchen_chart_id = params.kitchen_chart_id;
	var hid = params.hid;
	var week_id = params.week_id;
	var day_id = params.day_id;
	var kitchen_chart_name = params.kitchen_chart_name;
	var kitchen_chart_code = params.kitchen_chart_code;
    
     //var type = params.type;
     //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_KITCHEN_CHART;

	if(typeof kitchen_chart_id!= "undefined"){
		var query1 = "select * from ?? where hid = ? and week_id = ? and day_id = ? and kitchen_chart_name = ? and kitchen_chart_code = ? and kitchen_chart_id not in (?) ";
		var queryData1 = [tbl_name,hid,week_id,day_id,kitchen_chart_name,kitchen_chart_code,kitchen_chart_id];
	}else{
		var query1 = "select * from ?? where hid = ? and week_id = ? and day_id = ? and kitchen_chart_name = ? and kitchen_chart_code = ? ";
		var queryData1 = [tbl_name,hid,week_id,day_id,kitchen_chart_name,kitchen_chart_code];
    }
	query1 = mysql.format(query1,queryData1);
	console.log(query1);
	db.query(query1,function(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log(rows);
			if (!isEmptyObject(rows)){
				res.send({"status":true,"msg":DATA_EXIST_MSG});
			}else{
				//callback({},rows,1,req,res);
				if(typeof kitchen_chart_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE kitchen_chart_id= ? ";
					var queryData = [tbl_name,kitchen_chart_id];
					query = mysql.format(query,queryData);
					db.query(query,function(err,rows){
						if (err) {
							callback(err,{},1,req,res);
						}else{
							callback({},rows,1,req,res);
						}
					});
				   }else{				
				   callback({},rows,1,req,res);
				   } 
			}			
		}

	});

}

function InsertKitchenChart(req,res,data,callback){
	var params = req.body;
    var tbl_name = HMS_HOSP_KITCHEN_CHART;
	
	
	var hid = params.hid;
	var week_id = params.week_id;
	var day_id = params.day_id;
	var kitchen_chart_name = params.kitchen_chart_name;
	var kitchen_chart_code = params.kitchen_chart_code;
	var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (hid,week_id,day_id,kitchen_chart_name,kitchen_chart_code,created_by,created_date) values (?,?,?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,hid,week_id,day_id,kitchen_chart_name,kitchen_chart_code,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateKitchenChart(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_KITCHEN_CHART;
	var kitchen_chart_id = params.kitchen_chart_id;
	var hid = params.hid;
	var week_id = params.week_id;
	var day_id = params.day_id;
	var kitchen_chart_name = params.kitchen_chart_name;
	var kitchen_chart_code = params.kitchen_chart_code;
	
    var memberid = params.memberid;

    var cond1 = "";
    var cond2 = "";
    var cond3 = "";
    var cond4 = "";
	var cond5 = "";
	

    if(typeof hid != "undefined")
    {
       // cond1 = " menu_item = ?, ";
       cond1 = " hid = '"+hid+"', ";
    }

    if(typeof week_id != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond2 = " week_id = '"+week_id+"', ";        
    }

    if(typeof day_id != "undefined")
    {
        //cond3 = " minimum_serve = ?, ";
        cond3 = " day_id = '"+day_id+"', ";
	}
	
	if(typeof kitchen_chart_name != "undefined"){
		cond4 = " kitchen_chart_name = '"+kitchen_chart_name+"', ";
	}

	if(typeof kitchen_chart_code != "undefined"){
		cond5 = " kitchen_chart_code = '"+kitchen_chart_code+"', ";
	}

	   	
	var query = "UPDATE ?? SET 	"+cond1+cond2+cond3+cond4+cond5+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( kitchen_chart_id = ?)";
	var queryData = [tbl_name,memberid,kitchen_chart_id];
    query = mysql.format(query,queryData);
    console.log("update query: "+ query);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},3,req,res);
		}else{
			callback({},data,3,req,res);
		}
	});
}

//function DeleteItemCategory(req,res,data,callback){
	function DeleteKitchenChart(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_KITCHEN_CHART;
    var kitchen_chart_id = params.kitchen_chart_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (kitchen_chart_id= ?)";
	var queryData = [tbl_name,kitchen_chart_id];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},4,req,res);
		}else{
			res.send({"status":true,"msg":DELETE_MSG});
			//callback({},data,4,req,res);
		}
	});
}


function callBack(err,data,func_type,req,res) {
	if (!isEmptyObject(err) ) {
		res.json({"status":false,"error":err});
	}else if(func_type == 1){ 
		if (!isEmptyObject(data)) {
			UpdateKitchenChart(req,res,data,callBack);
		}else {
			InsertKitchenChart(req,res,data,callBack);
		}
	}else if(func_type == 2){ //InsertContactInfo Method
		res.send({"status":true,"msg":INSERT_MSG})
	}else if(func_type == 3){ //UpdateContactInfo Method
		res.send({"status":true,"msg":UPDATE_MSG})
	}else if(func_type == 4){ //DeleteContactInfo Method
		res.send({"status":true,"msg":DELETE_MSG})
	}else if(func_type == 5){
         //getItemCateory/ categories details  method
            console.log(data);
            res.send({"status":true,"data":data})
   
    }
}


function getKitchenChartDetails(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var kitchen_chart_id = params.kitchen_chart_id;
    
    var tbl1  = HMS_HOSP_KITCHEN_CHART;
   
    if(kitchen_chart_id == "0"){
        var query  = "SELECT * FROM  ?? ";
        var queryData = [tbl1];
		query = mysql.format(query,queryData);
		console.log(query);
        db.query(query,function(err,rows){
            if (err) {
                callback(err,{},5,req,res);
            }else{
                callback({},rows,5,req,res);
            }
        });
    }
    else {
            var query = "SELECT * from ?? where kitchen_chart_id = ? ";
            var queryData = [tbl1,kitchen_chart_id];
			query = mysql.format(query,queryData);
			console.log(query);
            db.query(query,function(err,rows){
                if (err) {
                    callback(err,{},5,req,res);
                }else{
                    callback({},rows,5,req,res);
                }
            });
      

    }
    
}

function isEmptyObject(obj) {
	for (var key in obj) {		
		return false;
	}
	return true;
}
exports.Kitchenchart = new Kitchenchart();