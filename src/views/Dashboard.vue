<template>
  <div class="dashboard">
    <h1>{{ companyName }} 대시보드</h1>
    <p>안녕하세요, {{ user?.name }}님 👋</p>

    <!-- ✅ 초대하기 버튼 -->
    <button class="invite-btn" @click="inviteUser">직원 초대하기</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import { sendInvite } from "@/api/invite"; // ✅ 초대 API 연결

const authStore = useAuthStore();
const user = ref(authStore.user);
const companyName = ref("");

onMounted(async () => {
  // store에 유저정보 없을 경우 → 다시 불러오기
  if (!user.value && authStore.companySlug) {
    try {
      const res = await api.get(`/company/${authStore.companySlug}/users/me`, {
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
      });
      user.value = res.data;
      authStore.user = res.data;
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ 회사 이름 세팅 (user 안에 company 정보 들어있음)
      companyName.value = res.data.company?.name || "";
    } catch (err) {
      console.error("유저 정보 불러오기 실패", err);
    }
  } else if (user.value) {
    companyName.value = user.value.company?.name || "";
  }
});

// ✅ 직원 초대하기
const inviteUser = async () => {
  try {
    const email = prompt("초대할 직원 이메일을 입력하세요:");
    if (!email) return;

    const role = prompt("직원 역할을 입력하세요 (OWNER, MANAGER, VIEWER):", "VIEWER");

    const payload = { email, role };
    await sendInvite(authStore.companySlug, payload);

    alert("초대가 성공적으로 발송되었습니다!");
  } catch (err) {
    console.error("초대 실패:", err);
    alert("초대 중 오류가 발생했습니다.");
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.info {
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}
.invite-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #4cafef;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.invite-btn:hover {
  background: #2196f3;
}
</style>
