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
import { useRouter } from "vue-router";  // ✅ 추가

const authStore = useAuthStore();
const router = useRouter();              // ✅ 추가

const email = ref("");
const password = ref("");

const submit = async () => {
  console.log("🚀 submit 실행됨", email.value, password.value);
  try {
    await authStore.login(email.value, password.value);
    alert("로그인 성공!");
    router.push("/dashboard");
  } catch (err) {
    console.error("로그인 실패:", err);
  }
};
</script>
