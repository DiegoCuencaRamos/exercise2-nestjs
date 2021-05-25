import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from 'src/board/schemas/board.schema';
import { TaskSchema } from 'src/task/schemas/task.schema';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListSchema } from './schemas/list.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Board', schema: BoardSchema },
            { name: 'List', schema: ListSchema },
            { name: 'Task', schema: TaskSchema }
        ])
    ],
    controllers: [ListController],
    providers: [ListService]
})
export class ListModule {}
