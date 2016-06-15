import memoize from 'lru-memoize';
import { createValidator, required, minLength, email } from 'utils/validation';

const authFormValidation = createValidator({
  email   : [required, email],
  password: [required, minLength(6)]
});

export default memoize(10)(authFormValidation);