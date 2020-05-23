<template>
  <q-page>

<div class="q-pa-md">
  <q-table
    title="Treats"
    :data="data"
    :columns="columns"
    row-key="name"
  />
</div>
<div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save!',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
        upload: {
          tip: 'Upload!',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
  </div>
<!--
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
-->
  </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'PageEditor',
    data () {
      return {
          editor: 'this is a test'
      }
    },
    methods: {
      saveWork () {
        this.$q.notify({
          message: 'Saved your text in the browser storage',
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle'
        })
      },
      uploadIt () {
        this.$q.notify({
          message: 'Error! Check your connection',
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle'
        })
      }
    }
  }
</script>
