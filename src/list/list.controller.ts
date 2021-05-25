import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/list.dto';
import { ListService } from './list.service';

@Controller('/:boardId/list')
export class ListController {

    constructor(private listService: ListService) {}

    @Post('/create')
    async createList(@Res() res, @Param() { boardId }, @Body() createListkDto: CreateListDto) {
        try {
            const list = await this.listService.createList(boardId, createListkDto)
            return res.status(HttpStatus.OK).json(list)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to create list' })
        }
    }

    @Get('/')
    async getLists(@Res() res, @Param() { boardId }) {
        try {
            const lists = await this.listService.getBoardLists(boardId)
            return res.status(HttpStatus.OK).json(lists)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to fetch lists' })
        }
    }

    @Get('/:listId')
    async getList(@Res() res, @Param('listId') listId) {
        try {
            const list = await this.listService.getList(listId)

            if (!list) {
                throw new NotFoundException('List does not exist.')
            }

            return res.status(HttpStatus.OK).json(list)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to fetch list by id' })
        }
    }

    @Put('/update/:listId')
    async updateList(@Res() res, @Param('listId') listId, @Body() updateListDto: CreateListDto) {
        try {
            const list = await this.listService.updateList(listId, updateListDto)

            if (!list) {
                throw new NotFoundException('List does not exist.')
            }

            return res.status(HttpStatus.OK).json(list)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to update list' })
        }
    }

    @Delete('/delete/:listId')
    async deteleList(@Res() res, @Param('listId') listId) {
        try {
            const list = await this.listService.deleteList(listId)

            if (!list) {
                throw new NotFoundException('List does not exist.')
            }

            return res.status(HttpStatus.OK).json(list)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to delete list' })
        }
    }
}
