export const globalErr = (err, _req, _res, _next)=>{
    console.status(400).error(`❌ Error - ${err.message}`);
};

export const log = (req, _res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
};