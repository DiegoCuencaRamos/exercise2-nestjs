import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Board } from "../../board/schemas/board.schema";

export type ListDocument = List & mongoose.Document

@Schema()
export class List {
    @Prop({ required: true })
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true })
    board: Board;
}

export const ListSchema = SchemaFactory.createForClass(List)