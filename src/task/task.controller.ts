import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('/:listId/task')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @Post('/create')
    async createTask(@Res() res, @Param('listId') listId, @Body() createTaskDto: CreateTaskDto) {
        try {
            const task = await this.taskService.createTask(listId, createTaskDto)
            return res.status(HttpStatus.OK).json(task)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to create task' })
        }
    }

    @Get('/')
    async getTasks(@Res() res, @Param('listId') listId) {
        try {
            const tasks = await this.taskService.getListTasks(listId)
            return res.status(HttpStatus.OK).json(tasks)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to fetch tasks' })
        }
    }

    @Get('/:taskId')
    async getTask(@Res() res, @Param('taskId') taskId) {
        try {
            const task = await this.taskService.getTask(taskId)

            if (!task) {
                throw new NotFoundException('Task does not exist.')
            }

            return res.status(HttpStatus.OK).json(task)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to fetch task by id' })
        }
    }

    @Put('/update/:taskId')
    async updateTask(@Res() res, @Param('taskId') taskId, @Body() updateTaskDto: CreateTaskDto) {
        try {
            const task = await this.taskService.updateTask(taskId, updateTaskDto)

            if (!task) {
                throw new NotFoundException('Task does not exist.')
            }

            return res.status(HttpStatus.OK).json(task)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to update task' })
        }
    }

    @Put('/change-list/:taskId')
    async changeTaskList(@Res() res, @Param('taskId') taskId, @Query('newListId') newListId) {
        try {
            const task = await this.taskService.changeTaskList(taskId, newListId)

            if (!task) {
                throw new NotFoundException('Task does not exist.')
            }

            return res.status(HttpStatus.OK).json(task)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to update task' })
        }
    }

    @Delete('/delete/:taskId')
    async deteleTask(@Res() res, @Param('taskId') taskId) {
        try {
            const task = await this.taskService.daleteTask(taskId)

            if (!task) {
                throw new NotFoundException('Task does not exist.')
            }

            return res.status(HttpStatus.OK).json(task)
        } catch(e) {
            return res.status(HttpStatus.FORBIDDEN).json({ error: 'Unable to delete task' })
        }
    }
}
