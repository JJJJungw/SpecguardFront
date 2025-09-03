<template>
  <div class="invite-form">
    <h3>직원 초대</h3>
    <input v-model="inviteEmail" placeholder="이메일 입력" />
    <select v-model="inviteRole">
      <option value="MANAGER">매니저</option>
      <option value="VIEWER">뷰어</option>
    </select>
    <button @click="send">초대하기!</button>
    <button @click="emit('close')">취소</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { sendInvite } from "@/api/invite";

const emit = defineEmits(["success", "close"]);

const authStore = useAuthStore();
const route = useRoute();
const slug = route.params.slug;

const inviteEmail = ref("");
const inviteRole = ref("MANAGER"); // ✅ 기본값을 MANAGER로

const send = async () => {
  try {
    const payload = { email: inviteEmail.value, role: inviteRole.value };
    const res = await sendInvite(slug, payload, authStore.accessToken);
    alert(`✅ 초대 메일 전송 완료: ${res.data.email}`);
    inviteEmail.value = "";

    emit("success"); // 부모 컴포넌트에 성공 이벤트 전달
  } catch (err) {
    console.error("초대 API 오류:", err);
    alert("❌ 초대 실패: " + (err.response?.data?.message || err.message));
  }
};
</script>

<style scoped>
.invite-form {
  padding: 1rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
}
</style>
