import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { List } from 'src/list/interfaces/list.interface';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './interfaces/task.interface';


@Injectable()
export class TaskService {
    
    constructor(
        @InjectModel('List') private readonly listModel: Model<List>,
        @InjectModel('Task') private readonly taskModel: Model<Task>,
    ) {}

    async createTask(listId: string, createTaskDto: CreateTaskDto): Promise<Task> {
        const list = await this.listModel.findById(listId)

        const task = new this.taskModel({
            ...createTaskDto,
            list: list._id
        })

        return await task.save()
    }

    async getListTasks(listId: string): Promise<Task[]> {
        const list = await this.listModel.findById(listId)
        const tasks = await this.taskModel.find({ list: list._id })
        return tasks
    }

    async getTask(taskId: string): Promise<Task> {
        const task = await this.taskModel.findById(taskId)
        return task
    }

    async updateTask(taskId: string, updateTaskDto: CreateTaskDto): Promise<Task> {
        const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, updateTaskDto, { new: true })
        return updatedTask
    }

    async changeTaskList(taskId: string, newListId: string): Promise<Task> {
        const list = await this.listModel.findById(newListId)
        const task = await this.taskModel.findById(taskId)

        task.list = list._id
        
        const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, task, { new: true })
        return updatedTask
    }

    async daleteTask(taskId: string): Promise<Task> {
        const deletedTask = await this.taskModel.findByIdAndDelete(taskId)
        return deletedTask
    }
}
