import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { List } from "../../list/schemas/list.schema";

export type TaskDocument = Task & mongoose.Document

@Schema()
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true })
    list: List;
}

export const TaskSchema = SchemaFactory.createForClass(Task)