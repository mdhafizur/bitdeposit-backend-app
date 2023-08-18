/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  private clients: { [key: string]: PrismaClient } = {};

  getTenantId(request: Request) {
    // TODO: retrieve and return tenantCode from the request object
    return request.headers.tenantcode != undefined
      ? String(request.headers.tenantcode)
      : null;
  }

  async getClient(request: Request): Promise<PrismaClient> {
    const tenantCode = this.getTenantId(request)
      ? this.getTenantId(request)
      : 'public';

    // if (tenantCode != 'public') {
    //   const prismaClient = new PrismaClient();
    //   const tenantInfo: any = await prismaClient.usersUserTenant.findUnique({
    //     where: {
    //       code: tenantCode,
    //     },
    //   });
    //   const databaseURL = tenantInfo.metaData.database.url;

    //   let client = this.clients[tenantCode];

    //   if (!client) {
    //     console.log(databaseURL);
    //     client = new PrismaClient({
    //       datasources: {
    //         mainDb: {
    //           url: databaseURL,
    //         },
    //       },
    //     });

    //     // setup prisma middlewares if any

    //     this.clients[tenantCode] = client;
    //   }

    //   return client;
    // }

    let client = this.clients[tenantCode];

    if (!client) {
      const databaseUrl = process.env.DATABASE_URL?.replace(
        'public',
        tenantCode,
      );
      console.log(databaseUrl);
      client = new PrismaClient({
        datasources: {
          mainDb: {
            url: databaseUrl,
          },
        },
      });

      // setup prisma middlewares if any

      this.clients[tenantCode] = client;
    }

    return client;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );
  }
}
