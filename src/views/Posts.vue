<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import { Service, Posts } from '@/services'
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
	data() {
		return {
			store,
			cards: [],
		}
	},
	watch: {
		"store.searchTerm": _.debounce(function(val) {
			this.fetchPosts(val);
			Posts.getAll(store.searchTerm);
			Posts.search(store.searchTerm, store.searchTerm);

			let terms = store.searchTerm.split(" ");
			console.log(terms);
			let promises = terms.map(e => Posts.search(e));
			console.log(promises);
			let results = Promise.all(promises);
			console.log("Paralell calls:", results);
			let result = results.reduce((final, e) => final.concat(e), []);
			console.log(result);
			let finalResult = result.forEach(post => finalResult[post.id] = post);
			console.log(finalResult);
			finalResult = Object.values(finalResult);
			console.log("Final results:", finalResult);
		}, 500)
		//"store.searchTerm": function(val) {this.fetchPosts(val)}
	},
	created() {
		this.fetchPosts()
	},
	name: "posts",
	methods: {
		async fetchPosts(term) {
			term = term || store.searchTerm
			this.cards = await Posts.getAll(term)
			// term = term || store.searchTerm
			/*fetch(`http://localhost:3000/posts?title=${term}`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log("Podaci s backenda", data)
				this.cards = data.map(doc => {
					return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
				})
			})*/
			/*Posts.getAll(term) // zamjena za "fetch"
				.then(response => {
					let data = response.data;
					console.log("Podaci s backenda", data)
					this.cards = data.map(doc => {
						return {id: doc.id, url: doc.source, email: doc.createdBy,
								title: doc.title, posted_at: Number(doc.postedAt)}
					})
				})*/
		},
		gotoDetails(card) {
			this.$router.push({path: `post/${card.id}`})
		},
		newImage() {
			this.$router.push({name: 'newpost'}).catch(err => console.log(err))
		}
	},
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