const DATABASE_URL= import.meta.env.VITE_DATABASE_URL
console.log(DATABASE_URL);

class UserService {
    constructor() {
        this.baseUrl = DATABASE_URL;
    }

    async registerUser(formData) {

        try {
            const response = await fetch(`${this.baseUrl}/user/register`, {
                method: "POST",
                body: formData,
            });
    
            const result = await response.json();
            console.log("Response:", result);
        } catch (error) {
            console.error("Error:", error);
        }
        
    }

    async loginUser(userData) {
        try {
            const { email, password } = userData;
            const url = `${this.baseUrl}/user/login`;
    
            const response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                 credentials: "include",  // Required for cookies
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error during login:", error);
            return { success: false, message: error.message };
        }
    }
    

    async logoutUser() {
        try {
            const url = `${this.baseUrl}/user/logout`;
    
            const response = await fetch(url, {
                method: "POST",
                credentials: "include", // Ensure cookies are sent with request
                headers: { "Content-Type": "application/json" },
            });
            
            
            const data = await response.json();
            if (!data?.success) {
                return data.message
            }
            return data.data;
        } catch (error) {
            console.error("Error during logout:", error);
            return { success: false, message: error.message };
        }
    }

  

    async isLogin (){
        const url = `${this.baseUrl}/user/isLogin`;
    
        const response = await fetch(url, {
            method: "POST",
            credentials: "include", // Ensure cookies are sent with request
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data?.success== false) {
            return data.success
        }
        
        return data.data
        
    }
}

const userService = new UserService();

export default userService

