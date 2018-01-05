var express = require('express');

//const auth = require('../controller/services/hospitality/authpage.js');
const itemcategory = require('../controller/services/hospitality/itemcategory.js').Itemcategory
const weekmaster = require('../controller/services/hospitality/weekmaster.js').Weekmaster
const daymaster = require('../controller/services/hospitality/daymaster.js').Daymaster
const menucategory = require('../controller/services/hospitality/menucategory.js').Menucategory
const menusubcategory = require('../controller/services/hospitality/menusubcategory').Menusubcategory
const addresstypes = require('../controller/services/hospitality/addresstypes.js').Addresstypes
const communicationtypes = require('../controller/services/hospitality/communicationtypes.js').Communicationtypes
const demographicstypes = require('../controller/services/hospitality/demographicstypes.js').Demographicstypes
const dietstandards = require('../controller/services/hospitality/dietstandards.js').Dietstandards
const foundationchart = require('../controller/services/hospitality/foundationchart.js').Foundationchart
const foundationchartitems = require('../controller/services/hospitality/foundationchartitems.js').Foundationchartitems
const ingredientmaster = require('../controller/services/hospitality/ingredientmaster.js').Ingredientmaster
const nutritionvaluemaster = require('../controller/services/hospitality/nutritionvaluemaster.js').Nutritionvaluemaster
const itemingredients = require("../controller/services/hospitality/itemingredients.js").Itemingredients
const kitchenchart = require('../controller/services/hospitality/kitchenchart.js').Kitchenchart
const kitchenchartitems = require('../controller/services/hospitality/kitchenchartitems.js').Kitchenchartitems
const addressdetails = require('../controller/services/hospitality/addressdetails.js').Addressdetails
const fooditemquantitytype = require('../controller/services/hospitality/fooditemquantitytype.js').Fooditemquantitytype
const configmodules = require('../controller/services/hospitality/configmodules.js').Configmodules
const configchartmaster = require('../controller/services/hospitality/configchartmaster.js').Configchartmaster
const configsettings = require('../controller/services/hospitality/configsettings.js').Configsettings
const kitchenmaster = require('../controller/services/hospitality/kitchenmaster.js').Kitchenmaster
const fooditemmaster = require('../controller/services/hospitality/fooditemmaster.js').Fooditemmaster


var router = express.Router();
//router.use(auth);

/**
 * ITEM CATEGORY
 * @api {post} hospitality/itemcategory Item Category
 * @apiName Item Category Master
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} item_category
 * @apiParam  {Number} item_category_id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","item_category_id":"0"}  // retrieval
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","item_category_id":"10"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","item_category":"Condiments"}  //insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","item_category":"Beverages","item_category_id":"10"}  //updation
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"item_category","msg":"Please enter item_category"}]}
 */
router.post('/additemcategory', function(req, res, next) {
    console.log("at router page for add item category");
	itemcategory.additemcategory(req, res);              
});


router.post('/setitemcategory', function(req, res, next) {
    console.log("at router page for update item category");
	itemcategory.setitemcategory(req, res);              
});


router.post('/getitemcategory', function(req, res, next) {
    console.log("at router page for get item category");
	itemcategory.getitemcategory(req, res);              
});


router.post('/delitemcategory', function(req, res, next) {
    console.log("at router page for delete item category");
	itemcategory.delitemcategory(req, res);              
});


/**
 * WEEK MASTER
 * @api {post} hospitality/weekmaster Week Master
 * @apiName Week Master
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} week_name
 * @apiParam  {Number} week_id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","week_id":"0"}  //Retreival
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","week_id":"2"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","week_name":"Week One"} //insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","week_name":"Week Two","item_category_id":"2"}  // updation
 

 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"week_name","msg":"Please enter week_name"}]}
 */
router.post('/addweekmaster', function(req,res,next){
    console.log("at route for add week master");
    weekmaster.addweekmaster(req,res);
});

router.post('/setweekmaster', function(req,res,next){
    console.log("at route for set week master");
    weekmaster.setweekmaster(req,res);
});

router.post('/getweekmaster', function(req,res,next){
    console.log("at route for get week master");
    weekmaster.getweekmaster(req,res);
});

router.post('/delweekmaster', function(req,res,next){
    console.log("at route for del week master");
    weekmaster.delweekmaster(req,res);
});


