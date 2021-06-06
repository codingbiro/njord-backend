// 3p
import { createConnection } from 'typeorm';
import { User } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    name: { type: 'string' },
    password: { type: 'string' }
  },
  required: [ 'email', 'name', 'password' ],
  type: 'object',
};

export async function main({ email, name, password }: {email: string; name: string; password: string }) {
  const connection = await createConnection();

  try {
    const user = new User();
    user.email = email;
    user.name = name;    
    await user.setPassword(password);
    console.log(await user.save());
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
