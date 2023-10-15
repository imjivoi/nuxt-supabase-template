import { serverSupabaseClient } from '#supabase/server'
import { Database } from '../types/database.types'

export default function useSupabaseClient() {
	return serverSupabaseClient<Database>(useEvent())
}
