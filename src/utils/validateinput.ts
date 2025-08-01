import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import contactSchema from '../schemas/contact.json';

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true
});

// Add formats like email validation
addFormats(ajv);

export const validateContactForm = (data: unknown) => {
  const validate = ajv.compile(contactSchema);
  const valid = validate(data);
  
  if (!valid) {
    return {
      valid: false,
      errors: validate.errors?.map(error => ({
        field: error.instancePath.slice(1),
        message: error.message
      }))
    };
  }
  
  return {
    valid: true,
    data
  };
};