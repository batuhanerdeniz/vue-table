<template>
  <div class="appointment-list">
    <AppointmentItem
      v-for="appointment in appointments"
      :key="appointment.id"
      :appointment="appointment"
      @update="$emit('update-appointment', appointment.id, $event)"
      @delete="$emit('delete-appointment', appointment.id)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
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
  emits: ['update-appointment', 'delete-appointment']
})
</script>

<style scoped>
.appointment-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>