<template>
  <div class="invite-signup">
    <h2>초대 회원가입</h2>
    <p v-if="inviteInfo">초대받은 이메일: <strong>{{ inviteInfo.email }}</strong></p>
    <p v-if="inviteInfo">역할: <strong>{{ inviteInfo.role }}</strong></p>
    <p v-if="inviteInfo">회사: <strong>{{ inviteInfo.companyName }}</strong></p>

    <form @submit.prevent="submit">
      <input v-model="name" placeholder="이름" required />
      <input v-model="phone" placeholder="전화번호" />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axios";

const route = useRoute();
const router = useRouter();
const token = route.query.token;

const name = ref("");
const phone = ref("");
const password = ref("");
const inviteInfo = ref(null);

// ✅ 초대 토큰 검증 (백엔드 /auth/signup/invite/check)
onMounted(async () => {
  try {
    const res = await api.get(`/auth/signup/invite/check?token=${token}`);
    console.log("🔍 checkInvite API 응답:", res.data);
    inviteInfo.value = res.data;
  } catch (err) {
    console.error("초대 검증 실패:", err);
    alert("초대 링크가 유효하지 않거나 만료되었습니다.");
    router.push("/login");
  }
});

// ✅ DB 회원가입 처리
const submit = async () => {
  try {
    const payload = {
      token,
      name: name.value,
      phone: phone.value,
      password: password.value,
    };
    await api.post("/auth/signup/invite", payload);

    alert("회원가입이 완료되었습니다! 로그인해주세요.");
    router.push("/login");
  } catch (err) {
    console.error("회원가입 실패:", err);
    alert("회원가입 중 오류가 발생했습니다.");
  }
};
</script>

<style scoped>
.invite-signup {
  max-width: 500px;
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
</style>
