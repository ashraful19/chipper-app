export const useFavoriteStore = defineStore('favorite', () => {
    const { $api } = useNuxtApp()

    const favoriteUserIds = ref([])

    async function getFavorites() {
        const { data } = await $api.get('favorites')
        favoriteUserIds.value = (data.users || []).map(user => user.id)
    }

    async function favoriteUser(userId) {
        await $api.post(`users/${userId}/favorite`)
        favoriteUserIds.value.push(userId)
    }

    async function unfavoriteUser(userId) {
        await $api.delete(`users/${userId}/favorite`)
        favoriteUserIds.value = favoriteUserIds.value.filter(id => id !== userId)
    }

    function isFavoriteUser(userId) {
        return favoriteUserIds.value.includes(userId)
    }

    return {
        favoriteUserIds,
        getFavorites,
        favoriteUser,
        unfavoriteUser,
        isFavoriteUser
    }
})