<template>
  <v-app-bar
    app
    class="position-fixed"
    color="primary"
    dark
    density="compact"
  >
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          class="shrink ml-2 mr-2 cursor-pointer"
          contain
          height="34"
          router-link
          :src="logo"
          width="150"
        />
      </router-link>
      <router-link style="text-decoration: none;" to="/">
        <div
          class="hidden-sm-and-down pl-2 ml-2 cursor-pointer"
          style="border-left: 1px solid #FFF; font-size: 120%; color: #FFF;"
        >
          Перевірка даних на програму "Зимової підтримки"
        </div>
      </router-link>
    </div>
    <template #append>
      <v-btn
        text="Інформація"
      />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
const logo = computed(() => {
  return `/logo-white.svg`
})
</script>
