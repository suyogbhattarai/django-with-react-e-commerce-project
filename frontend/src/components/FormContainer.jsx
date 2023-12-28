import React from 'react'
 

function FormContainer({children}) {
  return (
    <>
    <div className="container">
        <div className="row justify-content-md-center ">
            <div className="col-md-6 col-sm-12">
                {children }
            </div>
        </div>
    </div>
    </>
   
  )
}

export default FormContainer