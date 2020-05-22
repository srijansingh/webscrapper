const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const {amazon} = require('./controller/amazon');


const app = express();


const main =  () =>{
    console.log('Running amazon');
    amazon();
}



mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
)
.then(
    app.listen(port,  ()=> {
        console.log(`Server running at http://localhost:${port}`);
    })
)
.then(

    main()

)
.catch(err => {
    console.log(err);
})


