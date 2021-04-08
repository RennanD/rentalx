import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const id = uuidV4();
  const password = await hash('rennan520', 8);

  const connection = await createConnection('localhost');

  connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", drive_license)
    values('${id}', 'Rennan Oliveira', 'admin@rentx.com.br', '${password}', true, '00000000')
    `
  );

  await connection.close();
}

create().then(() => console.log('User admin created'));
