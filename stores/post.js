export const usePostStore = defineStore('post', () => {
    const { $api } = useNuxtApp()

    const posts = ref([])
    const pollPosts = ref([])

    async function getPosts() {
        const { data } = await $api.get('posts')
        posts.value = data || []
    }

    async function createPost(post) {
        const { data } = await $api.post('posts', post)
        posts.value.unshift(data)
    }

    async function getPollPosts() {
        try {
            const { data } = await $api.get('posts')
            pollPosts.value = data || []
        } catch (error) {
            pollPosts.value = []
        }
    }

    function loadNewPosts() {
        if (!hasNewPosts.value) {
            return
        }

        const currentPostIds = posts.value.map(post => post.id)
        const newPosts = pollPosts.value.filter(post => !currentPostIds.includes(post.id))
        
        if (newPosts.length > 0) {
            posts.value = [...newPosts, ...posts.value]
        }
        
        pollPosts.value = []
    }

    const hasNewPosts = computed(() => {
        if (!pollPosts.value.length) {
            return false
        }

        if (pollPosts.value.length > posts.value.length) {
            return true
        }

        const currentPostIds = posts.value.map(post => post.id)
        return pollPosts.value.some(post => !currentPostIds.includes(post.id))
    })


    return {
        posts,
        pollPosts,
        getPosts,
        createPost,
        getPollPosts,
        loadNewPosts,
        hasNewPosts
    }
})