/**
 * DAY MASTER
 * @api {post} hospitality/daymaster Day Master
 * @apiName Day Master
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} day_name
 * @apiParam  {Number} day_id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","da_id":"0"}  //Retrieval
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","day_id":"10"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","day_name":"Wednesday"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","day_name":"Tuesday","day_id":"5"}  //Updation
 * {"query_type":"set_data/fetch_data/del_data","memberid":"xxxxxxxxxxxx","day_name":"Tuesday","day_id":"5"}

 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"day_name","msg":"Please enter day name"}]}
 */
router.post('/daymaster', function(req,res,next){
    console.log("at route for day master");
    daymaster.daymaster(req,res);
});


/**
 * MENU CATEGORY
 * @api {post} hospitality/menucategory Menu Category
 * @apiName Menu Category
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} menu_categoryname
 * @apiParam  {String} menu_description
 * @apiParam  {Number} menu_categoryid
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","menu_categoryid":"0"}  //Retrieval
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","menu_categoryid":"10"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","menu_categoryname":"LargeMeals","menu_description":"Full meals with drinks and salads"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","menu_categoryname":"Breakfast","menu_categoryid":"5"}  //Updation
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"menu_categoryname","msg":"Please enter menu category name"}]}
 */
router.post('/addmenucategory', function(req,res,next){
    console.log("at route for menu category");
    menucategory.addmenucategory(req,res);
});

router.post('/setmenucategory', function(req,res,next){
    console.log("at route for set menu category");
    menucategory.setmenucategory(req,res);
});

router.post('/getmenucategory', function(req,res,next){
    console.log("at route for get menu category");
    menucategory.getmenucategory(req,res);
});

router.post('/delmenucategory', function(req,res,next){
    console.log("at route for delete menu category");
    menucategory.delmenucategory(req,res);
});



/**
 * MENU SUB CATEGORY
 * @api {post} hospitality/menusubcategory Menu-sub Category
 * @apiName Menu Sub Category
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} menu_sub_categoryname
 * @apiParam  {String} menu_sub_description
 * @apiParam  {Number} menu_sub_categoryid
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","menu_sub_categoryid":"0"}  //Retrieval
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","menu_sub_categoryid":"10"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","menu_sub_categoryname":"Meals","menu_sub_description":"meals with drinks and salads"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","menu_sub_categoryname":"Breakfast","menu_sub_categoryid":"5"}  //Updation
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"menu_sub_categoryname","msg":"Please enter menu sub category name"}]}
 */
router.post('/addmenusubcategory', function(req,res,next){
    console.log("at route for  add menu sub category");
    menusubcategory.addmenusubcategory(req,res);
});

router.post('/setmenusubcategory', function(req,res,next){
    console.log("at route for set menu sub category");
    menusubcategory.setmenusubcategory(req,res);
});

router.post('/getmenusubcategory', function(req,res,next){
    console.log("at route for get menu sub category");
    menusubcategory.getmenusubcategory(req,res);
});

router.post('/delmenusubcategory', function(req,res,next){
    console.log("at route for del menu sub category");
    menusubcategory.delmenusubcategory(req,res);
});


// on 01-12-2017
/**
 * ADDRESS TYPES
 * @api {post} hospitality/addresstypes Address Types
 * @apiName Address Types
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} type
 * @apiParam  {String} description
 * @apiParam  {Number} id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","id":"10"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","type":"Own","description":"have proprietary rights"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","type":"Leased","id":"2"}  //Updation
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"type","msg":"Please enter address type"}]}
 */
router.post('/addresstypes', function(req,res,next){
    console.log("at route for address types");
    addresstypes.addresstypes(req,res);
});

// on 01-12-2017
/**
 * COMMUNICATION TYPES
 * @api {post} hospitality/communicationtypes Communication Types
 * @apiName Communication Types
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} type
 * @apiParam  {String} description
 * @apiParam  {Number} id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","id":"5"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","type":"Mobile","description":"communicaiton throgh mobile sms"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","type":"Fax","id":"2"}  //Updation
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"type","msg":"Please enter communication type"}]}
 */
router.post('/addcommunicationtypes', function(req,res,next){
    console.log("at route for add communication types");
    communicationtypes.addcommunicationtypes(req,res);
});

