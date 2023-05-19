const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const resData = require('../Util/restaurant-file');

router.get('/restaurants',function(req,res){
    let order =  req.query.order;
    let nxtorder = 'desc';
    if (order !== 'asc' && order !== 'desc' ) {
        order = 'asc';
    }
    if (order === 'desc'){
        nxtorder = 'asc';
    }
    const storedRestaurants = resData.getStoredRestaurants(); 
    storedRestaurants.sort(function(resA,resB) {  // sort method tries to  sort data automatically in an array
        if (
            (order === 'asc' && resA.name > resB.name) || 
            (order === 'desc' && resB.name > resA.name)){
            return 1
        }
        return -1
    }); 

    res.render('restaurants',{ 
        numberOfRestaurants: storedRestaurants.length, 
        restaurants: storedRestaurants,
        nxtorder : nxtorder
    });
})
router.get('/restaurants/:id',function (req,res){
   const restaurantsId = req.params.id;
   const storedRestaurants = resData.getStoredRestaurants();
   for(const restaurant of storedRestaurants) {
    if(restaurant.id === restaurantsId){
         return res.render('restaurant-detail',{restaurant:restaurant});
    } 
}
   res.status(404).render('404');

});



router.get('/recommendation',function(req,res){
    res.render('recommend');

});

router.post('/recommendation', function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurants();

    restaurants.push(restaurant);
    
    resData.storeRestaurants(restaurants)
    
    res.redirect('/confirm');
})

router.get('/confirm',function(req,res){
    res.render('confirm');
});

module.exports = router;