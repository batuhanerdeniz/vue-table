```vue
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
    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button @click="currentPage--" :disabled="currentPage <= 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage >= totalPages">Next</button>
    </div>
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

    const totalPages = computed(() => {
      return Math.ceil(props.appointments.length / pageSize.value);
    });

    const paginatedAppointments = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return props.appointments.slice(start, end);
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
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>