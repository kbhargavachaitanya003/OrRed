import React from 'react'
import { Typography } from '@mui/material'
import '../Styles/Thankyou.css'


const Thankyou = () => {
  return (
    <div className='thankspage'>
      <Typography variant="h2" gutterBottom className='thanks'>Thankyou for choosing us!</Typography>
      <Typography variant="h4" gutterBottom className='thanks'>Your Order is on the way.</Typography>
    </div>
  )
}

export default Thankyou
