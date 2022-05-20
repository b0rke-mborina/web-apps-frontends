<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 class="text-center mb-5">Sign up for our instagram clone</h1>
            </div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col">
                <form @submit.prevent="signup">
                    <div v-if="errorMessage" class="alert alert-danger">
                        <strong>Ups!</strong>
                        {{ errorMessage }}
                    </div>
                    <div class="form-group">
                        <label for="emailField">Email address</label>
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            id="emailField"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" class="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="passwordField">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            id="passwordField"
                            placeholder="Password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="confirmPasswordField">Confirm Password</label>
                        <input
                            v-model="password2"
                            type="password"
                            class="form-control"
                            id="confirmPasswordField"
                            placeholder="Confirm password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="tipProfila">Tip profila</label>
                        <select v-model="odabraniTipProfila" id="tipProfila" class="form-control form-control-lg">
                            <option v-for="k in tipProfila" :key="k">{{ k }}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary mt-5">Submit</button>
                </form>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script>
import store from '../store';
import { Auth } from "@/services";

export default {
	data() {
		return {
			errorMessage: '',
			email: '',
			password: '',
			password2: '',
			tipProfila: ['Javni', 'Privatni'],
			odabraniTipProfila: ''
		};
	},
	mounted() {},
	methods: {
		async signup() {
			/*firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.then(() => {
						// postavi podatke o korisniku
						let id = this.email;
						// sada moramo spremiti te dodatne podatke
						db.collection('korisnici')
							.doc(id)
							.set({
									tipProfila: this.odabraniTipProfila
							})
							.then(function() {
									console.log('Document successfully written!');
							})
							.catch(function(error) {
									console.error('Error writing document: ', error);
							});
					})
					.catch(error => {
						console.error(error);
						this.errorMessage = error.message;
					});*/
			let success = await Auth.login(this.email, this.password);
			console.log("Rezultat registracije: " + success);

			if (success == true) {
				this.$router.push({name: "posts"});
			}
		}
	}
};
</script>