router.post('/setcommunicationtypes', function(req,res,next){
    console.log("at route for set communication types");
    communicationtypes.setcommunicationtypes(req,res);
});

router.post('/getcommunicationtypes', function(req,res,next){
    console.log("at route for get communication types");
    communicationtypes.getcommunicationtypes(req,res);
});

router.post('/delcommunicationtypes', function(req,res,next){
    console.log("at route for deleting communication types");
    communicationtypes.delcommunicationtypes(req,res);
});

// on 01-12-2017
/**
 * DEMOGRAPHIC TYPES
 * @api {post} hospitality/demographictypes Demographic Types
 * @apiName Demographic Types
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} type
 * @apiParam  {String} description
 * @apiParam  {Number} id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","type":"Demographic one","description":"Demographic model one"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxx","type":"Demographic Two","id":"2"}  //Updation
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"type","msg":"Please enter demographic type"}]}
 */
router.post('/demographictypes', function(req,res,next){
    console.log("at route for demogrphic types");
    demographicstypes.demographicstypes(req,res);
});


// on 04-12-2017
/**
 * DIET STATNDARDS
 * @api {post} hospitality/dietstandards Diet Standards
 * @apiName Diet Standards
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {String} menu_item
 * @apiParam  {String} min_number_choice_meal
 * @apiParam  {String} minimum_serve
 * @apiParam  {String} menu_design_standards
 * @apiParam  {Number} standard_id
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","standard_id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","standard_id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxxx","menu_item":"veg sandwich","min_number_choice_meal":"2 times a day","minimum_serve":"6 pieces baked or roasted","menu_design_standards":"Standards as mentioned by Food corporation"}  //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxxxx","standard_id":"2","menu_design_standards":"as per medical records"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/dietstandards', function(req,res,next){
    console.log("at route for diet standards");
    dietstandards.dietstandards(req,res);
})


// on 06-12-2017
/**
 * ADDFOUNDATION CHART
 * @api {post} hospitality/addfoundationchart Foundation Chart
 * @apiName Add Foundation Chart
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4=","HMSAuthorization": "xxxxxxxxxx"} //btoa
 
 * @apiParam  {String} foundation_chart_name
 * @apiParam  {number} foundation_chart_code
 * @apiParam  {Number} food_price
  
 * @apiParamExample  {json} Request-Example:
 * {"foundation_chart_name":"Milk","foundation_chart_code":"1101","food_price":"25.00"} //Insertion
  
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"inserted successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{}]}
 */
router.post('/addfoundationchart', function(req,res,next){
    console.log("at route for adding foundation chart");
    foundationchart.addfoundationchart(req,res);
})


/**
 * SETFOUNDATION CHART
 * @api {post} hospitality/setfoundationchart Foundation Chart
 * @apiName Set Foundation Chart
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4=","HMSAuthorization": "xxxxxxxxxx"} //btoa
 
 * @apiParam  {String} foundation_chart_id
 * @apiParam  {String} foundation_chart_name
 * @apiParam  {number} foundation_chart_code
 * @apiParam  {Number} food_price
  
 * @apiParamExample  {json} Request-Example:
 * {"foundation_chart_name":"Coffee","foundation_chart_code":"1104","food_price":"18.00","foundation_chart_id":"3"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{}]}
 */
router.post('/setfoundationchart', function(req,res,next){
    console.log("at route for updation of foundation chart");
    foundationchart.setfoundationchart(req,res);
})

/**
 * GETALLFOUNDATION CHART
 * @api {post} hospitality/getallfoundationchart Foundation Chart
 * @apiName Getall Foundation Chart
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4=","HMSAuthorization": "xxxxxxxxxx"} //btoa
 
 * @apiParam  {String} foundation_chart_id
  
 * @apiParamExample  {json} Request-Example:
 * {"foundation_chart_id":"2"}  //Retrieval  
  
 * @apiSuccessExample {json} Success-Response:
 * {"status": true,"data": [{"foundation_chart_id": 2,"foundation_chart_name": "chart two","foundation_chart_code": "code 2","food_price": 11,"created_by": "sc14c70d44a4baa8","created_date": 1514897152,"modified_by": "sc14c70d44a4baa8","modified_date": 1514951582}]}
 
 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{}]}
 */
