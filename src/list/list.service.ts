import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Board } from 'src/board/interfaces/board.interface';
import { Task } from 'src/task/schemas/task.schema';
import { CreateListDto } from './dto/list.dto';
import { List } from './interfaces/list.interface';

@Injectable()
export class ListService {
    constructor(
        @InjectModel('Board') private readonly boardModel: Model<Board>,
        @InjectModel('List') private readonly listModel: Model<List>,
        @InjectModel('Task') private readonly taskModel: Model<Task>,
    ) {}

    async createList(boardId:string, createListDto: CreateListDto): Promise<List> {
        const board = await this.boardModel.findById(boardId)

        const list = new this.listModel({
            ...createListDto,
            board: board._id
        })

        return await list.save()
    }

    async getBoardLists(boardId: string): Promise<List[]> {
        const board = await this.boardModel.findById(boardId)
        const list = await this.listModel.find({ board: board._id })
        return list
    }

    async getList(listId: string): Promise<List> {
        const list = await this.listModel.findById(listId)
        return list
    }

    async updateList(listId: string, updateListDto: CreateListDto): Promise<List> {
        const updatedList = await this.listModel.findByIdAndUpdate(listId, updateListDto, { new: true })
        return updatedList
    }

    async deleteAllTasksInList(listId: string): Promise<void> {
        const list = await this.listModel.findById(listId)
        await this.taskModel.deleteMany({ list: list._id })
    }

    async deleteList(listId: string): Promise<List> {
        await this.deleteAllTasksInList(listId)
        const deletedList = await this.listModel.findByIdAndDelete(listId)
        return deletedList
    }
}
