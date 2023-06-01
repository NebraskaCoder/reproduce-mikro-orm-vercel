const DotEnv = require("dotenv");
const EnvFilePath = `${process.cwd()}/.env.development.local`;
DotEnv.config({ path: EnvFilePath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
