export const useFavoriteStore = defineStore('favorite', () => {
    const { $api } = useNuxtApp()

    const favoriteUserIds = ref([])
    const favoritePostIds = ref([])

    async function getFavorites() {
        const { data } = await $api.get('favorites')
        favoriteUserIds.value = (data.users || []).map(user => user.id)
        favoritePostIds.value = (data.posts || []).map(post => post.id)
    }

    async function favoriteUser(userId) {
        await $api.post(`users/${userId}/favorite`)
        favoriteUserIds.value.push(userId)
    }

    async function unfavoriteUser(userId) {
        await $api.delete(`users/${userId}/favorite`)
        favoriteUserIds.value = favoriteUserIds.value.filter(id => id !== userId)
    }

    async function favoritePost(postId) {
        await $api.post(`posts/${postId}/favorite`)
        favoritePostIds.value.push(postId)
    }

    async function unfavoritePost(postId) {
        await $api.delete(`posts/${postId}/favorite`)
        favoritePostIds.value = favoritePostIds.value.filter(id => id !== postId)
    }

    function isFavoriteUser(userId) {
        return favoriteUserIds.value.includes(userId)
    }

    function isFavoritePost(postId) {
        return favoritePostIds.value.includes(postId)
    }

    return {
        favoriteUserIds,
        favoritePostIds,
        getFavorites,
        favoriteUser,
        unfavoriteUser,
        isFavoriteUser,
        favoritePost,
        unfavoritePost,
        isFavoritePost
    }
})