//External
require('dotenv').config();
//Services
const {
  addComponentService,
  updateComponentService,
  deleteComponentService,
  getAllComponentService,
  getComponentByIdService,
  getAllComponentLikeCodeService,
  getAllWithAttributesComponentService,
  getAllComponentLikeImageService,
  getAllComponentLikePartNumberService,
  getAllComponentLikeCategoryAndMakerService,
  getAllComponentWithDetailsService,
  getAllComponentWithBipolarTransistorService,
  getAllComponentWithAllModelsService,
  getAllComponentLikeDescriptionService,
  getAllComponentLikeStockMaxService,
  getAllComponentLikeStockService,
  getAllComponentLikeStockMinMaxService,
  getAllComponentLikePriceService,
  getAllComponentLikePriceMaxService,
  getAllComponentLikePriceMinMaxService,
} = require('../services/component.service');
//Enums
const { statusName, statusDetails } = require('../enums/database/status');
const { statusCode } = require('../enums/http/status-code');
const {
  paginationNameValueError,
  paginationDescriptionValueError,
} = require('../enums/pagination/errors');
//Const-vars
//status-code
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
// Pagination
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const ORDER_BY_DESCRIPTION_VALUE_ERROR =
  paginationDescriptionValueError.ORDER_BY_DESCRIPTION_VALUE_ERROR;
const ORDER_AT_DESCRIPTION_VALUE_ERROR =
  paginationDescriptionValueError.ORDER_AT_DESCRIPTION_VALUE_ERROR;
let newComponent;
let updatedComponent;
let deletedComponent;
let msgResponse;
let msgLog;

/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    newComponent = await addComponentService(req);

    switch (newComponent) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case 0:
      case undefined:
      case null:
        res
          .status(BAD_REQUEST_CODE)
          .send({ error: 'Bad request, could not add a component.' });
        break;
      default:
        if (
          typeof newComponent === 'object' &&
          newComponent.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(newComponent);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: newComponent });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in addComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;
    updatedComponent = await updateComponentService(req);

    switch (updatedComponent) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case 0:
      case undefined:
      case null:
        res
          .status(BAD_REQUEST_CODE)
          .send({ error: 'Bad request, could not update a component.' });
        break;
      default:
        if (
          typeof updatedComponent === 'object' &&
          updatedComponent.hasOwnProperty('objectUpdated')
        ) {
          res.status(OK_CODE).send(updatedComponent);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: updatedComponent });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in updateComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description delete a component from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    deletedComponent = await deleteComponentService(req);

    switch (deletedComponent) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case 0:
      case undefined:
      case null:
        res
          .status(BAD_REQUEST_CODE)
          .send({ error: 'Bad request, could not delete a component.' });
        break;
      default:
        if (
          typeof deletedComponent === 'object' &&
          deletedComponent.hasOwnProperty('objectDeleted')
        ) {
          res.status(OK_CODE).send(deletedComponent);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: deletedComponent });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in deleteComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error: 'Bad request, failed to obtain paginated component list.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to all atributes.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = `Error in getAllComponentController() function. Caused by ${error}`;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;
    componentList = null;

    componentList = await getAllWithAttributesComponentService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, failed to get all paginated components list according to all attributes.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to all atributes.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllWithAttributesComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentWithDetailsService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, failed to get all paginated components list and components_details according to all attributes.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res.status(OK_CODE).send({
            ok: 'No items found according to the component details model.',
          });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllWithDetailComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentWithBipolarTransistorService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, failed to get all paginated components list and bipolar_transistor according to all attributes.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res.status(OK_CODE).send({
            ok: 'No items found according to the bipolar transistor model.',
          });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllWithBipolarTransistorComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentWithAllModelsService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, failed to get all paginated components list and bipolar_transistor according to all attributes.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the all models.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllWithAllModelsComponentController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;

    componentList = await getComponentByIdService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get a component with the requested id. Check if the component exist into the database',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the id.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getComponentByIdController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to code from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCodeController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeCodeService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according the code.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the code.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentLikeCodeController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to image from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeImageController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeImageService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according the imagen.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the image.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentLikeImageController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to part number from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePartNumberController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikePartNumberService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according the nro de pieza.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the part number.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllComponentLikePartNumberController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to categoria and fabricante from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCategoryAndMakerController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeCategoryAndMakerService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according the categoria and fabricante.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the maker or category.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllComponentLikeCategoryAndMakerController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to description from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeDescriptionController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeDescriptionService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the description.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the description.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllComponentLikeDescriptionController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to stock from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeStockService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the stock.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the stock.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentLikeStockController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to stock max from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMaxController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeStockMaxService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the stock max.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the stock max.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentLikeStockMaxController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to stock min and max from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMinMaxController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikeStockMinMaxService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the stock min and max.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the stock min and max.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllComponentLikeStockMinMaxController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to the price from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikePriceService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the price.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the price.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentLikePriceController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to the max price from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceMaxController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikePriceMaxService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the max price.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the price max.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentLikePriceMaxController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

/**
 * @description get all paginated components according to the min and max price from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceMinMaxController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentLikePriceMinMaxService(req);

    switch (componentList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            'Bad request, could not get all paginated list components according to the min and max price.',
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res
            .status(OK_CODE)
            .send({ ok: 'No items found according to the price min and max.' });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllComponentLikePriceMinMaxController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  addComponentController,
  updateComponentController,
  deleteComponentController,
  getAllComponentController,
  getAllWithAttributesComponentController,
  getAllWithDetailComponentController,
  getAllWithBipolarTransistorComponentController,
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  getAllComponentLikeCodeController,
  getAllComponentLikeImageController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeDescriptionController,
  getAllComponentLikeStockController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
};
