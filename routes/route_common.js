var express = require('express');
//********************************Common Service****************************************/
const patientdetails = require('../controller/services/common/patientdetails.js').Patientdetails
const userservices = require('../controller/services/common/user_services.js').UserServices
const accesstoken = require('../controller/services/common/accesstoken.js').Accesstoken
const patientlist = require('../controller/services/common/patientlist.js').Patientlist
const hospitals = require('../controller/services/common/hospitals.js').Hospitals

var router = express.Router();

/**
 * 
 * @api {post} common/accesstoken Access Token
 * @apiName Generate Access Token
 * @apiGroup Common
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {Number} hid hid
 * @apiParam  {Number} sid sid
 * @apiParam  {String} member_id Memberid
 * @apiParam  {Number} sesuid sub service id
 
 * @apiParamExample  {json} Request-Example:
 * {"hid":"121","sid":"33","member_id":"sc1599ec8756c5ec"}

 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"Access token generated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"sid","msg":"Please enter sid"},{"location":"body","param":"hid","msg":"Please enter hid"},{"location":"body","param":"member_id","msg":"Please enter member_id"}]}
  
 */
router.post('/accesstoken', function(req, res, next) {
	accesstoken.accesstoken(req, res);              
});
/**
 * 
 * @api {post} common/patientdetails Patient Details
 * @apiName Patient Details
 * @apiGroup Common
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {Number} app_id Appointment Id
 * @apiParam  {Number} patient_id Patient Id
 
 * @apiParamExample  {json} Request-Example:
 * {"app_id":"967"}

 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"data":{"appid":967,"patient_id":1100}}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":{"msg":"Excepting app_id or patient_id"}}
 */
router.post('/patientdetails', function(req, res, next) {
	patientdetails.patientdetails(req, res);              
});

/**
 * 
 * @api {post} common/patientlist Patient List
 * @apiName Patient List
 * @apiGroup Common
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {Number} hid hid

 * @apiParamExample  {json} Request-Example:
 * {"hid":"121"}

 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"data":[{"appid":71,"docname":"sandra CHENG","hname":"HOSPITAL A","hid":121,"start_date":"2015-08-07T12:35:00.000Z","end_date":"2015-08-07T12:40:00.000Z","doctor_id":"sc14c147cc7720f7","patient_id":662,"pat_name":"Michael Doler","appt_time":"18:05","pfname":"Michael","plname":"Doler","ev_status":"Pending","gender":"M","pdob":null,"paddress1":null,"paddress2":null,"psubrb":null,"suburb_name":null,"patientmobile":"9856320147","patientemail":"","mrno":121419,"referal_doc":null,"refaddress":null},{"appid":72,"docname":"amira BISHAI","hname":"HOSPITAL A","hid":121,"start_date":"2015-08-07T12:40:00.000Z","end_date":"2015-08-07T12:45:00.000Z","doctor_id":"sc14ecb9b3017f53","patient_id":663,"pat_name":"Rogan Mint","appt_time":"18:10","pfname":"Rogan","plname":"Mint","ev_status":"Completed","gender":"M","pdob":null,"paddress1":null,"paddress2":null,"psubrb":null,"suburb_name":null,"patientmobile":"9874510365","patientemail":"","mrno":121420,"referal_doc":"Rodger Neal","refaddress":""}]}
 * 
 
 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"hid","msg":"Please enter hid"}]}
 */
router.post('/patientlist', function(req, res, next) {
	patientlist.patientlist(req, res);              
});

/**
 * 
 * @api {post} common/userservices User Services
 * @apiName User Services
 * @apiGroup Common
 * @apiVersion  1.0.0

 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} memberid Memberid
 
 * 
 * @apiParamExample  {json} Request-Example:
 * {"memberid":"sc154d1d7ec8915f"}
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"data":{"Medical Transcription":[{"hos_key":"Tf8ZGCYL5AQSwg66","hid":1,"hname":"St Vincents","dss_code":"VIGA","huid":212,"is_pms":0,"ftp_username":"mtftp1@bijib.biz","ftp_password":"mtftp1@123$","ftp_host":"www.bijib.biz","ftp_foldername":"mtftp1","sesuid":0,"sid":7,"doc_types":[{"id":1,"type":"(INT)","description":"dw wefefwefe","created_on":"2012-08-01T06:24:42.000Z","created_by":"1","modified_on":"0000-00-00 00:00:00","modified_by":""}]},{"hos_key":"UTvDO5aVyEYn0n4C","hid":28,"hname":"NuLife Medical Services Pty Ltd","dss_code":"VIGA","huid":218,"is_pms":0,"ftp_username":"mtftp1@bijib.biz","ftp_password":"mtftp1@123$","ftp_host":"www.bijib.biz","ftp_foldername":"mtftp1","sesuid":0,"sid":7,"doc_types":[{"id":1,"type":"(INT)","description":"dw wefefwefe","created_on":"2012-08-01T06:24:42.000Z","created_by":"1","modified_on":"0000-00-00 00:00:00","modified_by":""},{"id":2,"type":"(LTD)","description":"5yg4erb drbr","created_on":"2012-08-01T06:25:38.000Z","created_by":"1","modified_on":"0000-00-00 00:00:00","modified_by":""}]}]}}
 
 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/userservices',function(req,res,next){
	userservices.userservices(req,res);
});

/**
 * 
 * @api {post} common/Hospitals Hospitals List
 * @apiName Hospitals List
 * @apiGroup Common
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {Number} hid hid

 * @apiParamExample  {json} Request-Example:
 * {"hid":"99"}  // if hid is passed only hospital details are returned , if not passed all active hosptials details are returned

 * @apiSuccessExample {json} Success-Response:
 * //all hostitals
 * {"status": true,"data": [{"hid": 99,"hname": "BIJIB","hcode": "BIJIB"}, {"hid": 105,"hname": "TEST HOSPITAL","hcode": "TEST"}]}
 * // for hid  = 105
 * {"status": true,"data": [{"hid": 105,"hname": "TEST HOSPITAL","hcode": "TEST"}]}
 
 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[]}
 */
router.post('/hospitals', function(req, res, next) {
	hospitals.hospitals(req, res);              
});


module.exports = router;