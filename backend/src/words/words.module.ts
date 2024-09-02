import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WordsController } from './words.controller';
import { WordApiClient } from './word-api-client.service';

@Module({
  imports: [HttpModule],
  providers: [WordApiClient],
  controllers: [WordsController],
  exports: [WordApiClient],
})
export class WordsModule {}
