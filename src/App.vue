<template>
  <div id="app">
    <header>
      <h1>Appointment Manager</h1>
      <div class="filters">
        <button v-for="status in statusOptions" :key="status" @click="filterByStatus(status)">
          {{ status }}
        </button>
      </div>
      <div class="date-range">
        <input type="date" v-model="startDate" @change="filterByDateRange">
        <input type="date" v-model="endDate" @change="filterByDateRange">
      </div>
      <div class="search">
        <input type="text" v-model="searchQuery" @input="searchAppointments" placeholder="Search...">
      </div>
      <button @click="showCreateModal = true">Create Appointment</button>
    </header>
    
    <main>
      <div>{{ appointmentsCount }} Appointments found.</div>
      <AppointmentList 
        :appointments="filteredAppointments" 
        @update-appointment="updateAppointment"
        @delete-appointment="deleteAppointment"
      />
    </main>

    <CreateAppointmentModal 
      v-if="showCreateModal" 
      @close="showCreateModal = false"
      @create-appointment="createAppointment"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import AppointmentList from './components/AppointmentList.vue'
import CreateAppointmentModal from './components/CreateAppointmentModal.vue'
import { fetchAppointments, createAppointment, updateAppointment, deleteAppointment } from './services/airtable'

export default {
  components: {
    AppointmentList,
    CreateAppointmentModal
  },
  setup() {
    const appointments = ref([])
    const showCreateModal = ref(false)
    const statusOptions = ref(['All', 'Upcoming', 'Completed', 'Cancelled'])
    const selectedStatus = ref('All')
    const startDate = ref('')
    const endDate = ref('')
    const searchQuery = ref('')

    const loadAppointments = async () => {
      try {
        appointments.value = await fetchAppointments()
      } catch (error) {
        console.error('Error fetching appointments:', error)
        // Handle error (e.g., show a notification to the user)
      }
    }

    onMounted(loadAppointments)

    const filteredAppointments = computed(() => {
      return appointments.value.filter(appointment => {
        const matchesStatus = selectedStatus.value === 'All' || appointment.status === selectedStatus.value
        const matchesDateRange = (!startDate.value || appointment.date >= startDate.value) &&
                                 (!endDate.value || appointment.date <= endDate.value)
        const matchesSearch = appointment.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                              appointment.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        return matchesStatus && matchesDateRange && matchesSearch
      })
    })

    const appointmentsCount = computed(() => filteredAppointments.value.length)

    const filterByStatus = (status) => {
      selectedStatus.value = status
    }

    const filterByDateRange = () => {
      // This function is called automatically when date inputs change
    }

    const searchAppointments = () => {
      // This function is called automatically when search input changes
    }

    const handleCreateAppointment = async (appointmentData) => {
      try {
        const newAppointment = await createAppointment(appointmentData)
        appointments.value.push(newAppointment)
        showCreateModal.value = false
      } catch (error) {
        console.error('Error creating appointment:', error)
        // Handle error
      }
    }

    const handleUpdateAppointment = async (id, updatedData) => {
      try {
        const updatedAppointment = await updateAppointment(id, updatedData)
        const index = appointments.value.findIndex(a => a.id === id)
        if (index !== -1) {
          appointments.value[index] = updatedAppointment
        }
      } catch (error) {
        console.error('Error updating appointment:', error)
        // Handle error
      }
    }

    const handleDeleteAppointment = async (id) => {
      try {
        await deleteAppointment(id)
        appointments.value = appointments.value.filter(a => a.id !== id)
      } catch (error) {
        console.error('Error deleting appointment:', error)
        // Handle error
      }
    }

    return {
      appointments,
      filteredAppointments,
      appointmentsCount,
      showCreateModal,
      statusOptions,
      selectedStatus,
      startDate,
      endDate,
      searchQuery,
      filterByStatus,
      filterByDateRange,
      searchAppointments,
      createAppointment: handleCreateAppointment,
      updateAppointment: handleUpdateAppointment,
      deleteAppointment: handleDeleteAppointment
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>