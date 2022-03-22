/*
    POST REQUEST TO SET THE COOKIE
    /cookie/set
*/
exports.setCookie=(req,res)=>{
    
    res.cookie('userName',req.body.userName,{
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('username cookie saved');
}

/*
    GET REQUEST TO FETCH COOKIE
    /cookie/get
*/
exports.getCookie=(req,res)=>{
    if(req.cookies.userName === undefined){
        return res.json('');
    }
    return res.json(req.cookies.userName);
}

/*
    CHECKS IF REQUEST CONTAINS REQD. COOKIE
*/ 
exports.checkCookie=(req,res,next)=>{
    if(req.cookies.userName === undefined){
        return res.redirect('/');
    }
    next();
}