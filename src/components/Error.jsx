const Error = ({ children }) => {
  return (
    <div className='bg-red-800 mb-5 rounded'>
        <p 
            className='text-white text-center p-3 uppercase font-bold'
        >
            { children }
        </p>
    </div>
  )
}

export default Error;