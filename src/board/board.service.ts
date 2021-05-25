import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { List } from 'src/list/interfaces/list.interface';
import { Task } from 'src/task/schemas/task.schema';
import { CreateBoardDto } from './dto/board.dto';
import { Board } from './schemas/board.schema';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel('Board') private readonly boardModel: Model<Board>,
        @InjectModel('List') private readonly listModel: Model<List>,
        @InjectModel('Task') private readonly taskModel: Model<Task>,
    ) {}

    async createBoard(createBoardtDto: CreateBoardDto): Promise<Board> {
        const board = new this.boardModel(createBoardtDto)
        return await board.save()
    }

    async getBoards(): Promise<Board[]> {
        const boards = await this.boardModel.find()
        return boards
    }

    async getBoard(boardId: string): Promise<Board> {
        const board = await this.boardModel.findById(boardId)
        return board
    }

    async updateBoard(boardId: string, updateBoardDto: CreateBoardDto): Promise<Board> {
        const updatedBoard = await this.boardModel.findByIdAndUpdate(boardId, updateBoardDto, { new: true })
        return updatedBoard
    }

    async deleteAllLsitsInBoard(boardId: string): Promise<void> {
        const board = await this.listModel.findById(boardId)
        await this.listModel.deleteMany({ list: board._id })
    }

    async deleteBoard(boardId: string): Promise<Board> {
        await this.deleteAllLsitsInBoard(boardId)
        const deletedBoard = await this.boardModel.findByIdAndDelete(boardId)
        return deletedBoard
    }
}
