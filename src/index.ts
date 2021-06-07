import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core';

// App
import { AppController } from './app/app.controller';
import { Connection, createConnection } from 'typeorm';

async function main() {
  const connection = await createConnection();
  const serviceManager = new ServiceManager();
  serviceManager.set(Connection, connection);

  const app = await createApp(AppController, {
    serviceManager
  });

  const httpServer = http.createServer(app);
  const port = Config.get('port', 'number', 3001);
  httpServer.listen(port, () => displayServerURL(port));
}

main()
  .catch(err => { console.error(err.stack); process.exit(1); });
