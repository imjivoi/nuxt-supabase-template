export default defineEventHandler(async () => {
	const user = await useSupabaseUser()

	if (!user) return null
	return {
		id: user.id,
		email: user.email,
		createdAt: user.created_at,
		updatedAt: user.updated_at,
	}
})
