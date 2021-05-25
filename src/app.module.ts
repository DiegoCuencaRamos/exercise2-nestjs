import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { ListModule } from './list/list.module';
import { BoardController } from './board/board.controller';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-exercise'),
    TaskModule,
    ListModule,
    BoardModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
