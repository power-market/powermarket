import React from 'react'

/* -----------------    COMPONENT     ------------------ */

export default function review(props) {

  const { review } = props

  return (
    <li className="media">
      <div className="media-body">
        <h4 className="media-heading">{review.title}</h4>
        <h4 className="media-heading">By {review.user_id}</h4>
        <h4>{review.stars}</h4>
        <h5>{review.text}</h5>
      </div>
    </li >
  )
}
