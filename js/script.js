const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const roles = {
	STUDENT: 'student',
	ADMIN: 'admin',
	LECTOR: 'lector',
}

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

function getTextMarkOfNumber(mark) {
	for (const key in gradation) {
		if (Number(key) >= mark) {
			return gradation[key];
		}
	}
}

class User {
	constructor(name, age, img, role, courses) {
		this.name = name;
		this.age = age;
		this.img = img;
		this.role = role;
		this.courses = courses;
		this.list = document.querySelector('.users');
		this.listItem;
	}

	render() {
		this.listItem = document.createElement('div');
		this.listItem.classList.add('user');
		const { img, name, age, role } = this;
		const html = `
		<div class="user__info">
        	<div class="user__info--data">
                <img src="images/users/${img}.png" alt="${name}" height="50">
                <div class="user__naming">
                    <p>Name: <b>${name}</b></p>
                    <p>Age: <b>${age}</b></p>
                </div>
            </div>
			<div class="user__info--role ${role}">
        		<img src="images/roles/${role}.png" alt="${role}" height="25">
        		<p>${role}</p>
        	</div>
        </div>
		`;
		this.listItem.innerHTML = html;
		this.list.appendChild(this.listItem);
	}

	renderCourses() {
		const { courses, role } = this;
		if (courses) {
			const userCourses = document.createElement('div');
			userCourses.classList.add('user__courses');

			let html = '';
			courses.forEach((course) => {
				const { title, mark } = course;
				const textMark = getTextMarkOfNumber(mark);
				html += `<p class="user__courses--course ${role}">${title} <span class="${textMark}">${textMark}</span></p>`;
			});

			userCourses.innerHTML = html;
			this.listItem.appendChild(userCourses);
		}
	}
}

class Student extends User {
	constructor(name, age, img, courses) {
		super(name, age, img, roles.STUDENT, courses)
	}
}

class Admin extends User {
	constructor(name, age, img, courses) {
		super(name, age, img, roles.ADMIN, courses)
	}

	renderCourses() {
		const { courses, role } = this;
		const userCourses = document.createElement('div');
		userCourses.classList.add('user__courses');
		userCourses.classList.add('admin--info');

		let html = '';
		courses.forEach((course) => {
			const { title, score, lector } = course;
			const textScore = getTextMarkOfNumber(score);
			html += `
					<div class="user__courses--course ${role}">
						<p>Title: <b>${title}</b></p>
						<p>Admin's score: <span class="${textScore}">${textScore}</span></p>
						<p>Lector: <b>${lector}</b></p>
					</div>
					`;
		});

		userCourses.innerHTML = html;
		this.listItem.appendChild(userCourses);
	}
}

class Lector extends User {
	constructor(name, age, img, courses) {
		super(name, age, img, roles.LECTOR, courses)
	}

	renderCourses() {
		const { courses, role } = this;
		const userCourses = document.createElement('div');
		userCourses.classList.add('user__courses');
		userCourses.classList.add('admin--info');

		userCourses.innerHTML = courses.reduce((acc, course) => {
			const { title, score, studentsScore } = course;
			const textScore = getTextMarkOfNumber(score);
			const textStudentScore = getTextMarkOfNumber(studentsScore);
			return acc += `
					<div class="user__courses--course ${role}">
						<p>Title: <b>${title}</b></p>
						<p>Lector's score: <span class="${textScore}">${textScore}</span></p>
						<p>Average student's score: <span class="${textStudentScore}">${textStudentScore}</span></p>
					</div>
					`;
		}, '');
		this.listItem.appendChild(userCourses);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const createPerson = (user) => {
		const { name, age, img, role, courses } = user;
		switch (role) {
			case roles.STUDENT:
				return new Student(name, age, img, courses);
			case roles.ADMIN:
				return new Admin(name, age, img, courses);

			case roles.LECTOR:
				return new Lector(name, age, img, courses);
			default:
				throw new Error('Invalid role' + role);
		}
	}

	users.forEach((user) => {
		const person = createPerson(user);
		person.render();
		person.renderCourses();
	});
});
