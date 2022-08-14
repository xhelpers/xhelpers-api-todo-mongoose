import { Joi } from "xhelpers-api/lib/tools";

const todoBase = Joi.object({
	task: Joi.string().description("Title"),
	description: Joi.string().description("Description"),
	done: Joi.boolean().description("Todo is done"),
});
export const todoQueryParams = todoBase;
export const todoCreatePayload = todoBase
	.keys({
		task: Joi.string().required().description("Title"),
		description: Joi.string().required().description("Description"),
		done: Joi.boolean().required().default(false).description("Todo is done"),
	})
	.description("Todo payload")
	.label("TodoPayload");
