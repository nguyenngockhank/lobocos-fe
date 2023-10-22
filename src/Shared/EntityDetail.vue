<script setup lang="ts">
import EntityFieldDisplay from './Entity/EntityFieldDisplay.vue'
import EntityFieldEditor from './Entity/EntityFieldEditor.vue'
import { EditOutlined } from '@ant-design/icons-vue';
import { computed, reactive } from 'vue'
const emit = defineEmits(['editAttr'])


const { entity, typeMap, ignoreAttrs, edittableAttrs, transformFieldValFn } = defineProps<{
    title?: String;
    entity: Record<string, any>;
    ignoreAttrs?: Array<string>;
    edittableAttrs?: Array<string>;
    labelMap: Record<string, string>;
    typeMap: Record<string, string>;
    transformFieldValFn?: (field: string, entity: Record<string, any>) => any;
}>()


const entityState = reactive<{editingFields: string[], editingField: string; openEditModal: boolean; edittingValue: string}>({ 
    editingFields: [],
    editingField: '',
    openEditModal: false,
    edittingValue: '',
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
        entityState.edittingValue = entity[field]
        entityState.editingField = field

        console.log({ entityState })
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

function handleInputField(field: string, value: any) {
    console.log({ field, value });
    (window as any).avalue = value
}

function handleOkModal() {
    emit('editAttr', { field: entityState.editingField, value: entityState.edittingValue })
    // update ...
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
                @input="(v: any) => handleInputField(field, v)"
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
    :title="`Sửa ${labelMap[entityState.editingField] || entityState.editingField}`" 
    @ok="handleOkModal"
>
    <EntityFieldEditor 
        :value="entityState.edittingValue"
        @input="(e: string) => entityState.edittingValue = e"
        :type="typeMap[entityState.editingField]"
    />
</a-modal>
</template>