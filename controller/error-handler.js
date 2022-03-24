const pName = require('../utils/page-names')

/*
    /error/404
*/
exports.pageNotFound = function(req,res){
    res.render('error',{
        pTitle : pName.NOTFOUND
    });
};