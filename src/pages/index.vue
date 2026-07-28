<template>
<v-layout full-height>
  <v-row>
    <v-col cols="12">
      Hello
    </v-col>
    <v-col cols="12">
      <import-upload-box v-model="data" />
    </v-col>
    <v-col cols="12">
      {{ data }}
    </v-col>
  </v-row>
</v-layout>
</template>

<script lang="ts" setup>
const data = ref([])
</script>
