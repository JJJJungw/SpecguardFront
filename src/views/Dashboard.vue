<template>
  <div class="dashboard">
    <h1>{{ companyName }} 대시보드</h1>
    <p>안녕하세요, {{ user?.name }}님 👋</p>

    <!-- ✅ 초대하기 버튼 -->
    <button class="invite-btn" @click="inviteUser">직원 초대하기</button>

    <!-- ✅ 로그아웃 버튼 -->
    <button class="logout-btn" @click="logoutUser">로그아웃</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/axios";
import { sendInvite } from "@/api/invite";

const authStore = useAuthStore();
const user = ref(authStore.user);
const companyName = ref("");
const router = useRouter();

onMounted(async () => {
  if (!user.value && authStore.companySlug) {
    try {
      const res = await api.get(`/company/${authStore.companySlug}/users/me`, {
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
      });
      user.value = res.data;
      authStore.user = res.data;
      localStorage.setItem("user", JSON.stringify(res.data));

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

// ✅ 로그아웃
const logoutUser = async () => {
  try {
    await authStore.logout();
    alert("로그아웃 되었습니다.");
    router.push("/login");
  } catch (err) {
    console.error("로그아웃 실패:", err);
    alert("로그아웃 중 오류가 발생했습니다.");
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
.invite-btn,
.logout-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}
.invite-btn {
  background: #4cafef;
}
.invite-btn:hover {
  background: #2196f3;
}
.logout-btn {
  background: #f44336;
}
.logout-btn:hover {
  background: #d32f2f;
}
</style>
