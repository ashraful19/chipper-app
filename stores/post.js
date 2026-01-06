export const usePostStore = defineStore('post', () => {
    const { $api } = useNuxtApp()

    const posts = ref([])

    async function getPosts() {
        const { data } = await $api.get('posts')
        posts.value = data
    }

    async function createPost(post) {
        const { data } = await $api.post('posts', post)
        posts.value.unshift(data)
    }

    return {
        posts,
        getPosts,
        createPost
    }
})