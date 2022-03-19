exports.setCookie=(req,res)=>{
    
    res.cookie('userName',req.body.userName,{
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('username cookie saved');
}

exports.getCookie=(req,res)=>{
    if(req.cookies.userName === undefined){
        return res.json('');
    }
    return res.json(req.cookies.userName);
}

exports.checkCookie=(req,res,next)=>{
    if(req.cookies.userName === undefined){
        return res.redirect('/');
    }
    next();
}