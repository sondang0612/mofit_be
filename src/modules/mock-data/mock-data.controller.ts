import { Controller, Post } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
import { EApiPathName } from 'src/common/constants/api-path.enum';

@Controller(EApiPathName.MOCK_DATA)
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Post()
  create() {
    return this.mockDataService.run();
  }
}
