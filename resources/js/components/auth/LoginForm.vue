<template>
  <div class="text-subtitle-1 text-medium-emphasis">Email</div>

  <v-text-field v-model="data.email" :error-messages="emailErrors" density="compact" placeholder="Email address"
    prepend-inner-icon="mdi-email-outline" variant="outlined" />

  <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
    Password
    <a class="text-caption text-decoration-none text-blue" @click="goTo('forgot-password')">
      Forgot password?</a>
  </div>

  <v-text-field v-model="data.password" :error-messages="passwordErrors"
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'" density="compact"
    placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
    @click:append-inner="visible = !visible" />

  <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
    Log In
  </v-btn>

  <div class="d-flex justify-center">
    <a class="text-blue text-decoration-none" @click="goTo('register')">
      Not Registered?<v-icon icon="mdi-chevron-right" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import type { TPageName } from '@/types/routesTypes'
import { useAuthStore } from '../../scripts/stores/auth'
import { useNotificationsStore } from '../../scripts/stores/notifications'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { router } from '../../scripts/setups/vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

const { showSnackbar } = useNotificationsStore()
const { loginGetUser } = useAuthStore()
const { user, passwordResetEmail, accessibility } = storeToRefs(useAuthStore())
const { preLogPath, redirectedPreLogPath } = storeToRefs(useRoutesMainStore())
const { routerPush, pushHome } = useRoutesMainStore()

const data = reactive({
  email: '',
  password: '',
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: {
      required,
      minLength: minLength(8),
      containsPasswordRequirement: helpers.withMessage(
        () => `The password requires a combination of letters & numbers`,
        (value) => /(?=.*[a-z])(?=.*[0-9])/.test(<string>value),
      ),
    },
  }
})

const v$ = useVuelidate(rules, data)

const emailErrors = computed(() => {
  return v$.value.email.$errors.map(x => x.$message) as string[]
})

const passwordErrors = computed(() => {
  return v$.value.password.$errors.map(x => x.$message) as string[]
})

const visible = ref(false)

async function login() {
  await v$.value.$validate()
  if (v$.value.$error || v$.value.$silentErrors.length > 0) {
    showSnackbar('Please correct the marked errors!', 'orange')
    console.log(
      `validation errors: ${JSON.stringify(v$.value.$errors, null, 2)} silent: ${JSON.stringify(v$.value.$silentErrors, null, 2)}`,
    )
    return
  }

  let res = await loginGetUser(data)
  if (res.success) {
    showSnackbar('You have successfully logged in')
    user.value = res.data
    console.log(`Successful login. preLogPath: ${preLogPath.value}\nredirectedPreLog: ${redirectedPreLogPath.value}`)

    if (
      [undefined, '/auth/register', '/auth/forgot-password'].includes(preLogPath.value!)
    ) {
      await routerPush('home') // '`Successful login. Redirected to home page`)
    } else {
      router.push(preLogPath.value!)
      console.log(`****** Resetting preLogPath`)
      preLogPath.value = undefined
    }
  } else {
    if (res.status === 422) {
      showSnackbar(res.message)
    } else {
      await pushHome(`Error! ${res.message}. Redirected to home page`)
    }
  }
}

async function goTo(routeName: TPageName) {
  // console.log(`accessibility: ${JSON.stringify(accessibility.value, null, 2)}`)
  switch (routeName) {
    case 'register':
      if (accessibility.value.registrationAllowed === false) {
        showSnackbar('Registration of new users is not allowed at this time!')
        return
      }
      break

    case 'forgot-password':
      await v$.value.email.$validate()
      break

    default:
      return
  }
  passwordResetEmail.value = data.email
  await routerPush(routeName)
}
</script>
