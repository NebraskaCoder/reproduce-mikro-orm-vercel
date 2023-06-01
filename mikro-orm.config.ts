import * as DotEnv from "dotenv";
const EnvFilePath: string = `${process.cwd()}/.env.development.local`;
DotEnv.config({ path: EnvFilePath });
import config from "./config/mikro-orm";

export default config;
