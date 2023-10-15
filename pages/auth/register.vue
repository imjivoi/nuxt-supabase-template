<template>
	<div class="h-[90vh] flex items-center justify-center">
		<u-card
			:ui="{
				base: 'max-w-sm w-full',
			}"
		>
			<template #header>
				<h2 class="text-xl font-bold">Register</h2>
			</template>
			<u-form class="flex flex-col gap-4 h-full" :state="form" :validate="validate" @submit.prevent="register">
				<u-form-group label="Email" name="email">
					<u-input v-model="form.email" />
				</u-form-group>
				<u-form-group label="Password" name="password">
					<u-input v-model="form.password" />
				</u-form-group>
				<u-button block size="xl" type="submit">Sign up</u-button>
				<p class="text-sm">Already registered? <nuxt-link class="text-primary" to="/auth/login">Login</nuxt-link></p>
			</u-form>
		</u-card>
	</div>
</template>
<script setup lang="ts">
	import { useVuelidate } from '@vuelidate/core'
	import { email, required } from '@vuelidate/validators'
	const form = reactive({
		email: '',
		password: '',
	})

	function register() {
		console.log('register')
	}

	const rules = {
		email: { required, email },
		password: { required },
	}
	const $v = useVuelidate(rules, form)

	async function validate() {
		$v.value.$touch()
		await $v.value.$validate()
		const errors = $v.value.$errors.map((error) => ({
			message: error.$message,
			path: error.$propertyPath,
		}))

		return errors
	}
</script>
