<template>
  <div>
    <p><strong>License Plate:</strong> {{ transport.licensePlate }}</p>
    <p><strong>Model:</strong> {{ transport.model }}</p>
    <p><strong>Purchase Date:</strong> {{ transport.purchaseDate }}</p>
    <p><strong>Mileage:</strong> {{ transport.mileage }}</p>
    <p><strong>Type:</strong> {{ transport.type }}</p>
    <p><strong>Status:</strong> {{ transport.status }}</p>
  </div>
</template>

<script lang="ts">
import {ITransportBase} from "~/types";

export default {
  name: 'TransportInfo',
  props: {
    transport: Object as () => ITransportBase,
  }
}
</script>
