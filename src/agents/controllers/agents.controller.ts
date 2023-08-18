import { Controller, Get, UseInterceptors, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@src/auth/common/decorators';
import { SentryInterceptor } from '@src/sentry/sentry.interceptor';
import { AgentsService } from '../services';

@Controller('agents')
@UseInterceptors(SentryInterceptor)
@ApiTags('Agents')
@ApiBearerAuth('JWT')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get('transactions/details/')
  @Version('1')
  async findUserTransactionsDetailsById(@GetCurrentUserId() agentId: string) {
    return await this.agentsService.findUserTransactionsDetailsById(agentId);
  }
}
