var bodyParser = require('body-parser');
var validator = require('validator');
var errors1 = [];
var errors=[];
module.exports.reguser=function(req,res){
	try{
		var name= req.body.name;
		var email=req.body.email;
		var password=req.body.password;
		var cpassword=req.body.cpassword;
        var date=req.body.dob;
        var contactnumber=req.body.contactnumber;
        var acontactnumber=req.body.alternatecontact;
        var gender=req.body.gender;
        var states=req.body.states;

        //console.log(password  +cpassword);

		//validations
		req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('cpassword', 'Passwords do not match').equals(req.body.password);
        req.checkBody('dob','Date of Birth is required').notEmpty();
        req.checkBody('contactnumber','Contactnumber is required').notEmpty();
        
        errors = req.validationErrors() || null;
        // custom functions

        //Date validation
        function isbeforedate(str) {
            var givendate=str;
            var firstValue = "2008-01-01".split('-');
            var secondValue = "1900-12-31".split('-');
            var originalDate=givendate.split('-');
            console.log(givendate);
            var original=new Date();
            original.setFullYear(originalDate[0],(originalDate[1] - 1 ),originalDate[2]);
            var firstDate=new Date();
            firstDate.setFullYear(firstValue[0],(firstValue[1] - 1 ),firstValue[2]);
            var secondDate=new Date();
            secondDate.setFullYear(secondValue[0],(secondValue[1] - 1 ),secondValue[2]);   
            console.log(original);
            console.log(firstDate);
            console.log(secondDate);
           /* console.log(original.getTime());
            console.log(firstDate.getTime());
            console.log(secondDate.getTime());
              */
            if (original.getTime()>firstDate.getTime())
            {
                errors1.push({"msg" : "Enter year below 2008"});
                console.log(errors1);
            }
            if(original.getTime()<secondDate.getTime())
            { 
                errors1.push({"msg" : "Is an invalid date please enter above 1900 year"});
                console.log(errors1);
            }
        };
        //Contact comparing function
        function contcomp(var1,var2){
            if(var1==var2)
            {
               var length = errors1.push({"msg" : "Contact numbers must be different"});
               console.log(errors1);
            }
        };


        var datas=[
            {"msg": name},{"msg": email},{"msg": name},{"msg": password},{"msg": states},{"msg": date},
            {"msg": contactnumber},{"msg": acontactnumber}];
        var dateerror=isbeforedate(date);
        var contactcompare=contcomp(contactnumber,acontactnumber);
        var cond1=1;
        if(errors==null)
            {   
                console.log('condition 1 true');
                cond1=0;
            }
        if (cond1||errors1.length) {
            console.log('condition 2 True');
            console.log(errors);
            console.log(errors1);
            res.render('index', {
                errors: errors,
                errors1 : errors1});
           errors1=[];
           errors=[]; 
        }else{
            res.render('index', {
                datas: datas
            });
        }
    }
	catch(err){
        console.log(err);
	}	
};