import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CATEGORY_VALUES, CategoryCatalogue } from '../../../common/constants/category';

export type GameDocument = HydratedDocument<Game>;

@Schema({ timestamps: true, collection: 'games' })
export class Game {
  @Prop({ type: String, required: true, unique: true, trim: true })
  name!: string;

  @Prop({ type: String, required: true })
  creationDate!: string;

  @Prop({ type: String, required: true, enum: CATEGORY_VALUES })
  categoryType!: CategoryCatalogue;

  @Prop({ type: String })
  imageBase64?: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);