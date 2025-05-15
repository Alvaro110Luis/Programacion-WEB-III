<template>
    <el-table :data="medicamentos" height="550" style="width: 100%">
        <el-table-column prop="id_medicamento" label="id_medicamento" />
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="precio" label="Precio" />
        <el-table-column prop="stock" label="Stock" />
        <el-table-column label="Acciones">
            <template #default="scoped">
                <el-button type="primary" :icon="Edit" @click="MostrarInput(scoped.row)" />
                <el-button type="danger" :icon="Delete" @click="EliminarMed(scoped.row.id_medicamento)" />
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Editar medicamento" width="500">
        <el-form :model="form">
            <el-form-item label="Nombre" :label-width="formLabelWidth">
                <el-input v-model="form.nombre" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Precio" :label-width="formLabelWidth">
                <el-input v-model="form.precio" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Stock" :label-width="formLabelWidth">
                <el-input v-model="form.stock" autocomplete="off" />
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancelar</el-button>
                <el-button type="primary" @click="ActualizarMedicamento()">
                    Confirmar
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { ActualizarMedicamentos, EliminarMedicamento, getMedicamentos } from '../apis/api.js'
import {
    Delete,
    Edit,
} from '@element-plus/icons-vue'

const medicamentos = ref([])
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    id_medicamento: '',
    nombre: '',
    precio: '',
    stock: '',
})

const TablaMedicamento = async () => {
    try {
        const resultado = await getMedicamentos()
        medicamentos.value = resultado
    } catch (error) {
        console.error(error)
    }
}

const MostrarInput = async (medicamento) => {
    try {
        form.id_medicamento = medicamento.id_medicamento
        form.nombre = medicamento.nombre
        form.precio = medicamento.precio
        form.stock = medicamento.stock
        dialogFormVisible.value = true
    } catch (error) {
        console.error(error)
    }
}
const ActualizarMedicamento = async () => {
    try {
        await ActualizarMedicamentos(form)
        dialogFormVisible.value = false
        TablaMedicamento()
    } catch (error) {
        console.error(error)
    }
}

const EliminarMed = async (id) => {
    try {
        await EliminarMedicamento(id)
        dialogFormVisible.value = false
        TablaMedicamento()
    } catch (error) {
        console.error(error)
    }
}

onMounted(TablaMedicamento)
defineExpose({ TablaMedicamento })
</script>
