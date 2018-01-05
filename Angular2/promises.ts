

const weather=true;

const date=new Promise(function(resolve,reject){
 if(weather){
   
    const result={name:"kuamr",age:"22",address:"hyd"};

    resolve(result)

     }
     else{
      reject(new Error("Data Not Found"))

     }


 

});
     console.log(date);









     function showName (firstName, lastName) { 
      ​var nameIntro = "Your name is ";
          // this inner function has access to the outer function's variables, including the parameter​
      ​function makeFullName () {         
      ​return nameIntro + firstName + " " + lastName;     
      }
      ​
      ​return makeFullName (); 
      } 
      ​
      showName ("Michael", "Jackson"); // Your name is Michael Jackson 