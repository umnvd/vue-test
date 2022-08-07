<template>
  <div class="about">
    <h1>Test page</h1>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from '@/stores/testStore';
import { onBeforeMount, onBeforeUnmount } from 'vue';

const store = useTestStore();

onBeforeMount(store.load);
onBeforeUnmount(store.cancel);
</script>
