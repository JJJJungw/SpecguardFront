<template>
  <div>
    <h1>{{ slug }} 대시보드</h1>
    <p>{{ user?.name }} 님 환영합니다 🎉</p>

    <button @click="showInviteForm = true">초대하기</button>

    <!-- ✅ 초대하기 폼 -->
    <InviteForm
        v-if="showInviteForm"
        @close="showInviteForm = false"
        @success="onInviteSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import InviteForm from "@/components/InviteForm.vue";  // ✅ 컴포넌트 import

const authStore = useAuthStore();
const { user, companySlug } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

if (companySlug.value && companySlug.value !== slug) {
  alert("접근 권한이 없는 회사입니다.");
  router.push("/");
}

const showInviteForm = ref(false);

const onInviteSuccess = () => {
  alert("✅ 초대 완료!");
  showInviteForm.value = false;
};
</script>
