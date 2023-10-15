<template>
	<div class="h-[90vh] flex items-center justify-center">
		<u-card
			:ui="{
				base: 'max-w-sm w-full',
			}"
		>
			<template #header>
				<h2 class="text-xl font-bold">Login</h2>
			</template>
			<u-form class="flex flex-col gap-4 h-full" :state="form" :validate="validate" @submit.prevent="login">
				<u-form-group label="Email" name="email">
					<u-input v-model="form.email" />
				</u-form-group>
				<u-form-group label="Password" name="password">
					<u-input v-model="form.password" type="password"/>
				</u-form-group>
				<u-button block size="xl" type="submit">Sign in</u-button>
				<p class="text-sm">
					Not registered yet? <nuxt-link class="text-primary" to="/auth/register">Register</nuxt-link>
				</p>
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

	async function login() {
		try {
			const result = await $fetch('/api/auth/login', {
        method: 'post',
				body: {
					email: form.email,
					password: form.password,
				},
			})
			navigateTo('/dashboard')
		} catch (error) {
			console.log(error)
		}
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
