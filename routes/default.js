const express = require('express');
const router = express.Router();
router.get('/',function(req,res){
    // const indexPath = path.join(__dirname,'views','index.html');
    // res.sendFile(indexPath);
    res.render('index'); //its function is to render a so-called template,means to parse a template file with help of a template engine and convert it to html which will be sent back to the browser
});
 
router.get('/about',function(req,res){
    res.render('about');
 });

 module.exports = router;