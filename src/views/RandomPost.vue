<template>
	<div v-if="card">
		<div class="card text-center">
			<div class="card-header text-left">
				{{ this.card.title }} by <strong>{{ this.card.createdBy }}</strong>
			</div>
			<div class="card-body">
				<img class="card-img-top" :src="card.source" alt="Maznusmo s unsplasha i bilo bi lijepo da napisemo cija je slika">
			</div>
			<div class="card-footer text-left">
				Posted {{ formatTime(this.card.postedAt) }}
			</div>
      </div>
	</div>
</template>

<script>
import InstagramCard from '@/components/InstagramCard.vue';
import store from '@/store.js';
import { Service, Posts } from '@/services';
import moment from 'moment'

export default {
	props: ['id'],
	data() {
		return {
			card: null
		};
	},
	async mounted() {
		let post = await Service.get("/random-post");
		this.card = post.data[0];
		console.log(this.card);
	},
	methods: {
		formatTime(t) {
      	return moment(this.card.postedAt).fromNow();
		}
   },
	name: 'random-post'
};
</script>

<style scoped>
button {
    margin-bottom: 20px;
}
</style>
