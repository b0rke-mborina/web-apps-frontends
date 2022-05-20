import axios from 'axios'

// instanca axios-a za potrebe Fipugram backenda
let Service = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 1000
})

// naš objekt za sve pozive koji se dotiču `Post`ova
let Posts = {
	async getAll(searchTerm) {
		let response = await Service.get(`/posts?title=${searchTerm}&createdBy=${searchTerm}`);
		console.log(response);
		let posts = response.data.map(doc => {
			return {
				id: doc.id,
				url: doc.source,
				email: doc.createdBy,
				title: doc.title,
				posted_at: Number(doc.postedAt)
			};
		});
		return posts;
	},
	async search(title, createdBy) {
		let address = "http://localhost:3000/posts";
		if (title && createdBy) {
			address += `?title=${title}&createdBy=${createdBy}`;
		} else if (title) {
			address += `?title=${title}`;
		} else if (createdBy) {
			address += `?createdBy=${createdBy}`;
		}
		console.log(address);
		let res = await fetch(address);
		let result = await res.json();
		console.log(result);
	},
	/*add(post) {
		return Service.post('/posts', post)
	},
	getAll(searchTerm) {
		let options = {}
		if (searchTerm) {
			options.params = {
				title: searchTerm
			}
		}
		return Service.get('/posts', options)
	}*/
	/*getAll(searchTerm) {
		return Service.get(`/posts?title=${searchTerm}`)
	}*/
}
export { Service, Posts } // exportamo Service za ručne pozive ili Posts za metode.

/*
// primjer Promisea
fetch('http://example.com/movies.json') // fetch vraća promise
	.then((response) => { // samim time imamo dostupnu metodu .then()
		return response.json(); // vraćanje novog promise-a
	})
	.then((data) => { // i novi promise ima .then()
		console.log(data);
	})
	.catch((err) => { // hvata greške s oba prethodna promise-a
		console.error(err);
	})

let p1 = fetch("...neka adresa")
let p2 = fetch("...neka adresa 2")
let p3 = fetch("...neka adresa 3")
Promise.all([p1, p2, p3])
	.then(rezultati => {
		// ovo je dostupno tek kada sva tri promise-a završe
	})
*/