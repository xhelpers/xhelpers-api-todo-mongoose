import { BaseRoute } from "xhelpers-api/lib/route";
import { TodoService } from "../services/usersTodos";
import { todoQueryParams, todoCreatePayload } from "../schemas/usersTodos";
import { Boom } from "xhelpers-api/lib/tools";

const httpResourcePath = "users";

class TodoRoutes extends BaseRoute<TodoService> {
	constructor() {
		super(new TodoService(), [httpResourcePath]);

		this.route(
			"GET",
			`/api/${httpResourcePath}/todos`,
			{
				description: "Search 'Todos'",
			},
			true
		)
			.validate({ query: todoQueryParams })
			.handler(async (r, h, u) => {
				const result = await this.service.queryAll(u, {
					filter: {
						...r.query,
						createdBy: u._id,
					},
					fields: ["-__v"],
				});
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"GET",
			`/api/${httpResourcePath}/{id}/todos`,
			{
				description: "Get 'Todo' by id",
			},
			true
		)
			.handler(async (r, h, u) => {
				const result = await this.service.getById(u, r.params.id, [], {
					path: ".",
				});
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"POST",
			`/api/${httpResourcePath}/todos`,
			{
				description: "Create new 'Todo'",
			},
			true
		)
			.validate({ payload: todoCreatePayload })
			.handler(async (r, h, u) => {
				u.id = u._id;
				const result = await this.service.create(u, r.payload);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"PATCH",
			`/api/${httpResourcePath}/{id}/todos`,
			{
				description: "Update 'Todo' by id",
			},
			true
		)
			.validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
			.handler(async (r, h, u) => {
				const result = await this.service.update(u, r.params.id, r.payload);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"PUT",
			`/api/${httpResourcePath}/{id}/todos`,
			{
				description: "Replace 'Todo' by id",
			},
			true
		)
			.validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
			.handler(async (r, h, u) => {
				const result = await this.service.update(u, r.params.id, r.payload);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"DELETE",
			`/api/${httpResourcePath}/{id}/todos`,
			{
				description: "Delete 'Todo' by id",
			},
			true
		)
			.validate({ params: this.defaultIdProperty })
			.handler(async (r, h, u) => {
				await this.service.delete(u, r.params.id);
				return h.response({}).code(200);
			})
			.build();
	}
}

module.exports = [...new TodoRoutes().buildRoutes()];
