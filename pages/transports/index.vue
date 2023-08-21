<template>
  <div class="p-8">
    <h1 class="text-3xl font-semibold mb-4">Transport Management</h1>
    <button @click="createNewTransport"
            class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block hover:bg-blue-600">
      Create New Transport
    </button>
    <div v-if="creatingNewTransport">
      <TransportCard :transport="newTransport" :isEdit="true" :on-save="saveNewTransport"/>
    </div>
    <div class="flex">
      <div class="w-1/2 pl-4">
        <TransportList :transports="transports" :delete-transport="deleteTransport" :edit-transport="editTransport"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TransportList from '@/components/TransportList.vue';
import {createTransport, deleteTransport, fetchTransports, updateTransport} from '@/api';
import {ITransportBase, Transport} from "~/types";
import {TransportBase} from "~/types/emptyObj"; // Ваш асинхронний запит

export default {
  components: {
    TransportList,
  },
  data() {
    return {
      transports: [],
      creatingNewTransport: false,
      newTransport: new TransportBase()
    };
  },
  async mounted() {
    await this.fetchTransportData()
  },
  methods: {
    async fetchTransportData() {
      try {
        const response = await fetchTransports();
        this.transports = response.data.data;
      } catch (error) {
        console.error('Error fetchTransportData:', error);
      }
    },
    createNewTransport() {
      this.creatingNewTransport = true;
    },
    async saveNewTransport(newTransport: ITransportBase): Promise<void> {
      try {
        await createTransport(newTransport);
      } catch (error) {
        console.error('Error saveNewTransport/createTransport:', error);
      }

      try {
        await this.fetchTransportData();
      } catch (error) {
        console.error('Error saveNewTransport/fetchTransportData:', error);
      }

      this.creatingNewTransport = false;
      this.newTransport = new TransportBase();
    },
    async editTransport(transport: Transport) {
      try {
        await updateTransport(transport.id, transport)
      } catch (error) {
        console.error('Error editTransport/updateTransport:', error);
      }

      try {
        await this.fetchTransportData();
      } catch (error) {
        console.error('Error editTransport/fetchTransportData:', error);
      }
    },
    async deleteTransport(transportId: number): Promise<void> {
      try {
        await deleteTransport(transportId);
      } catch (error) {
        console.error("Error deleteTransport/deleteTransport:", error);
      }

      try {
        await this.fetchTransportData();
      } catch (error) {
        console.error('Error deleteTransport/fetchTransportData:', error);
      }
    },
  }
};
</script>
