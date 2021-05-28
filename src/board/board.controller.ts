import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query, NotFoundException } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService) {}

    @Post('/create')
    async createBoard(@Res() res, @Body() createBoardDto: CreateBoardDto) {
        const board = await this.boardService.createBoard(createBoardDto)
        return res.status(HttpStatus.OK).json(board)

        try {
            const board = await this.boardService.createBoard(createBoardDto)
            return res.status(HttpStatus.OK).json(board)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to create board' })
        }
    }

    @Get('/')
    async getBoards(@Res() res) {
        try {
            const boards = await this.boardService.getBoards()
            return res.status(HttpStatus.OK).json(boards)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to fetch boards' })
        }
    }

    @Get('/:boardId')
    async getBoard(@Res() res, @Param('boardId') boardId) {
        try {
            const board = await this.boardService.getBoard(boardId)

            if (!board) {
                throw new NotFoundException('Board does not exist.')
            }

            return res.status(HttpStatus.OK).json(board)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to fetch board by id' })
        }
    }

    @Put('/update/:boardId')
    async updateBoard(@Res() res, @Param('boardId') boardId, @Body() updateBoardDto: CreateBoardDto) {
        try {
            const board = await this.boardService.updateBoard(boardId, updateBoardDto)

            if (!board) {
                throw new NotFoundException('Board does not exist.')
            }

            return res.status(HttpStatus.OK).json(board)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to update board' })
        }
    }

    @Delete('/delete/:boardId')
    async deteleBoard(@Res() res, @Param('boardId') boardId) {        
        try {
            await this.boardService.deleteAllDataInBoard(boardId)
            const board = await this.boardService.deleteBoard(boardId)

            if (!board) {
                throw new NotFoundException('Board does not exist.')
            }

            return res.status(HttpStatus.OK).json(board)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to delete board' })
        }
    }
}
