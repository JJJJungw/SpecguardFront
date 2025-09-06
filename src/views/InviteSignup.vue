<template>
  <div class="invite-signup">
    <h1>초대 회원가입</h1>

    <!-- 로딩 -->
    <div v-if="loading">초대 정보를 확인 중...</div>

    <!-- 에러 -->
    <div v-else-if="error" style="color: red">{{ error }}</div>

    <!-- 정상 -->
    <div v-else>
      <p><b>이메일:</b> {{ inviteInfo.email }}</p>
      <p><b>회사:</b> {{ inviteInfo.companyName }}</p>
      <p><b>역할:</b> {{ inviteInfo.role }}</p>

      <!-- 로컬 회원가입 -->
      <form @submit.prevent="submitForm">
        <input v-model="form.name" placeholder="이름" required />
        <input v-model="form.password" type="password" placeholder="비밀번호" required />
        <input v-model="form.phone" placeholder="전화번호" />

        <button type="submit">회원가입 완료</button>
      </form>

      <hr />

      <!-- OAuth2 회원가입 -->
      <button @click="startGoogleLogin">Google로 시작하기</button>
      <button @click="startNaverLogin">Naver로 시작하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api/axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const token = route.query.token;

const loading = ref(true);
const error = ref(null);
const inviteInfo = ref({});
const form = ref({ name: "", password: "", phone: "" });

// ✅ 1. 초대 토큰 확인
onMounted(async () => {
  try {
    const res = await api.get(`/api/v1/auth/signup/invite/check?token=${token}`);
    inviteInfo.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || "초대 토큰이 유효하지 않습니다.";
  } finally {
    loading.value = false;
  }
});

// ✅ 2. 로컬 회원가입
const submitForm = async () => {
  try {
    await api.post("/api/v1/auth/signup/invite", { ...form.value, token });
    alert("회원가입 완료! 로그인 해주세요.");
    router.push("/login");
  } catch (err) {
    error.value = err.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
  }
};

// ✅ 3. OAuth2 회원가입 (구글/네이버)
const startGoogleLogin = () => {
  const redirectUrl = `http://localhost:8080/oauth2/authorization/google?inviteToken=${token}`;
  window.location.href = redirectUrl;
};

const startNaverLogin = () => {
  const redirectUrl = `http://localhost:8080/oauth2/authorization/naver?inviteToken=${token}`;
  window.location.href = redirectUrl;
};
</script>
