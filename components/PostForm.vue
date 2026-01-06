<script setup>
const postStore = usePostStore()
const { showErrorModal } = useHelpers()
const form = reactive({
  title: '',
  body: ''
})
const errors = ref({})
const loading = ref(false)

async function submit () {
  if (loading.value) return

  errors.value = null
  loading.value = true

  try {
    await postStore.createPost(toRaw(form))

    resetForm()
  } catch (e) {
    showErrorModal(e)
  }

  loading.value = false
}

function resetForm () {
  form.title = ''
  form.body = ''
}
</script>

<template>
  <form
    class="grid gap-4 mb-16"
    @submit.prevent="submit">
    <input
      v-model="form.title"
      placeholder="Post title"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">
    <textarea
      v-model="form.body"
      placeholder="What is happening?!"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"></textarea>
    <button
      :disabled="loading"
      class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      {{ loading ? 'Posting...' : 'Post' }}
    </button>
  </form>
</template>