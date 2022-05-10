module.exports = ((req, res, next)=>{
    Company.findOne().then((company) => {
        if(company){
          console.log(company.name)
        }
        else{
        }
        next()
    })
    .catch(err=>{
        console.log(err)
    });
})