import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class WordApiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('WORDS_API_KEY');
    this.baseUrl = this.configService.get<string>('WORDS_API_URL');
    this.httpService = httpService;
  }
  async fetchAllDetails(word: string): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .get(`${this.baseUrl}/${word}`, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          Accept: 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err.status === 404) {
          throw new NotFoundException(`Word ${word} not found`);
        }
        throw new InternalServerErrorException(
          'An error occurred while fetching word details',
        );
      });
  }
}
