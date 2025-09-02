<template>
  <div>
    <h1>Specguard</h1>
    <button @click="goSignup">회원가입</button>
    <button @click="goLogin">로그인</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goSignup = () => router.push("/signup");
const goLogin = () => router.push("/login");
</script>
