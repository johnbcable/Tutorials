
<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      right: true
    }
  }
}
</script>
