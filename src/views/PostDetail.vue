<template>
  <div v-if="card">
    <InstagramCard :info="card" :showcomments="true"/>
  </div>
</template>

<script>
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
	props: ['id'],
	data() {
		return {
			card: null
		}
	},
	mounted() {
		console.log(this.id);
		/*fetch(`http://localhost:3000/posts`)
			.then(response => {
				return response.json();
			})
			.then(data => {
					console.log("Podaci s backenda", data)
					let post = data.filter(post => post.id == this.id);
					console.log(post)
					this.card = {
						id: post.id,
						url: post.source,
						email: post.createdBy,
						title: post.title,
						posted_at: Number(post.postedAt)
					}
				});*/
		db.collection("posts")
			.doc(this.id).get().then(doc => {
			this.card = doc.data();
			this.card.id = doc.id;
			})
	},
	name: "post-detail",
	components: {
		InstagramCard
	},
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>