<template>
  <div class="border p-4 rounded-lg shadow-md">
    <div v-if="editMode">
      <p>
        <strong>License Plate:</strong>
        <input v-model="editedTransport.licensePlate" class="mb-2 p-1 border rounded"/>
      </p>
      <p>
        <strong>Model:</strong>
        <input v-model="editedTransport.model" class="mb-2 p-1 border rounded"/></p>
      <p>
        <strong>Purchase Date:</strong>
        <input v-model="editedTransport.purchaseDate" class="mb-2 p-1 border rounded"/>
      </p>
      <p>
        <strong>Mileage:</strong>
        <input v-model="editedTransport.mileage" class="mb-2 p-1 border rounded"/>
      </p>
      <p>
        <strong>Type:</strong>
        <select v-model="editedTransport.type" id="type" class="border rounded p-1 mb-2">
          <option value="CARGO">CARGO</option>
          <option value="PASSENGER">PASSENGER</option>
        </select>
      </p>
      <p>
        <strong>Status:</strong>
        <select v-model="editedTransport.status" id="type" class="border rounded p-1 mb-2">
          <option value="FREE">FREE</option>
          <option value="OCCUPIED">OCCUPIED</option>
        </select>
      </p>

      <div class="flex mt-2">
        <button @click="saveChanges" class="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
        <button @click="cancelEdit" class="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
      </div>
    </div>
    <div v-else>
      <p><strong>License Plate:</strong> {{ transport.licensePlate }}</p>
      <p><strong>Model:</strong> {{ transport.model }}</p>
      <p><strong>Purchase Date:</strong> {{ transport.purchaseDate }}</p>
      <p><strong>Mileage:</strong> {{ transport.mileage }}</p>
      <p><strong>Type:</strong> {{ transport.type }}</p>
      <p><strong>Status:</strong> {{ transport.status }}</p>

      <div class="flex mt-2">
        <button @click="edit" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
        <button @click="deleteTransport" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {ITransportBase} from "~/types";

export default {
  props: {
    transport: Object as () => ITransportBase,
    isEdit: Boolean,
    onSave: Function,
    onDelete: Function,
  },
  data() {
    return {
      editMode: this.isEdit || false,
      editedTransport: {...this.transport} ,
    };
  },
  methods: {
    edit() {
      this.editMode = true;
    },
    async saveChanges() {
      try {
        if (this.transport.id) {
          await this.onSave(this.editedTransport, this.transport.id)
        } else {
          await this.onSave(this.editedTransport)
        }
      } catch (error) {
        console.error('Error saveChanges/onSave:', error);
      }

      this.editMode = false;
    },
    cancelEdit() {
      this.editMode = false;
      this.editedTransport = {...this.transport};
    },
    async deleteTransport() {
      try {
        await this.onDelete(this.transport.id)
      } catch (error) {
        console.error('Error deleteTransport/onDelete:', error);

      }

    },
  },
};
</script>
