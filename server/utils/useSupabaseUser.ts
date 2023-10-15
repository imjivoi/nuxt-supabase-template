import { serverSupabaseUser } from '#supabase/server'

export default async function useSupabaseUser() {
	try {
		const user = await serverSupabaseUser(useEvent())
		return user
	} catch (error) {
		return null
	}
}
