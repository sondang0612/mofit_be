import * as bcrypt from 'bcrypt';

const comparePassword = async (p1: string, p2: string) => {
  return await bcrypt.compare(p1, p2);
};

export { comparePassword };
