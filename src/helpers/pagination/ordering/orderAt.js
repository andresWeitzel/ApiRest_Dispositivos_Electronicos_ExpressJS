const { names } = require("../../../enums/pagination/acronym");
const { createMappings } = require("../../validations/format/fields");

//Const-vars
let msgResponse;
let msgLog;


/**
 * @description checks the order at value of the query string param to assign a field value
 * @param {String} orderAt String type
 * @returns a string with the field value or null
 */
const checkOrderAt = async (orderAt) => {
  try {
    if (typeof orderAt != "string") {
      return null;
    }

    const orderAtMapping = {
      [names.ASCENDENTE]: names.ASCENDENTE,
      [names.DESCENDENTE]: names.DESCENDENTE,
    };

    const mapping = createMappings(orderAtMapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderAt)) {
      return mapping[orderAt];
    }

    return null;
  } catch (error) {
    msgResponse = "ERROR in checkOrderAt() helper function from orderAt.js";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderAt,
};
