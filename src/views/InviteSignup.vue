<template>
  <div class="invite-choice">
    <h2>회원가입 방법 선택</h2>

    <!-- ✅ 오류 메시지 표시 -->
    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <p>초대받은 이메일: <strong>{{ inviteInfo?.email }}</strong></p>
    <p>회사: <strong>{{ inviteInfo?.companyName }}</strong></p>
    <p>역할: <strong>{{ inviteInfo?.role }}</strong></p>

    <button @click="goTo('direct')">직접 정보 입력하기</button>
    <button @click="goTo('google')">구글로 가입하기</button>
    <button @click="goTo('naver')">네이버로 가입하기</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();

// 🔹 쿼리 파라미터에서 errorMessage 읽기
const errorMessage = ref(route.query.errorMessage || null);

// ✅ 초대 정보
const inviteInfo = ref({
  email: route.query.email || null, // 필요하다면 백엔드에서 받아올 수도 있음
  companyName: route.query.companyName || null,
  role: route.query.role || null,
});

const goTo = (type) => {
  if (type === "direct") {
    router.push(`/signup/invite?token=${route.query.token}`);
  } else if (type === "google") {
    window.location.href = `/oauth2/authorization/google?inviteToken=${route.query.token}`;
  } else if (type === "naver") {
    window.location.href = `/oauth2/authorization/naver?inviteToken=${route.query.token}`;
  }
};
</script>

<style scoped>
.error-msg {
  color: red;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>