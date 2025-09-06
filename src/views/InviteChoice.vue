<template>
  <div class="invite-choice">
    <h2>회원가입 방법 선택</h2>

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

// ✅ 환경 변수에서 API 주소 가져오기 (VITE_API_URL=.env에 설정해둠)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const route = useRoute();
const router = useRouter();
const token = route.query.token;
const inviteInfo = ref(null);

onMounted(async () => {
  try {
    // ✅ 초대 토큰 검증 API 호출
    const res = await api.get(`/auth/signup/invite/check?token=${token}`);
    console.log("🔍 checkInvite API 응답:", res.data);
    inviteInfo.value = res.data;
  } catch (err) {
    console.error("초대 검증 실패:", err);
    alert("초대 링크가 유효하지 않거나 만료되었습니다.");
    router.push("/login");
  }
});

const goForm = () => {
  router.push({ name: "InviteSignup", query: { token } });
};

const goGoogleLogin = () => {
  // ✅ Vue Router가 아닌 브라우저 네비게이션으로 백엔드 이동
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
</style>
