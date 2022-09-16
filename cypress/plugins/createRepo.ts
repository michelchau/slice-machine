import { InitClient } from "../../packages/init/src/utils/client";
import { ApplicationMode } from "../../packages/client/src/models/ApplicationMode";
import { PrismicSharedConfigManager } from "../../packages/core/src/prismic/SharedConfig";
import { Frameworks } from "../../packages/core/src/models/Framework";

// File called from the cypress setup in cypress-setup.sh
const [
  ,
  ,
  DOMAIN_NAME = "repository-cypress",
  PASSWORD = process.env.PASSWORD || "",
  CYPRESS_URL = process.env.CYPRESS_URL,
] = process.argv;

const appMode =
  CYPRESS_URL === "wroom.io"
    ? ApplicationMode.STAGE
    : CYPRESS_URL === "wroom.test"
    ? ApplicationMode.DEV
    : ApplicationMode.PROD;

const client = new InitClient(
  appMode,
  null,
  PrismicSharedConfigManager.getAuth()
);

const deleteAndCreate = async () => {
  await client
    .deleteRepository(
      DOMAIN_NAME,
      PASSWORD,
      PrismicSharedConfigManager.get().cookies
    )
    .catch((e) => {
      console.warn(
        `could not delete repo: ${DOMAIN_NAME} in ${appMode}. ${e.status}: ${e.message}`
      );
    });

  await client.createRepository(DOMAIN_NAME, Frameworks.next).catch((e) => {
    console.warn(
      `could not create repo: ${DOMAIN_NAME} in ${appMode}: ${e.status}: ${e.message}`
    );
    console.error(e.message);
    process.exit(1);
  });

  return;
};

deleteAndCreate();
