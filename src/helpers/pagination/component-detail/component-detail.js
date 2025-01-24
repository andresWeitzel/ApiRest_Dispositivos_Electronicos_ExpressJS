const { component } = require("../../../enums/names/fields");
const {
  createMappings,
} = require("../../../helpers/validations/format/fields");
//Const-vars
let msgResponse;
let msgLog;

/**
 * @description Checks the "orderBy" query string parameter to map it to a specific field value
 * @param {String} orderBy The input string
 * @returns {String|null} The mapped field value or null if invalid
 */
const checkOrderBy = async (orderBy) => {
  try {
    if (typeof orderBy !== "string") {
      return null;
    }

    const orderByMapping = {
      [component.ID]: component.ID,
      [component.HOJA_DE_DATOS]: component.HOJA_DE_DATOS,
      [component.LONGITUD]: component.LONGITUD,
      [component.ANCHO]: component.ANCHO,
      [component.PESO]: component.PESO,
      [component.MATERIAL]: component.MATERIAL,
      [component.VOLTAJE_RRECOMENDADO]: component.VOLTAJE_RRECOMENDADO,
      [component.VOLTAJE_MIN_ENTRADA]: component.VOLTAJE_MIN_ENTRADA,
      [component.VOLTAJE_MAX_ENTRADA]: component.VOLTAJE_MAX_ENTRADA,
    };

    const mapping = createMappings(orderByMapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;
  } catch (error) {
    msgResponse =
      "ERROR in checkOrderBy() helper function from component-detail.js.";
    msgLog = msgResponse + ` Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
};
