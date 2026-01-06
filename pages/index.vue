<script setup>
definePageMeta({
  middleware: ['validate-session']
})

const user = useUser()
const postStore = usePostStore()

await postStore.getPosts()
</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <div class="grid gap-16">
    <PostItem
      v-for="post in postStore.posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
