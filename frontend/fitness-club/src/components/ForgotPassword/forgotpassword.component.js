import React, { useState } from "react";
import { Link } from "react-router-dom";
import Background from "./images/gym2.jpeg";
import axios from "axios";
import emailjs from "emailjs-com";

export default function ForgotPassword(){

        const [email,setEmail] = useState();
        const [password,setPassword] = useState();
        const [verify,setVerify] = useState("false");

        function resetPassword(e){

            e.preventDefault();

            const resetPasswordObject = {

                email:email

            }

            axios.post(process.env.REACT_APP_BACKEND_URL + "/api/forgotpassword",resetPasswordObject).then((res)=>{

                //alert("success");
                //setEmail(res);
                //console.log(res.data.password2);
                setPassword(res.data.password2);
                setVerify("true");

                
                

            }).catch((err)=>{
                    alert(err);
            })

        }

        function sendEmail(e) {

            e.preventDefault();

            emailjs
            .sendForm(
              "gmail",
              "template_ef5o6xh",
              e.target,
              "user_4hQlVwKm1eUwsRWPbvFHE"
            )
            .then(
              (result) => {
                console.log(result.text);
                alert("Email Sent");
                window.location = "/userLogin";
              },
              (error) => {
                console.log(error.text);
              }
            );
            
        }

        return(

            <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-9 col-lg-12 col-xl-10">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-flex">
                                    <div class="flex-grow-1 bg-password-image"
                                     style={{
                                        // border: "2px solid blue",
                                        backgroundImage: `url(${Background})`,
                                        backgroundRepeat:
                                          "no-repeat" /* Do not repeat the image*/,
                                        backgroundSize: "cover",
                                        boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",}}></div>
                                </div>
                                <div class="col-lg-6">

                                    {  verify === "true" ?  
                                  
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-2">Forgot Your Password?</h4>
                                            <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form class="user" onSubmit={sendEmail}>
                                            <div class="form-group">

                                                <input class="form-control form-control-user" type="text" name="email" value={email} readonly hidden/>
                                                <input class="form-control form-control-user" type="text" name="password" value={password} readonly hidden/>
                                                </div>
                                                
                                                <button class="btn btn-primary btn-block text-white btn-user"
                                                type="submit">Send Email</button>
                                        </form>
                                     
                                     
                                    </div>
                                     : 
                                     <div class="p-5">
                                         <div class="text-center">
                                             <h4 class="text-dark mb-2">Forgot Your Password?</h4>
                                             <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                         </div>
                                         <form class="user" onSubmit={resetPassword}>
                                             <div class="form-group">
 
                                                 <input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email"
                                                 
                                                 onChange = {(e)=>{
                                                     setEmail(e.target.value);
                                                 }}
                                                 
                                                 />
                                                 
                                                 </div>
                                                 
                                                 <button class="btn btn-primary btn-block text-white btn-user"
                                                 type="submit">Verify Email</button>
                                         </form>
                                         <div class="text-center">
                                             <a class="small" href="registration">Create an Account!</a></div>
                                         <div class="text-center"><a class="small" href="userlogin">Already have an account? Login!</a></div>
                                     </div>
                                   

                                    }
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    
}