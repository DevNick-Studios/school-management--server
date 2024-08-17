import { Controller } from '@nestjs/common';
import { ClassRelationService } from './class-relation.service';

@Controller('class-relation')
export class ClassRelationController {
  constructor(private readonly classRelationService: ClassRelationService) {}
}
