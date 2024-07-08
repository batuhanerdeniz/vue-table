<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>Create New Appointment</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="form.address" required>
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="datetime-local" id="date" v-model="form.date" required>
        </div>
        <div class="form-actions">
          <button type="submit">Create</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'CreateAppointmentModal',
  emits: ['create-appointment', 'close'],
  setup(props, { emit }) {
    const form = reactive({
      name: '',
      email: '',
      address: '',
      date: '',
      status: 'Upcoming'
    })

    const submitForm = () => {
      emit('create-appointment', { ...form })
      emit('close')
    }

    return {
      form,
      submitForm
    }
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>