router.post('/getallfoundationchart', function(req,res,next){
    console.log("at route for getting foundation chart details");
    foundationchart.getallfoundationchart(req,res);
})

/**
 * DELFOUNDATION CHART
 * @api {post} hospitality/delfoundationchart Foundation Chart
 * @apiName Del Foundation Chart
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4=","HMSAuthorization": "xxxxxxxxxx"} //btoa
 
 * @apiParam  {String} foundation_chart_id
  
 * @apiParamExample  {json} Request-Example:
 * {"foundation_chart_id":"4"}
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"deleted successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{}]}
 */
router.post('/delfoundationchart', function(req,res,next){
    console.log("at route for deleting of foundation chart");
    foundationchart.delfoundationchart(req,res);
})


/**
 * FOUNDATION CHART ITEMS
 * @api {post} hospitality/foundationchartitems Foundation Chart Items
 * @apiName Foundation Chart Items
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {Number} foundation_chart_id
 * @apiParam  {Number} menu_categoryid
 * @apiParam  {Number} menu_sub_categoryid
 * @apiParam  {Number} item_id
 * @apiParam  {Unixtimestamp} scheduletime
 * @apiParam  {String} description
 
 
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","food_id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","food_id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","foundation_chart_id":"2","menu_categoryid":"2","menu_sub_categoryid":"1","item_id":"1","scheduletime":"1513664578"} //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","foundation_chart_id":"3","menu_categoryid":"3","food_id":"1"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/foundationchartitems', function(req,res,next){
    console.log("at route for foundation chart items");
    foundationchartitems.foundationchartitems(req,res);
})


/**
 * Nutritionvalue Master
 * @api {post} hospitality/Nutritionvaluemaster Nutrition Value Master
 * @apiName Nutrition Value Master
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {Number} ingredient_id
 * @apiParam  {Number} ingredient_type
 * @apiParam  {String} ingredient_name
 * @apiParam  {String} ingredient_description
  
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","ingredient_id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","ingredient_id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","ingredient_type":"0","ingreient_name":"white flour","ingredient_description":"contains more fat than calories"} //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","ingredient_type":"1","ingreient_name":"wheat flour","ingredient_id":"2"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
//router.post('/ingredientmaster', function(req,res,next){
//    console.log("at route for ingredient master");
//    ingredientmaster.ingredientmaster(req,res);
//})

router.post('/addnutritionvaluemaster', function(req,res,next){
    console.log("at route for  add nutrition value master");
    nutritionvaluemaster.addnutritionvaluemaster(req,res);
})

router.post('/setnutritionvaluemaster', function(req,res,next){
    console.log("at route for set nutrition value master");
    nutritionvaluemaster.setnutritionvaluemaster(req,res);
})

router.post('/getnutritionvaluemaster', function(req,res,next){
    console.log("at route for get nutrition value master");
    nutritionvaluemaster.getnutritionvaluemaster(req,res);
})

router.post('/delnutritionvaluemaster', function(req,res,next){
    console.log("at route for deleting nutrition value master");
    nutritionvaluemaster.delnutritionvaluemaster(req,res);
})


/**
 * Item Ingredients
 * @api {post} hospitality/itemingredients Item Ingredients
 * @apiName Item Ingredients
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {Number} ing_id
 * @apiParam  {Number} item_id
 * @apiParam  {Number} ingredient_id
 * @apiParam  {String} ingredient_quantity_type
 * @apiParam  {String} ingredient_description
   
 * @apiParamExample  {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","ing_id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","ing_id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","item_id":"2","ingredient_id":"1","ingredient_quantity_type":"solid food","ingreient_description":"can be given to patients not suffering with digestive problems"} //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","item_id":"1","ingredient_id":"2","ingredient_quantity_type":"liquid food","ingreient_description":"can be given to any one","ing_id":"2"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/itemingredients', function(req,res,next){
    console.log("at route for item ingredient");
    itemingredients.itemingredients(req,res);
})


/**
 * Kitchen Chart
 * @api {post} hospitality/kitchenchart Kitchen Chart
 * @apiName Kitchen Chart
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {Number} kitchen_chart_id
 * @apiParam  {Number} hid
 * @apiParam  {Number} week_id
 * @apiParam  {Number} day_id
 * @apiParam  {String} kitchen_chart_name
 * @apiParam  {String} kitchen_chart_code
   
 * @apiParamExample {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","kitchen_chart_id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","kitchen_chart_id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","hid":"2","week_id":"1","day_id":"3","kitchen_chart_name":"Breakfast Menu","kitchen_chart_code":"morning"} //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxxx","week_id":"2","kitchen_chart_id":"2"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/kitchenchart', function(req,res,next){
    console.log("at route for kitchen chart");
    kitchenchart.kitchenchart(req,res);
})


/**
 * Kitchen Chart Items
 * @api {post} hospitality/kitchenchartitems Kitchen Chart Items
 * @apiName Kitchen Chart Items
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {Number} kfood_id
 * @apiParam  {Number} kitchen_chart_id
 * @apiParam  {Number} menu_categoryid
 * @apiParam  {Number} item_id
 * @apiParam  {unixtimestamp} scheduletime
 * @apiParam  {String} description
    
 * @apiParamExample {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","kitchen_chart_id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx","kitchen_chart_id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxx","kitchen_chart_id":"6","menu_categoryid":"2","menu_sub_categoryid":"2","item_id":"1","scheduletime":"1514289600","description":"kitchen item"} //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxx","kfood_id":"1","menu_sub_categoryid":"2","item_id":"2"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/kitchenchartitems', function(req,res,next){
    console.log("at route for kitchen chart items ");
    kitchenchartitems.kitchenchartitems(req,res);
})


/**
 * Address Details
 * @api {post} hospitality/addressdetails Address Details
 * @apiName Address Details
 * @apiGroup Hospitality
 * @apiVersion  1.0.0
 
 * @apiHeaderExample {json} Header-Example:
 * {"Content-Type": "application/json","Authorization": "Basic YWRtaW46YWRtaW4="}

 * @apiParam  {String} query_type
 * @apiParam  {String} memberid
 * @apiParam  {Number} id
 * @apiParam  {Number} hpid
 * @apiParam  {Number} type
 * @apiParam  {Number} demographic_type
 * @apiParam  {Number} index_id
 * @apiParam  {Number} group_id
 * @apiParam  {String} building_no
 * @apiParam  {String} street_name
 * @apiParam  {String} locality
 * @apiParam  {String} suburb
 * @apiParam  {String} postal_code
 * @apiParam  {String} state
 * @apiParam  {String} country
 * @apiParam  {unixtimestamp} scheduletime
 * @apiParam  {String} description
    
 * @apiParamExample {json} Request-Example:
 * {"query_type":"fetch_data","memberid":"xxxxxxxxxxxx","id":"0"}  //Retrieval  
 * {"query_type":"del_data","memberid":"xxxxxxxxxxxx",id":"4"}
 * {"query_type":"set_data","memberid":"xxxxxxxxxx","hpid":"1","building_no":"145-10","street_name":"concord roads","street_no":"11","locality":"South coast","suburb":"coastarica","postal_code":"1478","state":"NSW","country":"Australia","type":"1","demographic_type":"1","index_id":"1","group_id":"1"} //Insertion
 * {"query_type":"set_data","memberid":"xxxxxxxxxx","id":"2","postal_code":"7777","state":"BRM","country":"Australia","type":"1","demographic_type":"1","index_id":"1","group_id":"1"}  //Updation  (updation fields optional)
 
 * @apiSuccessExample {json} Success-Response:
 * {"status":true,"msg":"updated successfully."}

 * @apiErrorExample {json} Error-Response:
 * {"status":false,"errors":[{"location":"body","param":"memberid","msg":"Please enter memberid"}]}
 */
