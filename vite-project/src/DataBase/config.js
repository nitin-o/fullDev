const DATABASE_URL= import.meta.env.VITE_DATABASE_URL
console.log(DATABASE_URL);

class UserService {
    constructor() {
        this.baseUrl = DATABASE_URL;
    }

    async registerUser(userData) {
        const url = `${this.baseUrl}/user/Ragister`;
        
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            
            console.log(response);
             console.log(userData);
            

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }
}

// ✅ Example Usage:
const userService = new UserService("http://localhost:8000");

export default userService

// const userData = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     password: "securepassword",
//     profile_Image: "https://example.com/profile.jpg",
//     covar_Image: "https://example.com/cover.jpg",
//     gender: "Male",
//     DOB: "2000-01-01",
//     refresh_Token: "your-refresh-token",
//     access_Token: "your-access-token"
// };

// userService.registerUser(userData)
//     .then(response => console.log("User Registered:", response))
//     .catch(error => console.error("Registration Failed:", error));
