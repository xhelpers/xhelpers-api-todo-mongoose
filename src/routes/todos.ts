import { BaseRoute } from "xhelpers-api/lib/route";
import { TodoService } from "../services/todos";
import { todoQueryParams, todoCreatePayload } from "../schemas/todos";
import { Boom } from "xhelpers-api/lib/tools";

const httpResourcePath = "todos";

class TodoRoutes extends BaseRoute<TodoService> {
	constructor() {
		super(new TodoService(), [httpResourcePath]);

		this.route(
			"GET",
			`/api/${httpResourcePath}`,
			{
				description: "Search 'Todos'",
			},
			false
		)
			.validate({ query: todoQueryParams })
			.handler(async (r, h, u) => {
				const result = await this.service.queryAll(u, {
					filter: r.query,
					fields: ["-__v"],
				} as any);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"GET",
			`/api/${httpResourcePath}/{id}`,
			{
				description: "Get 'Todo' by id",
			},
			false
		)
			.handler(async (r, h, u) => {
				const result = await this.service.queryAll({}, r.params as any);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"POST",
			`/api/${httpResourcePath}`,
			{
				description: "Create new 'Todo'",
			},
			false
		)
			.validate({ payload: todoCreatePayload })
			.handler(async (r, h, u) => {
				const result = await this.service.create({}, r.payload);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"PATCH",
			`/api/${httpResourcePath}/{id}`,
			{
				description: "Update 'Todo' by id",
			},
			false
		)
			.validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
			.handler(async (r, h, u) => {
				const result = await this.service.update(
					{},
					r.params.id,
					r.payload as any
				);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"PUT",
			`/api/${httpResourcePath}/{id}`,
			{
				description: "Replace 'Todo' by id",
			},
			false
		)
			.validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
			.handler(async (r, h, u) => {
				const result = await this.service.update(
					{},
					r.params.id,
					r.payload as any
				);
				if (Boom.isBoom(result)) return result;
				return h.response(result).code(200);
			})
			.build();

		this.route(
			"DELETE",
			`/api/${httpResourcePath}/{id}`,
			{
				description: "Delete 'Todo' by id",
			},
			false
		)
			.validate({ params: this.defaultIdProperty })
			.handler(async (r, h, u) => {
				await this.service.delete({}, r.params.id);
				return h.response({}).code(200);
			})
			.build();
	}
}

module.exports = [...new TodoRoutes().buildRoutes()];