router.post('/addressdetails', function(req,res,next){
    console.log("at route for address details");
    addressdetails.addressdetails(req,res);
});


/*FoodItemQuanityType */
router.post('/addfooditemquantitytype', function(req, res, next) {
    console.log("at router page for add food item quantity type");
	fooditemquantitytype.addfooditemquantitytype(req, res);              
});


router.post('/setfooditemquantitytype', function(req, res, next) {
    console.log("at router page for update food item quantity type");
	fooditemquantitytype.setfooditemquantitytype(req, res);              
});


router.post('/getfooditemquantitytype', function(req, res, next) {
    console.log("at router page for get food item quantity type");
	fooditemquantitytype.getfooditemquantitytype(req, res);              
});


router.post('/delfooditemquantitytype', function(req, res, next) {
    console.log("at router page for delete  food item quantity type");
	fooditemquantitytype.delfooditemquantitytype(req, res);              
});



/*ConfigModules   */
router.post('/addconfigmodules', function(req, res, next) {
    console.log("at router page for add config module");
	configmodules.addconfigmodule(req, res);              
});


router.post('/setconfigmodules', function(req, res, next) {
    console.log("at router page for update config modules");
	configmodules.setconfigmodule(req, res);              
});


router.post('/getconfigmodules', function(req, res, next) {
    console.log("at router page for get config module");
	configmodules.getconfigmodule(req, res);              
});


