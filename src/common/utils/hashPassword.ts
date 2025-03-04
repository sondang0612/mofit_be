import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export { hashPassword };
