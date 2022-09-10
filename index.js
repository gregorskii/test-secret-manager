import * as dotenv from 'dotenv';
import log from 'why-is-node-running';
import  { SecretManagerServiceClient } from '@google-cloud/secret-manager';

dotenv.config();

const client = new SecretManagerServiceClient();

const getSecrets = async () => {
  let name = `projects/${process.env.GOOGLE_ACCOUNT}/secrets/${process.env.GOOGLE_ACCOUNT_SECRET}/versions/latest`;

  const [ version ] = await client.accessSecretVersion({ name });
  const payload = version.payload
    && version.payload.data
    && version.payload.data.toString();

  if (payload) {
    return JSON.parse(payload);
  } else {
    throw new Error('No secrets retrieved from Secrets Manager');
  }
}

(async () => {
  const secrets = await getSecrets();
  //console.log(secrets);

  setTimeout(() => {
    setInterval(() => {
      log();
    }, 1000);
  }, 1000);
})();
