//Models
const {
  BipolarTransistor,
} = require("../../models/sequelize/bipolar-transistor");
//Enums
const { statusName } = require("../../enums/database/status");
const { paginationNameValueError } = require("../../enums/pagination/errors");
//Helpers
const {
  checkOrderBy,
} = require("../../helpers/pagination/bipolar-transistor/bipolar-transistor");
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
const { checkErrors } = require("../../helpers/sequelize/errors");
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  "Error in getAllBipolarTransistorService() function.";
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let bipolarTransistorList;
let queryStrParams;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated bipolar transistors from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllBipolarTransistorService = async (req, res) => {
  try {
    bipolarTransistorList = null;
    queryStrParams = null;
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = "id";
    orderAt = "ASC";
    msgLog = null;
    msgResponse = null;

    //-- start with pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != null) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(await queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page
        ? parseInt(await queryStrParams.page)
        : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (undefined || null)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (BipolarTransistor != (null && undefined)) {
      await BipolarTransistor.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
      })
        .then(async (bipolarTransistorItems) => {
          bipolarTransistorList = bipolarTransistorItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          bipolarTransistorList = await checkErrors(error, error.name);
        });
    } else {
      bipolarTransistorList = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME
      );
    }
  } catch (error) {
    msgResponse = GET_ALL_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    bipolarTransistorList = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME
    );
  }
  return bipolarTransistorList;
};

module.exports = {
  getAllBipolarTransistorService,
};
