<template>
  <div class="signup">
    <h2>회사 회원가입</h2>
    <form @submit.prevent="submit">
      <!-- 회사 정보 -->
      <input v-model="company.name" placeholder="회사 이름" required />
      <input v-model="company.businessNumber" placeholder="사업자 번호" required />
      <input v-model="company.slug" placeholder="회사 슬러그" required />
      <input v-model="company.managerPosition" placeholder="담당자 직책" required />
      <input v-model="company.managerName" placeholder="담당자 이름" required />
      <input v-model="company.contactEmail" type="email" placeholder="회사 연락 이메일" required />
      <input v-model="company.contactMobile" placeholder="회사 연락 전화번호" required />

      <!-- 유저 정보 -->
      <input v-model="user.name" placeholder="관리자 이름" required />
      <input v-model="user.email" type="email" placeholder="관리자 이메일" required />
      <input v-model="user.password" type="password" placeholder="비밀번호" required />
      <input v-model="user.phone" placeholder="전화번호" required />

      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/auth";

const router = useRouter();

const company = reactive({
  name: "",
  businessNumber: "",
  slug: "",
  managerPosition: "",
  managerName: "",
  contactEmail: "",
  contactMobile: "",
});

const user = reactive({
  name: "",
  email: "",
  password: "",
  phone: "",
});

const submit = async () => {
  try {
    const payload = {
      company,
      user,
    };

    await signup(payload);
    alert("회원가입이 완료되었습니다! 로그인해주세요.");
    router.push("/login");
  } catch (err) {
    console.error("회원가입 실패:", err);
    alert("회원가입에 실패했습니다.");
  }
};
</script>

<style scoped>
.signup {
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
