const pName = require('../utils/page-names')
/**
 * Home Page Controller
 */
/* GET REQUEST FOR HOME PAGE  
   /
*/
exports.getHomePage= (req,res)=>{
    
    res.render('home-page',{
        pTitle : pName.HOME
    });
}
