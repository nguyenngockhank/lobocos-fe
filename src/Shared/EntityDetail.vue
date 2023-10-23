<script setup lang="ts">
import type { PatchOrderInput } from '@/Orders/orderApi';
import EntityFieldDisplay from './Entity/EntityFieldDisplay.vue'
import EntityFieldEditor from './Entity/EntityFieldEditor.vue'
import { EditOutlined } from '@ant-design/icons-vue';
import { computed, reactive, watch } from 'vue'
import type { AsyncExecute } from '@/Orders/types';

const emit = defineEmits<{
  (e: 'editAttr', payload: PatchOrderInput): void
}>()

const { entity, typeMap, ignoreAttrs, edittableAttrs, transformFieldValFn, editMutation } = defineProps<{
    title?: String;
    entity: Record<string, any>;
    ignoreAttrs?: Array<string>;
    edittableAttrs?: Array<string>;
    labelMap: Record<string, string>;
    typeMap: Record<string, string>;
    editMutation?: AsyncExecute<PatchOrderInput, void>;
    transformFieldValFn?: (field: string, entity: Record<string, any>) => any;
}>()

const entityState = reactive<{editingFields: string[], editingFieldModal: string; openEditModal: boolean; edittingModalValue: string}>({ 
    editingFields: [],
    // modal
    openEditModal: false,
    editingFieldModal: '',
    edittingModalValue: '',
})

const renderFields = computed(() => {
    const blacklistAttrs: string[] = ignoreAttrs || []
    blacklistAttrs.push(...['created_by', 'updated_by', 'updated_at'])

    const result: string[] = [];
    for(const field in entity) {
        if (!blacklistAttrs.includes(field)) {
            result.push(field);
        }
    }
    return result;
})

function handleClickEdit(field: string) {
    console.log({ field })
    if (typeMap[field] === "html") {
        entityState.openEditModal = true
        entityState.edittingModalValue = entity[field]
        entityState.editingFieldModal = field
    } else {
        entityState.editingFields.push(field)
    }
}

function isEdittableField(field: string): boolean {
    if (!edittableAttrs) return false;
    return edittableAttrs.includes(field);
}

function isEdittingField(field: string) : boolean {
    return entityState.editingFields.includes(field)
}

function getFieldValue(field: string) {
    if (transformFieldValFn) {
        return transformFieldValFn(field, entity)
    }
    return entity[field];
}


async function handleEditAttr(field: any, value: any) {
    emit('editAttr', { field, value })
    if (editMutation) {
        await editMutation({ field, value })
    }

    console.log(entityState.editingFields)
    entityState.editingFields = entityState.editingFields.filter(f => f !== field)

    console.log(entityState.editingFields)
}


async function handleOkModal() {
    await handleEditAttr(
        entityState.editingFieldModal, 
        entityState.edittingModalValue
    );
    entityState.openEditModal = false
}

</script>

<template>
<a-descriptions
    :title="title"
    :column="{ xs: 1, sm: 1, lg: 2, xl: 3 }"
    bordered
>   
    <a-descriptions-item v-for="(field) in renderFields" 
        :key="field" 
        :label="labelMap[field] || field"
    >   
        <span class="field-edit" v-if="isEdittingField(field)">
            <EntityFieldEditor 
                :value="entity[field]" 
                :type="typeMap[field]" 
                @save="(v: any) => handleEditAttr(field, v)"
            />
        </span>
        <a-space class="field-display" v-show="!isEdittingField(field)">
            <a-space>
                <EntityFieldDisplay :type="typeMap[field]" :value="getFieldValue(field)" />
            </a-space>
            <a-space v-if="isEdittableField(field)">
                <EditOutlined :style="{ color: 'hotpink' }" @click="() => handleClickEdit(field)"  two-tone-color="#eb2f96" />
            </a-space>
        </a-space>
    </a-descriptions-item>
</a-descriptions>

<a-modal v-model:open="entityState.openEditModal" 
    :title="`Sửa ${labelMap[entityState.editingFieldModal] || entityState.editingFieldModal}`" 
    @ok="handleOkModal"
>
    <EntityFieldEditor 
        :value="entity[entityState.editingFieldModal]"
        :type="typeMap[entityState.editingFieldModal]"
        @input="(e: string) => entityState.edittingModalValue = e"
    />
</a-modal>
</template>