// 3p
import { createConnection } from 'typeorm';
import { Proposal } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    title1: { type: 'string' },
    title2: { type: 'string' }
  },
  required: [ 'title1', 'title2' ],
  type: 'object',
};

export async function main({ title1, title2 }: { title1: string; title2: string }) {
  const connection = await createConnection();
  const titles = [title1, title2];
  try {
    for (const title of titles) {
      const proposal = new Proposal();
      proposal.title = title;
      console.log(await proposal.save());
    }
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
