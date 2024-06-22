import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  static getConfiguration() {
    return new DocumentBuilder()
      .setTitle('Nest Basic Api')
      .setDescription('Nest Basic Api description')
      .setVersion('1.0')
      .addTag('nest-basic')
      .addBearerAuth({ type: 'http' })
      .build();
  }
}
