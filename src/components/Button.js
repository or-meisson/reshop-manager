import React from 'react'

const Button = ({children ,className ="",...props}) => {
  return (
    <button className={`${className} px-4 py-2 rounded`} {...props}>{children}</button>
  )
}

export default Button