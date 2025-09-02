<template>
  <div>
    <h1>대시보드</h1>
    <p>{{ user?.name }} 님 환영합니다 🎉</p>

    <button @click="invite">초대하기</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = authStore.user;

const invite = () => {
  alert("초대하기 버튼 클릭됨! (여기서 초대 API 연동 예정)");
};
</script>
