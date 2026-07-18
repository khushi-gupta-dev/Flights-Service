const express = require("express");




const {serverConfig , logger}  = require("./config")
const apiRoutes = require("./routes");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/api", apiRoutes);


const { City , Airport } = require("./models");

// console.log(process.env);
app.listen(serverConfig.PORT, async () => {
    console.log(`Server is running on port ${serverConfig.PORT}`);

    // const city = await City.findByPk(2);
    // await city.createAirport({name:"Indore airport", code:"IDR"});

    // const city = await City.findByPk(2);
    // await city.createAirport({name:"Indore airport", code:"IDR"});
   
    // await City.destroy({
    //     where: {
    //         id: 2
    //     }
    // });  // this will delete the city and all the associated airports because of CASCADE
});



