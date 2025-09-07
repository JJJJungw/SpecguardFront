<template>
  <div class="invite-choice">
    <h2>회원가입 방법 선택</h2>

    <!-- ✅ 에러 메시지 표시 -->
    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <p>초대받은 이메일: <strong>{{ inviteInfo?.email }}</strong></p>
    <p>회사: <strong>{{ inviteInfo?.companyName }}</strong></p>
    <p>역할: <strong>{{ inviteInfo?.role }}</strong></p>

    <div class="choice-buttons">
      <!-- ✅ DB 회원가입 폼 이동 -->
      <button @click="goForm">직접 정보 입력하기</button>

      <!-- ✅ 소셜 로그인 -->
      <button @click="goGoogleLogin">구글로 가입하기</button>
      <button @click="goNaverLogin">네이버로 가입하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const route = useRoute();
const router = useRouter();
const token = route.query.token;

// ✅ 에러 메시지 상태
const errorMessage = ref(route.query.message || null);

// ✅ 초대 정보
const inviteInfo = ref(null);

onMounted(async () => {
  try {
    // ✅ 초대 토큰 검증 API 호출
    const res = await api.get(`/auth/signup/invite/check?token=${token}`);
    console.log("🔍 checkInvite API 응답:", res.data);
    inviteInfo.value = res.data;
  } catch (err) {
    console.error("초대 검증 실패:", err);
    // 에러 인터셉터가 이미 라우팅 처리하므로 여기서는 추가 동작 없음
  }
});

const goForm = () => {
  router.push({ name: "InviteSignup", query: { token } });
};

const goGoogleLogin = () => {
  window.location.href = `${API_URL}/oauth2/authorization/google?inviteToken=${token}`;
};

const goNaverLogin = () => {
  window.location.href = `${API_URL}/oauth2/authorization/naver?inviteToken=${token}`;
};
</script>

<style scoped>
.invite-choice {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
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
.error-msg {
  color: red;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
