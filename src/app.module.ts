import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
import { BoardModule } from './board/board.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongoadmin:secret@mongo/nest-exercise?authSource=admin`),
    TaskModule,
    ListModule,
    BoardModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

// ${process.env.APP_HOST}
