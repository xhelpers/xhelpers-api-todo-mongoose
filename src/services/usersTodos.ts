import UserTodo, { IUserTodo } from "../model/userTodo";
import { BaseServiceMongoose } from "xhelpers-api/lib/service";
import { Boom } from "xhelpers-api/lib/tools";

export class TodoService extends BaseServiceMongoose<IUserTodo> {
	protected sentitiveInfo: any = ["-__v"];
	constructor() {
		super(UserTodo);
	}
	protected async validate(
		entity: IUserTodo,
		payload: IUserTodo
	): Promise<boolean> {
		const invalid = false;
		if (invalid) throw new Error("Invalid payload.");
		return Promise.resolve(true);
	}

	public async getById(
		user: any,
		id: any,
		projection: any = [],
		populateOptions: { path: string | any; select?: string | any } = {
			path: ".",
			select: ["-__v"],
		}
	) {
		const entity = await super.getById(user, id, projection, populateOptions);
		if (!entity || entity.createdBy !== user._id)
			return Boom.notFound("Todo not found") as any;
		return entity;
	}

	public async update(user, id, payload) {
		const entity = (await this.Model.findById(id)) as IUserTodo;
		if (!entity || user._id !== entity.createdBy)
			return Boom.notFound("Todo not found");
		return await super.update(user, id, { ...payload });
	}

	public async delete(user: any, id: any): Promise<void> {
		const entity = (await this.Model.findById(id).lean()) as IUserTodo;
		if (!entity || user._id !== entity.createdBy)
			throw Boom.notFound("Todo not found");
		await this.Model.deleteOne({ _id: id });
	}
}
