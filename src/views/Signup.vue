<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="submit">
      <h3>회사 정보</h3>
      <input v-model="form.company.name" placeholder="회사명" required />
      <input v-model="form.company.businessNumber" placeholder="사업자등록번호" required />
      <input v-model="form.company.slug" placeholder="회사 Slug" />
      <input v-model="form.company.managerName" placeholder="담당자 이름" required />
      <input v-model="form.company.managerPosition" placeholder="담당자 직책" />
      <input v-model="form.company.contactEmail" type="email" placeholder="담당자 이메일" />
      <input v-model="form.company.contactMobile" placeholder="담당자 전화번호" />

      <h3>사용자 정보</h3>
      <input v-model="form.user.email" type="email" placeholder="이메일" required />
      <input v-model="form.user.password" type="password" placeholder="비밀번호" required />
      <input v-model="form.user.name" placeholder="이름" required />
      <input v-model="form.user.phone" placeholder="전화번호" />

      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/auth";
const router = useRouter();

const form = reactive({
  company: {
    name: "",
    businessNumber: "",
    slug: "",
    managerName: "",
    managerPosition: "",
    contactEmail: "",
    contactMobile: "",
  },
  user: {
    email: "",
    password: "",
    name: "",
    phone: "",
  },
});

const submit = async () => {
  try {
    await signup(form); // ✅ 스토어 대신 API 직접 호출
    alert("회원가입 성공! 홈으로 이동합니다.");
    router.push("/");
  } catch (err) {
    alert("회원가입 실패: " + (err.response?.data?.message || err.message));
  }
};
</script>
