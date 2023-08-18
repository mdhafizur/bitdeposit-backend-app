import { RedisCacheService } from '@src/core/services';
import { RedisController } from './controllers/redis.controller';
import {
  CacheModule,
  FactoryProvider,
  Global,
  Module,
  Scope,
} from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { PrismaService } from './services/prisma.service';
import { HttpModule } from '@nestjs/axios';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisStore from 'cache-manager-redis-store';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaClientManager } from '@src/prisma-client-manager';
import { Request } from 'express';

const prismaClientProvider: FactoryProvider<PrismaClient> = {
  provide: PrismaClient,
  scope: Scope.REQUEST,
  inject: [REQUEST, PrismaClientManager],
  useFactory: (request: Request, manager: PrismaClientManager) =>
    manager.getClient(request),
};

const CoreMicroServiceClientModule = ClientsModule.register([
  {
    name: 'CORE_MICROSERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://bitdeposit:bitdeposit@localhost:5672//'],
      queue: 'core_queue',
      queueOptions: { durable: false },
    },
  },
]);

const RedisCacheModule = CacheModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  }),
  inject: [ConfigService],
});

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    CoreMicroServiceClientModule,
    RedisCacheModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'), // <-- path to the static files
    // }),
  ],
  controllers: [CoreController, RedisController],
  providers: [
    PrismaClientManager,
    prismaClientProvider,
    CoreService,
    PrismaService,
    RedisCacheService,
  ],
  exports: [
    prismaClientProvider,
    PrismaService,
    CoreMicroServiceClientModule,
    HttpModule,
    RedisCacheService,
  ],
})
export class CoreModule {}
