import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


const SignUp = () => {


  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", password: ""
  });

  let name, value;
  const HandleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })

  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email,password } = user;

        // Vallidation Start 

    if(!email || !password || !name){
      alert("all fields required");
      return
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            
      alert('invalid email')
      return
   }
    if(password.length <8){
      alert("Password should be 8 character  minimum ")
      return
    }

    // Vallidation End 


    const resp = await fetch('https://e-comm-api-small.herokuapp.com/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password
      })
    });

    const data = await resp.json();

    console.log(data);
      if(data.success){
        navigate('/login')
      }

  }



  return (
    <>
      <div>
        <section className="vh-100" style={{ backgroundCcolor: " #eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-50">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: "25px" }}>
                  <div className="card-body p-md-1">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4"   >

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" className="form-control" name="name" id="exampleInputName1" aria-describedby="namelHelp"
                                value={user.name}
                                onChange={HandleInput}
                                placeholder="Enter name" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" className="form-control" name="email" id="exampleInputEmail1"
                                value={user.email}
                                onChange={HandleInput}
                                placeholder="Enter email" />
                            </div>
                          </div>

                         

                        

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" className="form-control" name="password" id="exampleInputPassword1"
                                value={user.password}
                                onChange={HandleInput}
                                placeholder="Password" />
                            </div>
                          </div>

                       


                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" onClick={PostData} className="btn btn-primary" value="register" >Register</button>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">

                            <label className="form-check-label" htmlFor="form2Example3">
                              Already have an Account? <NavLink to="/login">Login</NavLink>
                            </label>
                          </div>



                        </form>

                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.png" className="img-fluid" alt="Sample img" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

    </>

  )
}

export default SignUp;
