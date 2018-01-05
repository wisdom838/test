const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Foundationchartitems = function () {};
Foundationchartitems.prototype.foundationchartitems = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getFoundationChartItems(req,res,callBack);
    }else if(query_type == "set_data"){

       // req.checkBody('type', 'Please enter demographics type').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            ChcekFoundationChartItemExists(req,res,callBack);
        }

    }else if(query_type == "del_data") {
		
		DeleteFoundationChartItem(req,res,callBack);
	}
	
};


function ChcekFoundationChartItemExists(req,res,callback){
	var params = req.body;
	var food_id = params.food_id;
	var foundation_chart_id = params.foundation_chart_id;
	var menu_categoryid = params.menu_categoryid;
	var menu_sub_categoryid = params.menu_sub_categoryid;
	var item_id = params.item_id;
	var scheduletime = params.scheduletime;
	var description = params.description;
    
     //var type = params.type;
     //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_FOUNDATION_CHART_ITEMS;

	if(typeof food_id!= "undefined"){
		var query1 = "select * from ?? where foundation_chart_id = ? and menu_categoryid = ? and menu_sub_categoryid = ? and item_id = ? and scheduletime = ? and description = ? and food_id not in (?) ";
		var queryData1 = [tbl_name,foundation_chart_id,menu_categoryid,menu_sub_categoryid,item_id,scheduletime,description,food_id];
	}else{
		var query1 = "select * from ?? where foundation_chart_id = ? and menu_categoryid = ? and menu_sub_categoryid = ? and item_id = ? and scheduletime = ? and description = ? ";
		var queryData1 = [tbl_name,foundation_chart_id,menu_categoryid,menu_sub_categoryid,item_id,scheduletime,description];
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
				if(typeof food_id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE food_id= ? ";
					var queryData = [tbl_name,food_id];
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

function InsertFoundationChartItem(req,res,data,callback){
	var params = req.body;
    var tbl_name = HMS_HOSP_FOUNDATION_CHART_ITEMS;
	
	var foundation_chart_id = params.foundation_chart_id;
	var menu_categoryid = params.menu_categoryid;
	var menu_sub_categoryid = params.menu_sub_categoryid;
	var item_id = params.item_id;
	var scheduletime = params.scheduletime;
	var description = params.description;
    var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (foundation_chart_id,menu_categoryid,menu_sub_categoryid,item_id,scheduletime,description,created_by,created_date) values (?,?,?,?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,foundation_chart_id,menu_categoryid,menu_sub_categoryid,item_id,scheduletime,description,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateFoundationChartItem(req,res,data,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOUNDATION_CHART_ITEMS;
	var food_id = params.food_id;
	var foundation_chart_id = params.foundation_chart_id;
	var menu_categoryid = params.menu_categoryid;
	var menu_sub_categoryid = params.menu_sub_categoryid;
	var item_id = params.item_id;
	var scheduletime = params.scheduletime;
	var description = params.scheduletime;
	
    var memberid = params.memberid;

    var cond1 = "";
    var cond2 = "";
    var cond3 = "";
    var cond4 = "";
	var cond5 = "";
	var cond6 = "";

    if(typeof foundation_chart_id != "undefined")
    {
       // cond1 = " menu_item = ?, ";
       cond1 = " foundation_chart_id = '"+foundation_chart_id+"', ";
    }

    if(typeof menu_categoryid != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond2 = " menu_categoryid = '"+menu_categoryid+"', ";        
    }

    if(typeof menu_sub_categoryid != "undefined")
    {
        //cond3 = " minimum_serve = ?, ";
        cond3 = " menu_sub_categoryid = '"+menu_sub_categoryid+"', ";
	}
	
	if(typeof item_id != "undefined"){
		cond4 = " item_id = '"+item_id+"', ";
	}

	if(typeof scheduletime != "undefined"){
		cond5 = " scheduletime = '"+scheduletime+"', ";
	}

	if(typeof description != "undefined"){
		cond6 = " description = '"+description+"', ";
	}
   	
	var query = "UPDATE ?? SET 	"+cond1+cond2+cond3+cond4+cond5+cond6+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( food_id = ?)";
	var queryData = [tbl_name,memberid,food_id];
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
	function DeleteFoundationChartItem(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_FOUNDATION_CHART_ITEMS;
    var food_id = params.food_id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (food_id= ?)";
	var queryData = [tbl_name,food_id];
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
			UpdateFoundationChartItem(req,res,data,callBack);
		}else {
			InsertFoundationChartItem(req,res,data,callBack);
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


function getFoundationChartItems(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var food_id = params.food_id;
    
    var tbl1  = HMS_HOSP_FOUNDATION_CHART_ITEMS;
   
    if(food_id == "0"){
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
            var query = "SELECT * from ?? where food_id = ? ";
            var queryData = [tbl1,food_id];
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
exports.Foundationchartitems = new Foundationchartitems();