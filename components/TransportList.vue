<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Transport List</h2>

    <ul class="mt-4">
      <li v-for="transport in transports" :key="transport.id">
        <TransportCard
            :transport="transport"
            :is-edit="false"
            :on-save="editTransport"
            :on-delete="deleteTransport"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Transport} from '@/types';

export default {
  props: {
    transports: Array as () => Transport[],
    deleteTransport: Function,
    editTransport: Function
  },
};
</script>
