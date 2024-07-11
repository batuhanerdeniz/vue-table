<template>
  <div class="appointment-item">
    <div class="appointment-info">
      <h3>{{ appointment.name + ' ' + appointment.surname}}</h3>
      <p>{{ appointment.email }}</p>
      <p>{{ appointment.phone }}</p>
    </div>
    <div class="appointment-status">
      {{ appointment.address }}
    </div>
    <div class="appointment-time">
      <span class="status">{{ statusClass }}</span>
      <span>{{ formatDate(appointment.date) }}</span>
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
    // Use a computed property for statusClass to make it reactive
    const statusClass = computed(() => {
      return props.appointment.date < new Date() ? "Completed" : "Upcoming";
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    const updateStatus = (newStatus) => {
      emit('update', { status: newStatus });
    };

    return {
      statusClass, // Now a computed property
      formatDate,
      updateStatus
    };
  }
})
</script>

<style scoped>
.appointment-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
}

.appointment-item:nth-child(even) {
  background-color: #fff;
}
.appointment-item:nth-child(odd) {
  background-color: #f1f1f1; 
}

.status {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
  color:#f68b00;
  font-weight: bold;
  text-align: center;
}

.appointment-time {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: #EC1E80;
  height: 40px;
  color: white;
  border-radius: 10px;
  padding: 0px 10px;
  text-align: right;
}

.appointment-actions button {
  background-color: #ff6347;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.status-upcoming {
  background-color: #ffd700;
}

.status-completed {
  background-color: #70ee90;
}

.status-cancelled {
  background-color: #ff6347;
}
</style>