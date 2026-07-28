<template>
  <v-main>
    <v-container>
      <router-view v-slot="{ Component, route: r }">
        <v-fade-transition>
          <div :key="r.fullPath">
            <component :is="Component" ref="routerView" />
          </div>
        </v-fade-transition>
      </router-view>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
</script>

