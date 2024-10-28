const { ServerlessAdapter } = require('@nestjs/platform-serverless');
const { AppModule } = require('./dist/app.module');  // Ajusta la ruta si es necesario
const express = require('express');
const app = express();

module.exports = ServerlessAdapter.forModule(AppModule, app);
