const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./src/app.module');
const serverless = require('@netlify/functions');

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

exports.handler = serverless.createHandler(bootstrap);
