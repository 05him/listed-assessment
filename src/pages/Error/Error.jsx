import './Error.css'

export const Error = () => {
    return <div className="container-error" >
        <h1> { '</>' } Board. </h1>
        <div> Oopss... Some Error Occured </div>
    </div>
}

export const BadAccess = () => {
    return <div className="container-error" >
        <h1> { '</>' } Board. </h1>
        <div> <span className='error-name' > 401 </span> Unauthorized access </div>
    </div>
}

export const NotFound = () => {
    return <div className="container-error" >
        <h1> { '</>' } Board. </h1>
        <div> <span className='error-name' > 404 </span> Page Not Found </div>
    </div>
}