<template>
  <div class="appointment-list">
    <!-- Paginated Appointments -->
    <AppointmentItem
      v-for="appointment in paginatedAppointments"
      :key="appointment.id"
      :appointment="appointment"
      @update="$emit('update-appointment', appointment.id, $event)"
      @delete="$emit('delete-appointment', appointment.id)"
    />

  </div>
      <!-- Pagination Controls -->
      <div class="pagination-controls">
      <button @click="currentPage--" :disabled="currentPage <= 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import AppointmentItem from './AppointmentItem.vue'

export default defineComponent({
  name: 'AppointmentList',
  components: {
    AppointmentItem
  },
  props: {
    appointments: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentPage = ref(1);
    const pageSize = ref(10);

    // Computed property to sort appointments by date from latest to oldest
    const sortedAppointments = computed(() => {
      return [...props.appointments].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(sortedAppointments.value.length / pageSize.value);
    });

    const paginatedAppointments = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return sortedAppointments.value.slice(start, end);
    });

    return { currentPage, totalPages, paginatedAppointments };
  },
  emits: ['update-appointment', 'delete-appointment']
})
</script>

<style scoped>
.appointment-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  height: 75vh;
  overflow-y: auto;
  margin-top: 10px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-controls button {
  background-color: pink;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 10px;
}

.pagination-controls button:hover {
  background-color: lightpink;
}

.pagination-controls button:disabled {
  background-color: lightgray;
}


</style>