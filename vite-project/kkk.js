fetch("http://localhost:8000/user/Ragister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: 1,
      name: "Nitin",
      last_name: "Otavkar",
      email: "nitin@example.com",
      password: "securepassword",
      dob: "2001-02-14",
      gender: "Male"
    })
  })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));
  