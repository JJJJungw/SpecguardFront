<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="이메일" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const submit = async () => {
  try {
    await authStore.login(email.value, password.value);
    const slug = authStore.companySlug;
    router.push(`/${slug}/dashboard`);
  } catch (err) {
    console.error("로그인 실패:", err);
  }
};
</script>
