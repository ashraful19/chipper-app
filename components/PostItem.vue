<script setup>
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const favoriteStore = useFavoriteStore()
const { showErrorModal } = useHelpers()

const isFavoriteAuthor = computed(() => {
  return favoriteStore.isFavoriteUser(props.post?.user?.id)
})

const isFavoritePost = computed(() => {
  return favoriteStore.isFavoritePost(props.post?.id)
})

async function toggleFavoriteAuthor() {
  try {
    if (isFavoriteAuthor.value) {
      await favoriteStore.unfavoriteUser(props.post.user.id)
    } else {
      await favoriteStore.favoriteUser(props.post.user.id)
    }
  } catch (error) {
    showErrorModal(error)
  }
}

async function toggleFavoritePost() {
  try {
    if (isFavoritePost.value) {
      await favoriteStore.unfavoritePost(props.post.id)
    } else {
      await favoriteStore.favoritePost(props.post.id)
    }
  } catch (error) {
    showErrorModal(error)
  }
}
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>
      <button
        class="font-medium bg-blue-200 text-sm px-2 rounded-full"
        @click="toggleFavoriteAuthor">
        {{ isFavoriteAuthor ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button
      class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg"
      @click="toggleFavoritePost">
      <HeartIconOutline v-if="!isFavoritePost"
        class="h-6 stroke-current" />
      <HeartIconSolid v-else
        class="h-6 stroke-current" />
      <span class="font-bold">
        {{ isFavoritePost ? 'Remove from favorites' : 'Add to my favorites' }}
      </span>
    </button>
  </div>
</template>