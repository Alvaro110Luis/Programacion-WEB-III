<script setup>
import AgregarModal from './components/AgregarModal.vue';
import ListadoMedicamento from './components/ListadoMedicamento.vue';
import { ref } from 'vue'

const medicamento = ref(null)
const actualizar = () => {
  medicamento.value?.TablaMedicamento()

}

</script>

<template>
  <AgregarModal @medicamento-agregado="actualizar"></AgregarModal>
  <ListadoMedicamento ref="medicamento" />
</template>

<style scoped></style>
