// 3p
import { createConnection } from 'typeorm';
import { Company } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    name: { type: 'string' }
  },
  required: [ 'name' ],
  type: 'object',
};

export async function main({ name }: { name: string }) {
  const connection = await createConnection();
  try {
    const company = new Company();
    company.name = name;
    console.log(await company.save());
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
