//External
const componentRouter = require('express').Router();
//Controllers
const componentController = require("../../controllers/componentController");

componentRouter.post('/', componentController.addComponentController)

componentRouter.get('/list', componentController.getAllComponentController)

componentRouter.get('/id/:id', componentController.getComponentByIdController)

module.exports=componentRouter
