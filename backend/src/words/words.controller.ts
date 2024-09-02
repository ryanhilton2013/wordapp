import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { WordApiClient } from './word-api-client.service';

@Controller('/words')
export class WordsController {
  constructor(private readonly wordsAPI: WordApiClient) {}
  @Get(':word')
  @UseGuards(ApiKeyGuard)
  allDetails(@Param('word') word: string) {
    return this.wordsAPI.fetchAllDetails(word);
  }
}
