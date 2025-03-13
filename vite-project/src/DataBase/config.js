const DATABASE_URL= import.meta.env.VITE_DATABASE_URL
console.log(DATABASE_URL);

class UserService {
    constructor() {
        this.baseUrl = DATABASE_URL;
    }

    async registerUser(userData) {

        const {firstName,lastName,email,password,gender,DOB} =userData
        const url = `${this.baseUrl}/user/register`;

        const data = await fetch(url,{
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                gender,
                DOB,
            })

        }).then(async Response=> Response.json())

        return data
        
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

