export const globalErr = (err, _req, res, _next)=>{
    res.status(400).error(`❌ Error - ${err.message}`);
};

export const log = (req, _res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
};