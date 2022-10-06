import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Profile = () => {
    const navigate = useNavigate();
    const {state,dispatch} = useContext(UserContext);
    const [update,setUpdate] = useState(false)
    const [name,setName] = useState(state?.name);
    const [phone,setPhone] = useState(state?.phone);
    const [address,setAddress] = useState(state?.address)




  const LogOut = (e) =>{
    e.preventDefault();
   localStorage.clear();
    dispatch({type:"LOGOUT"})
    navigate("/login")
  }
  
  const editUser = (e)=>{
    e.preventDefault();
       setUpdate(true)
  }


  const UpdateUser = async (e) =>{
    e.preventDefault();
    const res = await fetch('https://e-comm-api-small.herokuapp.com/user/update/'+state?._id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${localStorage.getItem("jwtToken")}`
        },
        body:JSON.stringify({
            name,
            phone,
            address

        })
    });

    const data = await res.json();
    console.log(data)
    if(data.success){
        localStorage.setItem('user',JSON.stringify(data.user));
        dispatch({type:"UPDATE",payload:data.user})
        setUpdate(false)
    }

  }


    return (
        <>
            <div >

                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">


                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.png" alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                        <h5 className="my-3">{state?.name}</h5>
                                        <p className="text-muted mb-1">Devops</p>
                                        <p className="text-muted mb-4"></p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="button" className="btn btn-primary">Follow</button>
                                            <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{  update ? <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />    :    <>    {state?.name}     </>     } </p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{  update ?  <input  value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" />   :    <>    {state?.phone}     </>      } <span>  
                                                { state?.phone ==="No phone" && update==false ? 
                                                 <button onClick={editUser} style={{marginLeft:"70px"}} className='btn btn-primary'> Add Phone </button> : null } </span> </p>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{  update ?  <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" />    :    <>    {state?.address}     </>     } 
                                               
                                                 <span style={{marginLeft:"70px"}} > 

                                                {state?.address ==="No Address" && update==false ?  
                                                 <button onClick={editUser}  className='btn btn-primary'> Add Address </button>
                                                  : null     }   

                                                     </span>
                                                      </p>
                                            </div>
                                        </div>

                                        
                                    </div>
                                    
                                </div>
                                       <div className="buttom-section">
                                            <button onClick={LogOut} className='btn btn-danger' > LogOut </button>

                                          { update ? 
                                            
                                            <button onClick={UpdateUser} style={{marginLeft:"220px"}} className='btn btn-success' > Update User </button>

                                            :

                                            <button onClick={editUser} style={{marginLeft:"20px"}} className='btn btn-secondary' > Edit User </button>

                                          }  
                                                
                                           
                                        </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>




        </>
    )
}

export default Profile;
