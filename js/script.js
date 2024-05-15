const users = []

const getInputFieldValue = id => document.getElementById(id).value

const getRandomId = () => Math.random().toString(36).slice(2)

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function showOutput(output) {
    document.getElementById("output").innerHTML = output
}

function calculateAge(dob) {

    let birthYear = dob
    birthYear = new Date(birthYear).getFullYear()

    let currentYear = new Date().getFullYear()

    let age = currentYear - birthYear

    return age
}

const userData = () => {
    const form = document.getElementById("registrationForm")

    event.preventDefault()

    let firstName = getInputFieldValue("firstName")
    firstName = firstName.trim()
    if (firstName.length < 3 || !firstName) {
        showNotification("Enter your first Name correctly", "error")
        return
    }

    let lastName = getInputFieldValue("lastName")
    lastName = lastName.trim()
    if (!lastName) {
        showNotification("Enter your last Name", "error")
    }

    // let fullName = firstName + " " + lastName

    let email = getInputFieldValue("email")
    if (!emailRegex.test(email) || !email) {
        showNotification("Please enter your email correctly.", "error")
        return
    }

    let dob = getInputFieldValue("dob")
    if (!dob) {
        showNotification("Please enter your date of birth.", "error")
        return
    }

    function isUserRegistered(email, users) {
        // Check if any user in the array has the given email
        return users.some(user => user.email === email);
    }

    let emailToCheck = email
    if (isUserRegistered(emailToCheck, users)) {
        showNotification("User already registered", "error")
        return
    } else {

        showNotification("User successfully registered!", "success")
        form.reset()
    }

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        Id: getRandomId(),
        age: calculateAge(dob)
    }

    // if (!firstName || firstName < 3 || !lastName || !email || !dob) {
    //     showNotification("Please enter data", "error")
    //     return
    // }

    // console.log(users)

    users.push(user)

}


function showInConsole() {
    console.log(users)
}

function showTable() {
    if (!users.length) {
        showNotification("No single user is registered", "error")
        return
    }

    let tableStarting = '<div class="table-responsive"><table class="table">'
    let tableEnding = '</table></div>'

    let tableHead = '<thead><tr><th scope="col"#</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Email</th><th scope="col">Date of Birth</th><th scope="col">Age</th></tr></thead>'

    let tableBody = ""

    for (let i = 0; i < users.length; i++) {
        tableBody += '<tr><th scope="row">' + (i + 1) + '</th><td>' + users[i].firstName + '</td><td>' + users[i].lastName + '</td><td>' + users[i].email + '</td><td>' + users[i].dob + '</td><td>' + users[i].age + '</td></tr>'
    }

    let table = tableStarting + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEnding

    showOutput(table)
}

function showNotification(message, type) {

    let bgColor

    switch (type) {
        case 'success':
            bgColor = "linear-gradient(to right, #1D976C, #93F9B9)"
            break
        case 'error':
            bgColor = "linear-gradient(to right, #93291e, #ed213a)"
            break
        default:
            bgColor = "#000"
    }

    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
