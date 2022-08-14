import { mongoose } from "xhelpers-api/lib/database/db-mongoose";

export interface IUserTodo extends mongoose.Document {
	task: string;
	created_at: Date;
	description: string;
	done: boolean;
	createdBy: string;
}

const schema = new mongoose.Schema({
	task: { type: String, required: true },
	description: { type: String, required: true },
	created_at: { type: Date, required: false, default: new Date() },
	done: { type: Boolean, required: false, default: false },
	createdBy: { type: String, required: false },
});

schema.set("toJSON", { virtuals: true });

export default mongoose.model<IUserTodo>("UserTodo", schema, "usersTodos");
