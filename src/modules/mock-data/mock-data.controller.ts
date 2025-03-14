import { Controller, Post } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { Auth } from '../auth/guards/global-auth.guard';
import { EAuth } from 'src/common/constants/auth.enum';

@Controller(EApiPathName.MOCK_DATA)
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Post()
  @Auth(EAuth.NONE)
  create() {
    return this.mockDataService.run();
  }
}