router.post('/delconfigmoudules', function(req, res, next) {
    console.log("at router page for delete  config module");
    configmodules.delconfigmodule(req, res);              
});



/*Config Chart Master   */
router.post('/addconfigchartmaster', function(req, res, next) {
    console.log("at router page for add config chart master");
	configchartmaster.addconfigchartmaster(req, res);              
});


router.post('/setconfigchartmaster', function(req, res, next) {
    console.log("at router page for update config chart master");
	configchartmaster.setconfigchartmaster(req, res);              
});


router.post('/getconfigchartmaster', function(req, res, next) {
    console.log("at router page for get config chart master");
	configchartmaster.getconfigchartmaster(req, res);              
});


router.post('/delconfigchartmaster', function(req, res, next) {
    console.log("at router page for delete  config chart master");
    configchartmaster.delconfigchartmaster(req, res);              
});


/* CONFIG SETTINGS */
router.post('/addconfigsettings', function(req, res, next) {
    console.log("at router page for add config settings");
	configsettings.addconfigsettings(req, res);              
});


router.post('/setconfigsettings', function(req, res, next) {
    console.log("at router page for update config settings");
	configsettings.setconfigsettings(req, res);              
});


router.post('/getconfigsettings', function(req, res, next) {
    console.log("at router page for get config settings");
	configsettings.getconfigsettings(req, res);              
});

router.post('/getallconfigsettings', function(req, res, next) {
    console.log("at router page for get all config settings");
	configsettings.getallconfigsettings(req, res);              
});


router.post('/delconfigsettings', function(req, res, next) {
    console.log("at router page for delete  config settings");
    configsettings.delconfigsettings(req, res);              
});


/* Kitchen Master   */
router.post('/addkitchenmaster', function(req, res, next) {
    console.log("at router page for add kitchen master");
	kitchenmaster.addkitchenmaster(req, res);              
});


router.post('/setkitchenmaster', function(req, res, next) {
    console.log("at router page for update kitchen master");
	kitchenmaster.setkitchenmaster(req, res);              
});


router.post('/getkitchenmaster', function(req, res, next) {
    console.log("at router page for get kitchen master");
	kitchenmaster.getkitchenmaster(req, res);              
});

router.post('/getallkitchenmaster', function(req, res, next) {
    console.log("at router page for get all kitchen master");
	kitchenmaster.getallkitchenmaster(req, res);              
});


router.post('/delkitchenmaster', function(req, res, next) {
    console.log("at router page for delete  kitchen master");
    kitchenmaster.delkitchenmaster(req, res);              
});


/*fooditemmaster*/
router.post('/addfooditemmaster', function(req, res, next) {
    console.log("at router page for add fooditem master");
	fooditemmaster.addfooditemmaster(req, res);              
});


router.post('/setfooditemmaster', function(req, res, next) {
    console.log("at router page for update fooditem master");
	fooditemmaster.setfooditemmaster(req, res);              
});


router.post('/getfooditemmaster', function(req, res, next) {
    console.log("at router page for get fooditem master");
	fooditemmaster.getfooditemmaster(req, res);              
});

router.post('/getallfooditemmaster', function(req, res, next) {
    console.log("at router page for get all fooditem master");
	fooditemmaster.getallfooditemmaster(req, res);              
});

router.post('/delfooditemmaster', function(req, res, next) {
    console.log("at router page for delete  fooditem master");
    fooditemmaster.delfooditemmaster(req, res);              
});

module.exports = router;