<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="이메일" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>

    <!-- 에러 메시지 출력 -->
    <div v-if="errorMessage" style="color: red; margin-top: 10px;">
      {{ errorMessage }}
    </div>
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
const errorMessage = ref("");

const submit = async () => {
  errorMessage.value = "";
  try {
    await authStore.login(email.value, password.value);
    const slug = authStore.companySlug;
    router.push(`/${slug}/dashboard`);
  } catch (err) {
    // ✅ 백엔드 응답에서 message 추출
    errorMessage.value =
        err.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.";
  }
};
</script>
