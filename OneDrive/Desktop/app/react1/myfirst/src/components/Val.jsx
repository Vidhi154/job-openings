import React from 'react'

const Val = (props) => {
  return (
    <div className="vidhi">
        <h1> {props.user} </h1>
        <img src={props.im} alt="randomimage" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem molestiae praesentium et quam, quas quia quae voluptatum repellendus at ab nobis amet maxime mollitia suscipit porro, quos provident optio ea.</p>
        <button>clicke me </button>
      </div>
  )
}

export default Val
