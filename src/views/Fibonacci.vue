<template>
	<div>
		<div class="center">
			<p class="title-label">Enter a number:</p>
			<input type="text" v-model="numberK">
		</div>
		<div class="cal-btn">
			<button @click="calculateFibonacci()" type="Novi post" class="btn btn-primary ml-2">Calculate</button>
		</div>
		<div class="center">
			<p class="title-label">Fibonacci result:</p>
			<input type="text" v-model="fibonacciResult">
		</div>
	</div>
</template>

<script>
import store from "@/store.js";

export default {
	data() {
		return {
			store,
			numberK: null,
			fibonacciResult: null
		}
	},
	name: "kalkulator",
	methods: {
		calculateFibonacci() {
			fetch(`http://localhost:3000/fibonacci?numberK=${this.numberK}`)
				.then(response => {
					return response.json()
				})
				.then(data => {
					console.log("Results", data)
					this.fibonacciResult = data.fibonacciResult;
				});
		}
	},
}
</script>

<style scoped>
	.center {
		text-align: center;
	}
	.title-label {
		text-align: center;
		font-weight: bold;
	}
	.cal-btn {
		text-align: center;
		margin-top: 35px;
		margin-bottom: 50px;
	}
</style>