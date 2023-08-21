<template>
  <div>
    <select v-model="selectedTransport" id="transport" class="border rounded p-1 w-full" @change="addTransportToTrack">
      <option v-for="(transport, index) in transports" :key="index" :value="transport">
        {{ transport.model }} ({{ transport.licensePlate }})
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {ITransport} from "~/types";

export default {
  name: 'TransportSelector',
  props: {
    transports: Array as () => ITransport[],
    selectedTransport: Object as () => ITransport | null,
  },
  methods: {
    addTransportToTrack() {
      if (this.selectedTransport) {
        this.$emit('transport-selected', this.selectedTransport);
        this.selectedTransport = null;
      }
    },
  },
};
</script>
