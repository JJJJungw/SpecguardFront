<!-- Oauth2RedirectView.vue -->
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import api from "@/api/axios";
import { jwtDecode } from "jwt-decode";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    // ✅ 최초 OAuth2 로그인 → Refresh 쿠키 기반으로 AccessToken 발급
    const res = await api.post("/auth/token"); // baseURL=/api/v1 이라 최종 /api/v1/auth/token
    const newAccessToken = res.headers["authorization"]?.replace("Bearer ", "");

    if (!newAccessToken) {
      throw new Error("AccessToken이 응답에 없음");
    }

    // ✅ store 갱신
    authStore.accessToken = newAccessToken;
    localStorage.setItem("accessToken", newAccessToken);

    const payload = jwtDecode(newAccessToken);
    authStore.companySlug = payload.companySlug;
    localStorage.setItem("companySlug", payload.companySlug);

    // ✅ 대시보드 이동
    router.push(`/${authStore.companySlug}/dashboard`);
  } catch (err) {
    console.error("OAuth2 토큰 재발급 실패", err);
    router.push("/login");
  }
});
</script>
