import { EventHandler } from 'h3'

const defineAuthEventhandler = <T>(handler: EventHandler<T>) =>
	defineEventHandler(async (event) => {
		const user = await useSupabaseUser()
		if (!user) {
			return sendError(event, createError({ statusCode: 401, message: 'Unauthorized' }))
		}
		try {
			return await handler(event, user)
		} catch (error: any) {
			if (error.statusCode === 400) {
				return sendError(event, { ...error, statusMessage: error.message })
			}
			return sendError(event, createError({ statusCode: 500, message: error.message }))
		}
	})

export default defineAuthEventhandler
