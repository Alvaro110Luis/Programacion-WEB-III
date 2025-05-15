<template>
    <el-button plain @click="dialogFormVisible = true">
        Crear Medicamento
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="Agregar medicamento" width="500">
        <el-form :model="form" @submit.prevent="EnviarMedicamento()">
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
                <el-button type="primary" native-type="submit">
                    Confirmar
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { AgregarMedicamento } from '../apis/api.js'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const emit = defineEmits(['medicamento-agregado'])

const form = reactive({
    nombre: '',
    precio: '',
    stock: '',
})

const EnviarMedicamento = async () => {
    try {
        const data = {
            ...form,
            precio: parseFloat(form.precio),
            stock: parseInt(form.stock),
        }
        await AgregarMedicamento(data)
        dialogFormVisible.value = false
        emit('medicamento-agregado')
    } catch (error) {
        console.error(error)
    }
}
</script>