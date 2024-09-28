const authChecker = (req, res, next) => {
    if(!req.isLogged) {
        return res.json({msg: "not authorized"});
    }
    next();
  };
  
  module.exports = authChecker;
  