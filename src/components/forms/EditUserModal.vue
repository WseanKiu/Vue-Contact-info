<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <form @submit.prevent="saveUser">
        <h2>Edit User</h2>
        <label>
          Name:
          <input v-model="userData.name" required />
        </label>
        <label>
          Contact Number:
          <input v-model="userData.phone" required />
        </label>
        <label>
          Email:
          <input v-model="userData.email" type="email" required />
        </label>
        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { User } from '@/types/User'

interface Props {
  user: User | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'save'])

const userData = ref({ ...props.user })

// Watch for changes in the `user` prop to update `userData`
watch(
  () => props.user,
  (newUser) => {
    userData.value = { ...newUser } // Clone the user to avoid mutating the prop directly
  },
  { immediate: true },
)

// Emit the `save` event with updated user data when the form is submitted
function saveUser() {
  emit('save', userData.value)
}
</script>

<style scoped>
/* Basic styling for the modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
