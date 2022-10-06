import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from "../App";


const NavBar = () => {

    const { state, dispatch } = useContext(UserContext);

    console.log(state)




    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Neel  </a>
                    {  state ?

                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> :
                    
                    null


                    }
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul style={{margin:"0 30px"}} className="navbar-nav ms-auto mb-2 mb-lg-0">

                       {
                          state ?
                           <>
                            <li style={{marginRight:"20px"}} className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li style={{marginRight:"20px"}} className="nav-item">
                              <NavLink  to="/" > <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                </NavLink> 
                            </li>  
                           </>
                                :
                                null

                       }
                         

                        </ul>

                    </div>
                </div>
            </nav>


        </>
    )
}

export default NavBar;
