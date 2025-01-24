//Externals
const { Op } = require('sequelize');
//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/component/component');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
const { paginationNameValueError } = require('../../enums/pagination/errors');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_COMPONENT_ERROR_DETAIL =
  'Error in getAllWithAttributesComponentService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
//components
let componentList;
//params
let queryStrParams;
let codigoParam;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let stockParam;
let precioParam;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated components list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesComponentService = async (req, res) => {
  try {
    //Params
    componentList = null;
    queryStrParams = null;
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = 0;
    precioParam = 0;
    //Pagination
    pageSizeNro = 10;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;
    msgResponse = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      codigoParam = queryStrParams.codigo ? queryStrParams.codigo : codigoParam;
      imagenParam = queryStrParams.imagen ? queryStrParams.imagen : imagenParam;
      nroPiezaParam = queryStrParams.nroPieza
        ? queryStrParams.nroPieza
        : nroPiezaParam;
      categoriaParam = queryStrParams.categoria
        ? queryStrParams.categoria
        : categoriaParam;
      descripcionParam = queryStrParams.descripcion
        ? queryStrParams.descripcion
        : descripcionParam;
      fabricanteParam = queryStrParams.fabricante
        ? queryStrParams.fabricante
        : fabricanteParam;
      stockParam = queryStrParams.stock
        ? parseInt(queryStrParams.stock)
        : stockParam;
      precioParam = queryStrParams.precio ? queryStrParams.precio : precioParam;
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

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          [Op.or]: {
            codigo: {
              [Op.iLike]: `%${codigoParam}%`,
            },
            imagen: {
              [Op.iLike]: `%${imagenParam}%`,
            },
            nro_pieza: {
              [Op.iLike]: `%${nroPiezaParam}%`,
            },
            categoria: {
              [Op.iLike]: `%${categoriaParam}%`,
            },
            descripcion: {
              [Op.iLike]: `%${descripcionParam}%`,
            },
            fabricante: {
              [Op.iLike]: `%${fabricanteParam}%`,
            },
            stock: {
              [Op.eq]: stockParam,
            },
            precio: {
              [Op.eq]: precioParam,
            },
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_COMPONENT_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_ALL_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    componentList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return componentList;
};
module.exports = {
  getAllWithAttributesComponentService,
};
