import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WORDAPP_BACKEND_API_KEY');
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.headers['authorization'];

    if (!apiKeyHeader || !apiKeyHeader.startsWith('ApiKey ')) {
      throw new UnauthorizedException('API Key is missing or invalid');
    }

    const [_, apiKeyValue] = apiKeyHeader.split(' ');

    if (apiKeyValue !== this.apiKey) {
      throw new UnauthorizedException('API Key is invalid');
    }

    return true;
  }
}
