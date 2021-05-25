import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from 'src/list/schemas/list.schema';
import { TaskSchema } from './schemas/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'List', schema: ListSchema },
      { name: 'Task', schema: TaskSchema }
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService]
  
})
export class TaskModule {}
