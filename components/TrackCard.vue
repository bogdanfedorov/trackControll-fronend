<template>
  <div class="border p-4 rounded-lg shadow-md">
    <div>
      <strong>Start city:</strong>
      <div v-if="editMode">
        <input v-model="editedTrack.startCity" class="mb-2 p-1 border rounded"/>
      </div>
      <div v-else>
        {{ track.startCity }}
      </div>
    </div>
    <div>
      <strong>End city:</strong>
      <div v-if="editMode">
        <input v-model="editedTrack.endCity" class="mb-2 p-1 border rounded"/>
      </div>
      <div v-else>
        {{ track.endCity }}
      </div>
    </div>
    <div>
      <strong>Distance:</strong>
      <div v-if="editMode">
        <input v-model="editedTrack.distance" class="mb-2 p-1 border rounded"/>
      </div>
      <div v-else>
        {{ track.distance }}
      </div>
    </div>
    <div>
      <strong>Departure date:</strong>
      <div v-if="editMode">
        <input v-model="editedTrack.departureDate" class="mb-2 p-1 border rounded"/>
      </div>
      <div v-else>
        {{ track.departureDate }}
      </div>
    </div>
    <div>
      <strong>Completion date:</strong>
      <div v-if="editMode">
        <input v-model="editedTrack.completionDate" class="mb-2 p-1 border rounded"/>
      </div>
      <div v-else>
        {{ track.completionDate }}
      </div>
    </div>
    <div>
      <strong>Required transport type:</strong>
      <div v-if="editMode">
        <select v-model="editedTrack.requiredTransportType" id="transportType" class="border rounded p-1 mb-2"
                @change="reFetchTransportData">
          <option value="CARGO">CARGO</option>
          <option value="PASSENGER">PASSENGER</option>
        </select>
      </div>
      <div v-else>
        {{ track.requiredTransportType }}
      </div>
    </div>
    <div>
      <strong>Expected revenue:</strong>
      <div v-if="editMode">
        <input v-model="editedTrack.expectedRevenue" class="mb-2 p-1 border rounded"/>
      </div>
      <div v-else>
        {{ track.expectedRevenue }}
      </div>
    </div>
    <div>
      <strong>Status:</strong>
      <div v-if="editMode">
        <select v-model="editedTrack.status" id="status" class="border rounded p-1 mb-2">
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>
      <div v-else>
        {{ track.status }}
      </div>
    </div>
    <div>
      <strong>Cargo transport:</strong>
      <div v-if="editMode">
        <TransportSelector
            @transport-selected="handleTransportSelected"
            :transports="transports"
            :selected-transport="editedTrack.cargoTransport"/>
      </div>
      <TransportInfo :transport="editedTrack.cargoTransport"/>
    </div>

    <div v-if="editMode">
      <div class="flex mt-2">
        <div v-if="editedTrack.cargoTransportId">
          <button @click="saveChanges" class="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
          </div>
        <div v-else>
          <button @click="saveChanges" class="bg-green-500 text-white px-2 py-1 rounded mr-2 disabled">Save</button>
        </div>
        <button @click="cancelEdit" class="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
      </div>
    </div>
    <div v-else>
      <div class="flex mt-2">
        <button @click="edit" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
        <button @click="deleteTransport" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ITrackBase, ITransport} from "~/types";
import {fetchTransports} from "~/api";

export default {
  props: {
    track: Object as () => ITrackBase,
    isEdit: Boolean,
    onSave: Function,
    onDelete: Function,
  },
  data() {
    return {
      editMode: this.isEdit || false,
      editedTrack: {...this.track},
      transports: []
    };
  },
  async mounted() {
    await this.fetchTransportData()
  },
  methods: {
    async reFetchTransportData() {
      await this.fetchTransportData()
    },
    async fetchTransportData() {
      try {
        const response = await fetchTransports(this.editedTrack.requiredTransportType);
        this.transports = response.data.data;
      } catch (error) {
        console.error('Error fetchTransportData:', error);
      }
    },
    async edit() {
      await this.fetchTransportData()
      this.editMode = true;
    },
    handleTransportSelected(transport: ITransport) {
      this.editedTrack.cargoTransportId = transport.id
      this.editedTrack.cargoTransport = transport
    },
    async saveChanges() {
      try {
        if (this.track.id) {
          await this.onSave(this.editedTrack as ITrackBase, this.track.id)
        } else {
          await this.onSave(this.editedTrack)
        }
      } catch (error) {
        console.error('Error saveChanges/onSave:', error);
      }

      this.editMode = false;
    },
    cancelEdit() {
      this.editMode = false;
      this.editedTrack = {...this.track};
      this.$emit('cancel-edit');
    },
    async deleteTransport() {
      try {
        await this.onDelete(this.track.id)
      } catch (error) {
        console.error('Error deleteTransport/onDelete:', error);
      }
    },
  },
};
</script>
