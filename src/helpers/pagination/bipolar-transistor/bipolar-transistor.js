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
const checkOrderBy = async (orderBy) => {
  try {
    if (typeof orderBy !== "string") return null;

    const orderByMapping = {
      [component.ID]: component.ID,
      [component.ID_COMPONENTE]: component.ID_COMPONENTE,
      [component.TIPO]: component.TIPO,
      [component.VOLTAJE_COLEC_EMIS]: component.VOLTAJE_COLEC_EMIS,
      [component.VOLTAJE_COLEC_BASE]: component.VOLTAJE_COLEC_BASE,
      [component.VOLTAJE_EMIS_BASE]: component.VOLTAJE_EMIS_BASE,
      [component.VOLTAJE_COLEC_EMIS_SAT]: component.VOLTAJE_COLEC_EMIS_SAT,
      [component.CORRIENTE_COLEC]: component.CORRIENTE_COLEC,
      [component.GANANCIA_HFE]: component.GANANCIA_HFE,
      [component.DISIP_MAX]: component.DISIP_MAX,
      [component.TEMP_JUNTURA]: component.TEMP_JUNTURA,
    };

    const mapping = createMappings(orderByMapping);

    console.log(mapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;
  } catch (error) {
    msgResponse =
      "ERROR in checkOrderBy() helper function from bipolar-transistor.js.";
    msgLog = msgResponse + ` Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
};
