const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..','data','restaurants.json') //here '..' represents that we want to go up 1 level to higher directory(or the parent directory)

function getStoredRestaurants(){
    
   const fileData = fs.readFileSync(filePath);
   const storedRestaurants = JSON.parse(fileData);

   return storedRestaurants;
}
function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath,JSON.stringify(storableRestaurants));

}
module.exports = {           //this module is for exposing or exporting the functions or variables that we want to be available as and when called by app.js
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
}