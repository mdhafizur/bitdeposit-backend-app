import { Module } from '@nestjs/common';
import {
  AgentTransactionsController,
  AgentsController,
} from '@src/agents/controllers';
import { AgentTransactionsService, AgentsService } from '@src/agents/services';

@Module({
  imports: [],
  controllers: [AgentsController, AgentTransactionsController],
  providers: [AgentsService, AgentTransactionsService],
})
export class AgentsModule {}
