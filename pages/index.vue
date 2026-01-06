<script setup>
definePageMeta({
  middleware: ['validate-session']
})

const user = useUser()
const postStore = usePostStore()
const favoriteStore = useFavoriteStore()

let pollPostsInterval = null

onMounted(async () => {
  await postStore.getPosts()
  favoriteStore.getFavorites()

  pollPostsInterval = setInterval(() => {
    postStore.getPollPosts()
  }, 30000)
})

onUnmounted(() => {
  if (pollPostsInterval) {
    clearInterval(pollPostsInterval)
    pollPostsInterval = null
  }
})
</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <div class="flex justify-end">
    <button v-if="postStore.hasNewPosts"
      class="bg-gray-600 text-white px-8 py-2 rounded-lg"
      @click="postStore.loadNewPosts()">
      Load New Posts
    </button>
  </div>
  <div class="grid gap-16">
    <PostItem
      v-for="post in postStore.posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
