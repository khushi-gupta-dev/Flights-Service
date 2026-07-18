const express = require("express");




const {serverConfig , logger}  = require("./config")
const apiRoutes = require("./routes");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/api", apiRoutes);


const { City , Airport } = require("./models");

// console.log(process.env);
app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on port ${serverConfig.PORT}`);

});




