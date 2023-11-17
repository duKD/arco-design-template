<template>
  <div class="flex h-100vh w-full max-w-full">
    <div class="relative flex flex-1 items-center justify-center pb-40px">
      <LoginForm />
      <div class="absolute right-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from "@/components/footer/index.vue";
import LoginForm from "./components/login-form.vue";
</script>
