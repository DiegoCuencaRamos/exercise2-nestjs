import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from './schemas/board.schema'
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ListSchema } from 'src/list/schemas/list.schema';
import { TaskSchema } from 'src/task/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Board', schema: BoardSchema },
      { name: 'List', schema: ListSchema },
      { name: 'Task', schema: TaskSchema }
    ])
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
