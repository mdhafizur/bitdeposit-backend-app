import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Version,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { RedisCacheService } from '@src/core/services';
import { ApiExceptionResponseDTO, CreateRedisCacheDTO } from '../dtos';

@Controller('redis')
@ApiTags('Redis Cache API')
@ApiBearerAuth('JWT')
export class RedisController {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @Get()
  @Version('1')
  async getHello() {
    return 'Hello from redis!';
  }

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Set data in redis cachce.' })
  @ApiCreatedResponse({
    description: 'Successfully set hafiz@softic.ai to redis!',
  })
  @ApiBody({
    type: CreateRedisCacheDTO,
    required: true,
    description: 'Data needed to create Redis cache.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiProduces('application/json')
  async create(@Body() body: any) {
    const { key, data, duration } = body;
    return this.redisCacheService.setDataToRedis(key, data, duration);
  }

  @Get(':key')
  @Version('1')
  @ApiOperation({ summary: 'Get data By key' })
  @ApiParam({
    name: 'key',
    required: true,
    description: 'Should be an key that exists in the redis cache.',
    type: String,
  })
  @ApiOkResponse({
    description: 'Data retrieved successfully.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'Data with given key does not exist.',
  })
  async findOne(@Param('key') key: string) {
    return this.redisCacheService.getDataFromRedis(key);
  }

  @Delete(':key')
  @Version('1')
  @ApiParam({
    name: 'key',
    description: 'Should be an key that exists in the redis cache.',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiOperation({ summary: 'Delete a key from the redis cache.' })
  async remove(@Param('key') key: string) {
    return this.redisCacheService.deleteDataFromRedis(key);
  }
}
