import { Document } from 'mongoose'

export interface List extends Document {
    readonly name: string;
    readonly board: string;
}