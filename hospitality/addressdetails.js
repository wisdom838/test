const mysql = require('mysql');
const md5 = require('md5');
var each = require('foreach');
var unixTime = require('unix-time');
var expressValidator = require('express-validator');
var Addressdetails = function () {};
Addressdetails.prototype.addressdetails = function (req,res) {
    var params = req.body;
    var query_type = params.query_type;
	console.log("1");
    if(query_type == "fetch_data")
    {
        getAddressDetails(req,res,callBack);
    }else if(query_type == "set_data"){

       // req.checkBody('type', 'Please enter demographics type').notEmpty();
        req.checkBody('memberid', 'Please enter  memberid ').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {  
            res.send({ "status": false, errors: errors});
        }else{
            CheckAddressDetailsExists(req,res,callBack);
        }

    }else if(query_type == "del_data") {
		
		DeleteAddressDetails(req,res,callBack);
	}
	
};


function CheckAddressDetailsExists(req,res,callback){
    var params = req.body;
    
    var id = params.id;
    var hpid = params.hpid;
    var building_no = params.building_no;
    var street_name = params.street_name;
    var street_no = params.street_no;
    var locality = params.locality;
    var suburb = params.suburb;
    var postal_code = params.postal_code;
    var state = params.state;
    var country = params.country;
    var type = params.type;
    var demographic_type = params.demographic_type;
    var index_id = params.index_id;
    var group_id = params.group_id;
 
     //var type = params.type;
     //item_category = item_category.trim();
	
	var tbl_name = HMS_HOSP_ADDRESS_DETAILS;

	if(typeof id!= "undefined"){
		var query1 = "select * from ?? where hpid = ? and building_no = ? and street_name = ? and street_no = ? and locality = ? and suburb = ? and postal_code = ? and state = ? and country = ? and type = ?  and demographic_type = ? and index_id = ? and group_id = ? and id not in (?) ";
		var queryData1 = [tbl_name,hpid,building_no,street_name,street_no,locality,suburb,postal_code,state,country,type,demographic_type,index_id,group_id,id];
	}else{
		var query1 = "select * from ?? where hpid = ? and building_no = ? and street_name = ? and street_no = ? and locality = ? and suburb = ? and postal_code = ? and state = ? and country = ? and type = ?  and demographic_type = ? and index_id = ? and group_id = ? ";
		var queryData1 = [tbl_name,hpid,building_no,street_name,street_no,locality,suburb,postal_code,state,country,type,demographic_type,index_id,group_id];
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
				if(typeof id != "undefined"){
					var query  = " SELECT * FROM ??  WHERE id= ? ";
					var queryData = [tbl_name,id];
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

function InsertAddressDetails(req,res,data,callback){
	var params = req.body;
    var tbl_name = HMS_HOSP_ADDRESS_DETAILS;
	
	var hpid = params.hpid;
    var building_no = params.building_no;
    var street_name = params.street_name;
    var street_no = params.street_no;
    var locality = params.locality;
    var suburb = params.suburb;
    var postal_code = params.postal_code;
    var state = params.state;
    var country = params.country;
    var type = params.type;
    var demographic_type = params.demographic_type;
    var index_id = params.index_id;
    var group_id = params.group_id;
    var memberid = params.memberid;
	   
	//var insertData= {"item_category_name":item_category,"created_by":memberid,"created_date":"current_timestamp()"}
	//var query = "INSERT INTO ?? SET ? ";
	var query = "insert into ?? (hpid,building_no,street_name,street_no,locality,suburb,postal_code,state,country,type,demographic_type,index_id,group_id,created_by,created_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,unix_timestamp(now()))";
	//var queryData = [tbl_name,insertData];
	var queryData = [tbl_name,hpid,building_no,street_name,street_no,locality,suburb,postal_code,state,country,type,demographic_type,index_id,group_id,memberid];
	query = mysql.format(query,queryData);
	db.query(query,function(err,result){
		if (err) {
			callback(err,{},2,req,res);
		}else{
			callback({},data,2,req,res);
		}
	})
}

function UpdateAddressDetails(req,res,data,callback){
	var params = req.body;
    var tbl_name = HMS_HOSP_ADDRESS_DETAILS;
    
    var id = params.id;
	var hpid = params.hpid;
    var building_no = params.building_no;
    var street_name = params.street_name;
    var street_no = params.street_no;
    var locality = params.locality;
    var suburb = params.suburb;
    var postal_code = params.postal_code;
    var state = params.state;
    var country = params.country;
    var type = params.type;
    var demographic_type = params.demographic_type;
    var index_id = params.index_id;
    var group_id = params.group_id;
    var memberid = params.memberid;
	
    var cond1 = "";
    var cond2 = "";
    var cond3 = "";
    var cond4 = "";
	var cond5 = "";
    var cond6 = "";
    var cond7 = "";
    var cond8 = "";
    var cond9 = "";
    var cond10 = "";
    var cond11 = "";
    var cond12 = "";
    var cond13 = "";
    
    if(typeof hpid != "undefined")
    {
       // cond1 = " menu_item = ?, ";
       cond1 = " hpid = '"+hpid+"', ";
    }

    if(typeof building_no != "undefined")
    {
        //cond2 = " min_number_choice_meal = ?, ";
        cond2 = " building_no = '"+building_no+"', ";        
    }

    if(typeof street_name != "undefined")
    {
        //cond3 = " minimum_serve = ?, ";
        cond3 = " street_name = '"+street_name+"', ";
	}
	
	if(typeof street_no != "undefined"){
		cond4 = " street_no = '"+street_no+"', ";
	}

	if(typeof locality != "undefined"){
		cond5 = " locality = '"+locality+"', ";
	}

	if(typeof suburb != "undefined"){
		cond6 = " suburb = '"+suburb+"', ";
    }
    
    if(typeof postal_code != "undefined"){
		cond7 = " postal_code = '"+postal_code+"', ";
    }
    
    if(typeof state != "undefined"){
		cond8 = " state = '"+state+"', ";
    }
    
    if(typeof country != "undefined"){
		cond9 = " country = '"+country+"', ";
    }
    
    if(typeof type != "undefined"){
		cond10 = " type = '"+type+"', ";
    }
    
    if(typeof demographic_type != "undefined"){
		cond11 = " demographic_type = '"+demographic_type+"', ";
    }
    
    if(typeof index_id != "undefined"){
		cond12 = " index_id = '"+index_id+"', ";
    }
    
    if(typeof group_id != "undefined"){
		cond13 = " group_id = '"+group_id+"', ";
    }
    
      	
	var query = "UPDATE ?? SET 	"+cond1+cond2+cond3+cond4+cond5+cond6+cond7+cond8+cond9+cond10+cond11+cond12+cond13+" modified_by= ?, modified_date = unix_timestamp(now()) WHERE ( id = ?)";
	var queryData = [tbl_name,memberid,id];
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
	function DeleteKitchenChartItem(req,res,callback){
	var params = req.body;
	var tbl_name = HMS_HOSP_ADDRESS_DETAILS;
    var id = params.id;
  //  var item_category = params.item_category;
  //  var memberid =params.memberid;
	var query = "DELETE FROM  ??  WHERE (id= ?)";
	var queryData = [tbl_name,id];
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
			UpdateAddressDetails(req,res,data,callBack);
		}else {
			InsertAddressDetails(req,res,data,callBack);
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


function getAddressDetails(req,res,callback){
    var params = req.body;
    //var user_id = params.user_id;
    var id = params.id;
    
    var tbl1  = HMS_HOSP_ADDRESS_DETAILS;
   
    if(id == "0"){
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
            var query = "SELECT * from ?? where id = ? ";
            var queryData = [tbl1,id];
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
exports.Addressdetails = new Addressdetails();