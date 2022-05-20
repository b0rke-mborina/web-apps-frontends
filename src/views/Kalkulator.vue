<template>
	<div>
		<div class="main-grid">
			<div class="grid-item-grid">
				<span class="item-label">First operand:</span>
				<input type="text" v-model="firstOperand">
			</div>
			<div class="grid-item-grid">
				<span class="item-label">Second operand:</span>
				<input type="text" v-model="secondOperand">
			</div>
		</div>
		<div class="cal-btn">
			<button @click="calculate()" type="Novi post" class="btn btn-primary ml-2">Calculate</button>
		</div>
		<div class="main-grid">
			<div class="grid-item-grid">
				<span class="item-label">Sum:</span>
				<input type="text" v-model="sum">
			</div>
			<div class="grid-item-grid">
				<span class="item-label">Difference:</span>
				<input type="text" v-model="difference">
			</div>
			<div class="grid-item-grid">
				<span class="item-label">Product:</span>
				<input type="text" v-model="product">
			</div>
			<div class="grid-item-grid">
				<span class="item-label">Quotient:</span>
				<input type="text" v-model="quotient">
			</div>
		</div>
	</div>
</template>

<script>
import store from "@/store.js";

export default {
	data() {
		return {
			store,
			firstOperand: null,
			secondOperand: null,
			sum: null,
			difference: null,
			product: null,
			quotient: null
		}
	},
	name: "kalkulator",
	methods: {
		calculate() {
			fetch(`http://localhost:3000/kalkulator?firstOperand=${this.firstOperand}&secondOperand=${this.secondOperand}`)
				.then(response => {
					return response.json()
				})
				.then(data => {
					console.log("Results", data)
					this.sum = data.sum;
					this.difference = data.difference;
					this.product = data.product;
					this.quotient = data.quotient;
				});
		}
	},
}
</script>

<style scoped>
	button {
		margin-bottom: 20px
	}
	.cal-btn {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 30px;
	}
	.main-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;
		justify-content: space-around;
	}
	.grid-item-grid {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 15px;
		justify-content: center;
	}
	.item-label {
		text-align: center;
	}
</style>