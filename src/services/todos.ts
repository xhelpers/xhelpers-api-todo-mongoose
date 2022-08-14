import Todo, { ITodo } from "../model/todo";
import { BaseServiceMongoose } from "xhelpers-api/lib/service";

export class TodoService extends BaseServiceMongoose<ITodo> {
	protected sentitiveInfo: any = ["-__v"];
	constructor() {
		super(Todo);
	}
	protected async validate(entity: ITodo, payload: ITodo): Promise<boolean> {
		const invalid = false;
		if (invalid) throw new Error("Invalid payload.");
		return Promise.resolve(true);
	}
}
