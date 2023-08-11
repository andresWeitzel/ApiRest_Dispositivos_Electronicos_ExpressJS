//External
require("dotenv").config();
//Services
const {
  addComponentService,
  getAllComponentService,
  getComponentByIdService,
  getAllComponentLikeCodigoService,
  getAllWithAttributesComponentService,
  getAllComponentLikeImagenService,
  getAllComponentLikeNroPiezaService,
  getAllComponentLikeCategoriaFabricanteService,
  getAllComponentWithDetailsService,
  getAllComponentWithBipolarTransistorService,
  getAllComponentWithAllModelsService,
  updateComponentService,
} = require("../services/component-service");
//Enums
const { statusName, statusDetails } = require("../enums/database/status");
const { statusCode } = require("../enums/http/status-code");
const { value } = require("../enums/general/value");
//Const-vars
let newComponent;
let updatedComponent;
let msg;
let code;
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
const statusConnectionError = statusName.CONNECTION_ERROR;
const statusConnectionErrorDetail = statusDetails.CONNECTION_ERROR_DETAIL;
const statusConnectionRefused = statusName.CONNECTION_REFUSED;
const statusConnectionRefusedDetail = statusDetails.CONNECTION_REFUSED_DETAIL;

/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;
    newComponent = await addComponentService(req);

    switch (newComponent) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res
          .status(statusCodeBadRequest)
          .send({ error: "Bad request, could not add a component." });
        break;
      default:
        if (
          typeof newComponent === "object" &&
          newComponent.hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(newComponent);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: newComponent });
        break;
    }
  } catch (error) {
    msg = {
      error: `Error in addComponentController() function. Caused by ${error}`,
    };
    console.log(msg);
    res.status(statusCodeInternalServerError).send(msg);
  }
};

/**
 * @description update a componente from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;
    updatedComponent = await updateComponentService(req);

    switch (updatedComponent) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = {
          error:
            "Error. An error has occurred with the connection or query to the database.",
        };
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = {
          econnrefused: `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`,
        };
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg = { error: "Bad request, could not update a component." };
        res.status(code).send(msg);
        break;
      default:
        if (
          typeof updatedComponent === "object" &&
          updatedComponent.hasOwnProperty("objectUpdated")
        ) {
          code = statusCode.OK;
          res.status(code).send(updatedComponent);
          break;
        }
        code = statusCode.BAD_REQUEST;
        msg = { error: updatedComponent };
        res.status(code).send(msg);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = {
      error: `Error in updateComponentController() function. Caused by ${error}`,
    };
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg = "Bad request, could not get all paginated list components.";
        res.status(code).send(msg);
        break;
      default:
        if (
          typeof componentList === "object" &&
          componentList[0].hasOwnProperty("id")
        ) {
          code = statusCode.OK;
          res.status(code).send(componentList);
          break;
        }
        code = statusCode.BAD_REQUEST;
        msg = { error: componentList };
        res.status(code).send(msg);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllWithAttributesComponentService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, get all paginated components list according to all attributes.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithAttributesComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list with details for component_details table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithDetailComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentWithDetailsService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request for get all paginated components list and components_details according to all attributes.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithDetailComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list with details for bipolar_transistor table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithBipolarTransistorComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentWithBipolarTransistorService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request for get all paginated components list and bipolar_transistor according to all attributes.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithBipolarTransistorComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list with all models/table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAllModelsComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentWithAllModelsService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request for get all paginated components list and all models according to all attributes.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithAllModelsComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get a component based its id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getComponentByIdController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getComponentByIdService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}. Check that the entered code is unique`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, could not get a component with the requested id. Check if the component exist into the database";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getComponentByIdController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to code from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCodigoController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeCodigoService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, could not get all paginated list components according the code.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeCodigoController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to imagen from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeImagenController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeImagenService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, could not get all paginated list components according the imagen.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeImagenController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to nro de pieza from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeNroPiezaController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeNroPiezaService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, could not get all paginated list components according the nro de pieza.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeNroPiezaController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to categoria and fabricante from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCategoriaFabricanteController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeCategoriaFabricanteService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, could not get all paginated list components according the categoria and fabricante.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeCategoriaFabricanteController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

module.exports = {
  addComponentController,
  updateComponentController,
  getAllComponentController,
  getAllWithAttributesComponentController,
  getAllWithDetailComponentController,
  getAllWithBipolarTransistorComponentController,
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  getAllComponentLikeCodigoController,
  getAllComponentLikeImagenController,
  getAllComponentLikeNroPiezaController,
  getAllComponentLikeCategoriaFabricanteController,
};
