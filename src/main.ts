import 'dotenv/config';
console.log(process.env.ELASTIC_APM_SECRET_TOKEN);
import apm from 'elastic-apm-node';
apm.start({
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
  environment: process.env.ELASTIC_APM_ENVIRONMENT,
});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dogs example')
    .setDescription('The dogs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      theme: 'bluePlanet',
      layout: 'classic',
      hideModels: true,
      showSidebar: false,
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
