<script setup lang="ts">

</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Track List</h2>

    <ul class="mt-4">
      <li v-for="track in tracks" :key="track.id">
        <TrackCard
          :track="track"
          :is-edit="false"
          :on-save="editTrack"
          :on-delete="deleteTrack"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {ITrack} from '@/types';

export default {
 name: 'TrackList',
  props: {
    tracks: Array as () => ITrack[],
    deleteTrack: Function,
    editTrack: Function
  },
};

</script>
