import { Controller, Post, Query } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { Auth } from '../auth/guards/global-auth.guard';
import { EAuth } from 'src/common/constants/auth.enum';

@Controller(EApiPathName.MOCK_DATA)
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Post('create')
  @Auth(EAuth.NONE)
  create(@Query() query: any) {
    return this.mockDataService.run(query);
  }
}
