<template>
  <div class="invite-choice">
    <h1>초대받으셨습니다 🎉</h1>
    <p>아래 방법으로 회원가입을 진행해주세요.</p>

    <div class="actions">
      <router-link
          :to="{ name: 'InviteSignup', query: { token: token } }"
          class="btn"
      >
        일반 회원가입
      </router-link>

      <button class="btn btn-oauth" @click="redirectToOAuth">
        소셜 로그인 (Google)
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const token = route.query.token;

// ✅ 소셜 로그인 리디렉트
const redirectToOAuth = () => {
  window.location.href = `http://localhost:8080/oauth2/authorize/google?token=${token}`;
};
</script>

<style scoped>
.invite-choice {
  max-width: 600px;
  margin: 3rem auto;
  text-align: center;
}
.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: #4cafef;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.btn-oauth {
  background: #db4437;
}
</style>
