<template>
  <div class="login">
    <h2>로그인</h2>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="이메일" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>

    <div class="social-login">
      <p>또는 소셜 계정으로 로그인</p>
      <button @click="goGoogleLogin">구글 로그인</button>
      <button @click="goNaverLogin">네이버 로그인</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const submit = async () => {
  try {
    await authStore.login(email.value, password.value);

    // ✅ 로그인 성공 → slug 기반 대시보드 이동
    const slug = authStore.companySlug;
    router.push(`/${slug}/dashboard`);
  } catch (err) {
    console.error("로그인 실패:", err);
    alert("로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.");
  }
};

// ✅ OAuth2 로그인
const goGoogleLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

const goNaverLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/naver";
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
button {
  padding: 0.75rem;
  background: #4cafef;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #2196f3;
}
.social-login {
  margin-top: 2rem;
  text-align: center;
}
.social-login button {
  margin: 0.5rem;
  padding: 0.75rem 1.5rem;
}
</style>
