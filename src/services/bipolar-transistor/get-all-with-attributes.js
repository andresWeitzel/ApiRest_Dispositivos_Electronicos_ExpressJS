//Externals
const { Op } = require('sequelize');
//Models
const {
  BipolarTransistor,
} = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/bipolar-transistor/bipolar-transistor');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in getAllWithAttributesBipolarTransistor() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let bipolarTransistorList;
let idComponenteParam;
let tipoParam;
let voltajeColecEmisParam;
let voltajeColecBaseParam;
let voltajeEmisBaseParam;
let voltajeColecEmisSatParam;
let corrienteColecParam;
let gananciaHfeParam;
let disipMaxParam;
let tempJuntParam;
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
 * @description get all paginated bipolar transistors list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesBipolarTransistor = async (req, res) => {
  try {
    bipolarTransistorList = null;
    queryStrParams = null;
    idComponenteParam = 0;
    tipoParam = null;
    voltajeColecEmisParam = null;
    voltajeColecBaseParam = null;
    voltajeEmisBaseParam = null;
    voltajeColecEmisSatParam = null;
    corrienteColecParam = null;
    gananciaHfeParam = null;
    disipMaxParam = null;
    tempJuntParam = null;
    //Pagination
    pageSizeNro = 10;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;
    msgResponse = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != null) {
      idComponenteParam = queryStrParams.idComponente
        ? queryStrParams.idComponente
        : idComponenteParam;
      tipoParam = queryStrParams.tipo ? queryStrParams.tipo : tipoParam;
      voltajeColecEmisParam = queryStrParams.voltajeColecEmis
        ? queryStrParams.voltajeColecEmis
        : voltajeColecEmisParam;
      voltajeColecBaseParam = queryStrParams.voltajeColecBase
        ? queryStrParams.voltajeColecBase
        : voltajeColecBaseParam;
      voltajeEmisBaseParam = queryStrParams.voltajeEmisBase
        ? queryStrParams.voltajeEmisBase
        : voltajeEmisBaseParam;
      voltajeColecEmisSatParam = queryStrParams.voltajeColecEmisSat
        ? queryStrParams.voltajeColecEmisSat
        : voltajeColecEmisSatParam;
      corrienteColecParam = queryStrParams.corrienteColec
        ? queryStrParams.corrienteColec
        : corrienteColecParam;
      gananciaHfeParam = queryStrParams.gananciaHfe
        ? queryStrParams.gananciaHfe
        : gananciaHfeParam;
      disipMaxParam = queryStrParams.disipMax
        ? queryStrParams.disipMax
        : disipMaxParam;
      tempJuntParam = queryStrParams.tempJuntura
        ? queryStrParams.tempJuntura
        : tempJuntParam;
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
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
    //-- end with querys params and pagination  ---

    if (BipolarTransistor != null) {
      await BipolarTransistor.findAll({
        attributes: {},
        where: {
          [Op.or]: {
            id_componente: {
              [Op.eq]: `${idComponenteParam}`,
            },
            tipo: {
              [Op.iLike]: `%${tipoParam}%`,
            },
            voltaje_colec_emis: {
              [Op.iLike]: `%${voltajeColecEmisParam}%`,
            },
            voltaje_colec_base: {
              [Op.iLike]: `%${voltajeColecBaseParam}%`,
            },
            voltaje_colec_emis_sat: {
              [Op.iLike]: `%${voltajeColecEmisSatParam}%`,
            },
            corriente_colec: {
              [Op.iLike]: `%${corrienteColecParam}%`,
            },
            ganancia_hfe: {
              [Op.iLike]: `%${gananciaHfeParam}%`,
            },
            disip_max: {
              [Op.iLike]: `%${disipMaxParam}%`,
            },
            temp_juntura: {
              [Op.iLike]: `%${tempJuntParam}%`,
            },
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
      })
        .then(async (componentDetailsItems) => {
          bipolarTransistorList = componentDetailsItems;
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
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = GET_ALL_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    bipolarTransistorList = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return bipolarTransistorList;
};

module.exports = {
  getAllWithAttributesBipolarTransistor,
};
