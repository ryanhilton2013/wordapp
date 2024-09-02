import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WordsController } from './words/words.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WordsModule,
  ],
  controllers: [AppController, WordsController],
  providers: [AppService],
})
export class AppModule {}
