module.exports = {

    //show the home page
    showHome:(req,res) => {
        res.render('pages/home');//render automatically look the views file
        
    }
};