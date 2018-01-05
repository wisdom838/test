var commonFn = require('../common/hms_commonfunctions.js');
var atob = require("atob");


function authpage(auth_header,seperator){
//function authpage(req){

  //  console.log(HMS_AUTHENTICATION);
    //var auth_header = req.get(HMS_AUTHENTICATION);
    //var seperator = HMS_AUTHSEPERATOR;
    console.log(auth_header);
    var urlToken = atob(auth_header);
    var hos_id = "";
    var service_id = "";
    var sub_service_id = "";
    var role_id = "";
    var dept_id = "";
    var child_role_id = "";
    var user_status = "";
    var group_id = "";
    var ums = "";
    var memberid = "";
 //   $hos_id/$serviceid/$sub_service_id/$role_id/$dept_id/0/$userstatus/$groupid/ums/$memberid
var auth_header = commonFn.getSplitArray(urlToken,seperator);

if(auth_header.length>0){
this.hos_id = auth_header[0];
this.service_id = auth_header[1];
this.sub_service_id = auth_header[2];
this.role_id = auth_header[3];
this.dept_id = auth_header[4];
this.child_role_id = auth_header[5];
this.user_status = auth_header[6];
this.group_id = auth_header[7];
this.ums = auth_header[8];
this.memberid = auth_header[9];
}    



}

module.exports = authpage;