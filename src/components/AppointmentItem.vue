<template>
  <div class="appointment-item">
    <div class="appointment-info">
      <h3>{{ appointment.name }}</h3>
      <p>{{ appointment.email }}</p>
      <p>{{ appointment.address }}</p>
    </div>
    <div class="appointment-status" :class="statusClass">
      {{ appointment.status }}
    </div>
    <div class="appointment-time">
      {{ formatDate(appointment.date) }}
    </div>
    <div class="appointment-actions">
      <button @click="updateStatus('Completed')" v-if="appointment.status === 'Upcoming'">Complete</button>
      <button @click="updateStatus('Cancelled')" v-if="appointment.status === 'Upcoming'">Cancel</button>
      <button @click="$emit('delete')">Delete</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppointmentItem',
  props: {
    appointment: {
      type: Object,
      required: true
    }
  },
  emits: ['update', 'delete'],
  setup(props) {
    const statusClass = computed(() => {
      return {
        'status-upcoming': props.appointment.status === 'Upcoming',
        'status-completed': props.appointment.status === 'Completed',
        'status-cancelled': props.appointment.status === 'Cancelled'
      }
    })

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleString()
    }

    const updateStatus = (newStatus) => {
      emit('update', { status: newStatus })
    }

    return {
      statusClass,
      formatDate,
      updateStatus
    }
  }
})
</script>

<style scoped>
.appointment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.appointment-status {
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

.status-upcoming {
  background-color: #ffd700;
}

.status-completed {
  background-color: #90ee90;
}

.status-cancelled {
  background-color: #ff6347;
}
</style>