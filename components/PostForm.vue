<script setup>
const postStore = usePostStore()
const { showErrorModal } = useHelpers()
const form = reactive({
  title: '',
  body: '',
  image: null
})
const errors = ref({})
const loading = ref(false)
const fileInputRef = ref(null)

async function submit () {
  if (loading.value) return

  errors.value = null
  loading.value = true

  try {
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('body', form.body)
    if (form.image) {
      formData.append('image', form.image)
    }
    
    await postStore.createPost(formData)

    resetForm()
  } catch (e) {
    showErrorModal(e)
  }

  loading.value = false
}

function resetForm () {
  form.title = ''
  form.body = ''
  form.image = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
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
    <input 
      ref="fileInputRef"
      type="file" 
      accept="image/*" 
      @change="form.image = $event.target.files[0]"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">
    <button
      :disabled="loading"
      class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      {{ loading ? 'Posting...' : 'Post' }}
    </button>
  </form>
</template>