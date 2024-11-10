import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch(apiCall: () => Promise<any>) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await apiCall()
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}
