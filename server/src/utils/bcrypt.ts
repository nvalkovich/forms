import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from '../constants';

export const hash = async (value: string) => {
  const salt = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
  return await bcrypt.hash(value, salt);
};
