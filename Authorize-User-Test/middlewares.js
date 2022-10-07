const authPage = (permission) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (permission.includes(userRole)) {
            next();
        } else {
            res.status(403).json('You are not authorized to view this page');
        }
    }
}


const authCourse = (req, res, next) => {
    const courNumber = parseInt(req.params.number)
    if(req.body.courses.includes(courseNumber)) {
        next();
    }   else {  
        res.status(403).json('You are not authorized to view this course');
    }   
}


modukle.exports = { authPage, authCourse };