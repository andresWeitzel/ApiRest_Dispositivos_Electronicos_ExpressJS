/**
 * Convierte una cadena en formato camelCase.
 * La cadena de entrada puede estar separada por espacios, guiones bajos o guiones.
 *
 * @param {string} key - La cadena a convertir a camelCase.
 * @returns {string} - La cadena convertida en formato camelCase.
 */
const generateCamelCase = (key) => {
  const words = key.split(/[\s_\-]/);
  if (words.length > 1) {
    const camelCase = words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word[0].toUpperCase() + word.slice(1).toLowerCase()
      ) 
      .join("");
    return camelCase;
  }
};

/**
 * Genera un conjunto de variantes de la cadena de entrada, incluyendo:
 * - La versión en minúsculas.
 * - La versión en mayúsculas.
 * - La versión con guiones bajos en lugar de guiones.
 * - La versión con espacios en lugar de guiones bajos.
 * - La versión en camelCase.
 *
 * @param {string} key - La cadena para generar variantes.
 * @returns {string[]} - Un array de variantes de la cadena de entrada.
 */
const generateVariants = (key) => {
  const variants = new Set();

  // Añadir versiones en minúsculas y mayúsculas
  variants.add(key.toLowerCase());
  variants.add(key.toUpperCase());

  // Reemplazar guiones bajos y guiones
  variants.add(key.replace(/-/g, "_"));
  variants.add(key.replace(/_/g, " ")); 
  variants.add(key.toLowerCase().replace(/_/g, " "));
  variants.add(key.toUpperCase().replace(/_/g, " "));

  variants.add(generateCamelCase(key));

  return [...variants];
};

/**
 * Crea un mapeo de variantes basadas en un mapeo de entrada.
 * Para cada clave en el mapeo de entrada, se generan todas sus variantes
 * y se asignan al mismo valor.
 *
 * @param {Object} baseMapping - Un objeto que contiene las claves originales y sus valores asociados.
 * @returns {Object} - Un objeto con todas las variantes de las claves y sus valores correspondientes.
 */
const createMappings = (baseMapping) => {
  const mapping = {};
  Object.entries(baseMapping).forEach(([key, value]) => {
    generateVariants(key).forEach((variant) => {
      mapping[variant] = value;
    });
  });
  return mapping;
};

module.exports = {
  createMappings,
};
