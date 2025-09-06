<template>
  <div class="signup">
    <h2>회사 회원가입</h2>
    <form @submit.prevent="submit">
      <input v-model="companyName" placeholder="회사 이름" required />
      <input v-model="email" type="email" placeholder="관리자 이메일" required />
      <input v-model="name" placeholder="관리자 이름" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/auth";

const companyName = ref("");
const email = ref("");
const name = ref("");
const password = ref("");
const router = useRouter();

const submit = async () => {
  try {
    const payload = {
      companyName: companyName.value,
      email: email.value,
      name: name.value,
      password: password.value,
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
