const { component } = require("../../../enums/names/fields");
const {
  createMappings,
} = require("../../../helpers/validations/format/fields");
//Const-vars
let msgResponse;
let msgLog;

/**
 * @description Maps and validates the "orderBy" query string parameter to a specific field value
 * @param {String} orderBy The input string
 * @returns {String|null} The mapped field value or null if invalid
 */
const checkOrderBy = (orderBy) => {
  try {
    if (typeof orderBy !== "string") {
      return null;
    }

    const orderByMapping = {
      [component.ID]: component.ID,
      [component.CODIGO]: component.CODIGO,
      [component.CODE]: component.CODIGO,
      [component.IMAGEN]: component.IMAGEN,
      [component.IMAGE]: component.IMAGEN,
      [component.NRO_PIEZA]: component.NRO_PIEZA,
      [component.NRO_PART]: component.NRO_PIEZA,
      [component.CATEGORIA]: component.CATEGORIA,
      [component.CATEGORY]: component.CATEGORIA,
      [component.DESCRIPCION]: component.DESCRIPCION,
      [component.DESCRIPTION]: component.DESCRIPCION,
      [component.FABRICANTE]: component.FABRICANTE,
      [component.MANUFACTURER]: component.FABRICANTE,
      ['maker']: component.FABRICANTE,
      [component.STOCK]: component.STOCK,
      [component.PRECIO]: component.PRECIO,
      [component.PRICE]: component.PRECIO,
    };

    const mapping = createMappings(orderByMapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;

  } catch (error) {
    msgResponse = "ERROR in checkOrderBy() helper function from component.js";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
};
