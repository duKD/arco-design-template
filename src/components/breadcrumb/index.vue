<template>
  <a-breadcrumb class="container-breadcrumb pl-20px">
    <a-breadcrumb-item>
      <icon-drag-dot-vertical />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
      <div class="cursor-pointer" @click="onBreadcrumbClick(item, index)">
        {{ item.meta.locale }}
      </div>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup name="Breadcrumb">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store";
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const breadcrumbList = computed(() => {
  let breadcrumbData =
    authStore.allBreadcrumbList[route.matched[route.matched.length - 1].path] ??
    [];
  return breadcrumbData;
});

// Click Breadcrumb
const onBreadcrumbClick = (item: any, index: number) => {
  if (index !== breadcrumbList.value.length - 1) {
    if (!item.redirect || authStore.authMenuPathList.includes(item.redirect)) {
      router.push(item.path);
    }
  }
};
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 16px 0;
  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));
    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
