import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { LOGIN_ROUTES, SIGNUP_ROUTES } from "@/utils/constants.js";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "@/utils/auth";
import { socket } from "@/utils/socket";

const Auth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validate signup inputs
  const validateSignup = () => {
    if (!username.length) {
      toast.error("Username is required");
      return false;
    }
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
        const response = await apiClient.post(LOGIN_ROUTES, {
            username,
            password,
        },{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        });
           
        if (response.status === 200) {
          const token = response.data.token;
    
          // Store token in localStorage
          localStorage.setItem('token', token);
          //Decode Token for user info
          const decodedToken = getDecodedToken(token);
          setUser(decodedToken);
         
          console.log("Decoded Token:", decodedToken);
         
          // Emit user online event
          socket.emit('user-online', response.data.user, {
            id: user.id,
            username: user.username,
            email: user.email,
            imageURL: user.imageURL,
          }
          )
          console.log(user.id);
        
              
    
          // Navigate to another page
          navigate("/chat");
          toast.success("Login successful!");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Invalid username or password.");
      }
    };
  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTES, {
          username,
          password,
          email,
          firstName,
          lastName,
          imageURL,
        },
      {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 201) {
          toast.success("Signup successful");
          navigate("/auth"); // Redirect to login after signup
        } else {
          toast.error("Signup failed.");
        }
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error("Error during signup. Please try again.");
      }
    }
  };

  return (
    <div className="h-[100vh] font-title bg-[#1d1528] md:shrink-0 w-[100vw] flex-row flex items-center justify-center text-[#7dca9b]">
     
      <div className=" bg-[#1d1528] font-body border-[#a816ec] border-r-4 border-solid h-full flex-grow-1 pb-12 items-center text-opacity-90 shadow-2xl  md:w-[90vw] lg:w-[70vw] xl:flex justify-center rounded-sm grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center md:flex-row shrink-0 sm:flex-row ">
          <div className="flex items-center justify-center flex-grow-1 h-fit flex-col w-[100%]">
            <div className="flex items-center justify-center flex-col gap-10 p-4">
              <div className="flex items-center flex-row gap-4 justifty-center">
                <img src="/logo_small.png" alt="icon" className="w-10 h-10" />
              <h1 className="text-5xl font-title font-bold md:text-6xl">Welcome</h1>
</div>
              <p className="font-medium text-center">
                Fill in details to get started with Looking For Facts
              </p>
            </div>
            <div className="flex items-center justify-center w-full">
              <Tabs>
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-transparent text-[#7dca9b] 
                      text-opacity-90 border-b-2 
                      rounded-none w-full data-[state=active]:text-[#7dca9b] 
                      data-[state=active]:font-semibold data-[state=active]:border-b-[#a816ec] p-3 transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>

                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-transparent text-[#7dca9b] 
                      text-opacity-90 border-b-2 
                      rounded-none w-full data-[state=active]:text-[#7dca9b] 
                      data-[state=active]:font-semibold data-[state=active]:border-b-[#a816ec] p-3 transition-all duration-300"
                  >
                    Signup
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  className="flex flex-col gap-5 mt-10"
                  value="login"
                >
                  <Input
                    placeholder="Username"
                    type="text"
                    className="rounded-full p-6"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    className="rounded-full p-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="bg-[#7dca9b] text-white rounded-full p-6 w-100%"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </TabsContent>
                <TabsContent
                  className="flex flex-col gap-5 mt-10"
                  value="signup"
                >
                  <Input
                    placeholder="Username"
                    type="text"
                    className="rounded-full p-6"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-6"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="First Name"
                    type="text"
                    className="rounded-full p-6"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    className="rounded-full p-6"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    placeholder="Image URL"
                    type="url"
                    name="imageURL"
                    className="rounded-full p-6"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-6"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="rounded-full p-6"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="bg-[#7dca9b] text-white rounded-full p-6 w-100%"
                    onClick={handleSignup}
                  >
                    SignUp
                  </button>
                </TabsContent>
              </Tabs>
          
            </div>
          </div>
        </div> 
      </div> 
      <div className="bg-[#1d1528] flex flex-col items-center justify-center h-screen"></div>
      <div className="w-[90vw] flex flex-grow-1 bg-center bg-cover h-screen bg-no-repeat" style={{ backgroundImage: 'url("/logo_large.png")' }}>
      
      </div>
    </div>
  );
};

export default Auth;
