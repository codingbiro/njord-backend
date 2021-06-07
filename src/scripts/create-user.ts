// 3p
import { createConnection } from 'typeorm';
import { Company, User } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    name: { type: 'string' },
    password: { type: 'string' },
    company: { type: 'number' }
  },
  required: [ 'email', 'name', 'password', 'company' ],
  type: 'object',
};

export async function main({ email, name, password, company }: {email: string; name: string; password: string; company: number }) {
  const connection = await createConnection();

  try {
    const user = new User();
    user.email = email;
    user.name = name;    
    user.company = await Company.findOneOrFail(company);
    await user.setPassword(password);
    console.log(await user.save());
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
