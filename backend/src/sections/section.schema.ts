import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ _id: false })
export class SectionItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const SectionItemSchema = SchemaFactory.createForClass(SectionItem);

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true })
  idea: string;

  @Prop({ required: true, type: [SectionItemSchema] })
  sections: SectionItem[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section); 