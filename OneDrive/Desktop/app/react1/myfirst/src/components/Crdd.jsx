import React from 'react'
import { Bookmark } from 'lucide-react';

const Crdd = (props) => {
  return (
    <div className='crd'>
        <div>
        <div className='div1'>
            <img src={props.im} alt="logo"/>
            <button>save <Bookmark size={10}/></button>
        </div>

        <div className='cen'>
            <div>
            <h3>{props.user} <span>{props.ago}</span></h3>
            <h2>{props.det}</h2>

            <div className='tags'>
                <h4>{props.time}</h4>
                <h4>{props.exp}</h4>
            </div>
            </div>

        </div>
        </div>

        <div className='bot'>
            <div>
                <h3>{props.cost}</h3>
                <p>{props.location}</p>

            
            </div>
            <button>Apply Now</button>
        </div>
      
    </div>
  )
}

export default Crdd
