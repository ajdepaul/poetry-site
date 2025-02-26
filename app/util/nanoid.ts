import { customAlphabet } from 'nanoid';
// no lookalikes safe alphabet https://github.com/CyberAP/nanoid-dictionary
const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 12);
export { nanoid };
