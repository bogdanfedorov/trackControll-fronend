<template>
  <div class="p-8">
    <h1 class="text-3xl font-semibold mb-4">Track Management</h1>
    <button @click="createNewTrack"
            class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block hover:bg-blue-600">
      Create New Track
    </button>
    <div v-if="creatingNewTrack">
      <TrackCard :track="newTrack" :isEdit="true" :on-save="saveNewTrack" @cancel-edit="cancelCreating"/>
    </div>
    <div class="flex">
      <div class="w-1/2 pl-4">
        <TrackList :tracks="tracks" :delete-track="deleteTrack" :edit-track="editTrack"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TrackList from '@/components/TrackList.vue'
import {createTrack, deleteTrack, fetchTracks, updateTrack} from '@/api'
import {TrackBase} from "~/types/emptyObj";
import {ITrack, ITrackBase} from "~/types";

export default {
  comments: {
    TrackList
  },
  data() {
    return {
      tracks: [],
      creatingNewTrack: false,
      newTrack: new TrackBase()
    }
  },
  async mounted() {
    await this.fetchTrackData()
  },
  methods: {
    async fetchTrackData() {
      try {
        const response = await fetchTracks()
        this.tracks = response.data.data
      } catch (error) {
        console.error('Error fetchTrackData:', error)
      }
    },
    createNewTrack() {
      this.creatingNewTrack = true
    },
    async saveNewTrack(newTrack: ITrackBase): Promise<void> {
      try {
        await createTrack(newTrack)
      } catch (error) {
        console.error('Error saveNewTrack/createTrack:', error)
      }

      try {
        await this.fetchTrackData()
      } catch (error) {
        console.error('Error saveNewTrack/fetchTrackData:', error)
      }

      this.creatingNewTrack = false
      this.newTrack = new TrackBase()
    },
    async editTrack(track: ITrack, trackId: number ) {
      try {
        await updateTrack(trackId, track)
        await this.fetchTrackData()
      } catch (error) {
        console.error('Error editTrack/updateTrack:', error)
      }
    },
    async deleteTrack(trackId: number) {
      try {
        await deleteTrack(trackId)
      } catch (error) {
        console.error('Error deleteTrack/deleteTrack:', error)
      }

      try {
        await this.fetchTrackData()
      } catch (error) {
        console.error('Error deleteTrack/fetchTrackData:', error)
      }
    },
    cancelCreating() {
      this.creatingNewTrack = false
      this.newTrack = new TrackBase()
    }
  }
}
</script>
