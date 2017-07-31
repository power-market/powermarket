import React from 'react'
import axios from 'axios'
import connect from 'react-redux'
import { createNewReview } from '../reducers/review'

const reviewForm = {
  title: '',
  text: '',
  stars: 3,
  date: new Date()
}
class AddReviewForm extends React.Component {
  constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

  handleChange(event) {
      const value = event.target.value
      this.setState({
          [event.target.name]: value
        })
    }

  handleSubmit(event) {
      event.preventDefault()
      this.props.createNewReview(this.state)
      this.props.history.push('/')
      this.setState(blankFormState)
    }

  render() {
      return (
            <div>
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <h2>Submit New Review</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Title:
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </label>
                        <hr />
                        <label>
                            Description:
                            <input
                                className="form-control"
                                type="text"
                                name="text"
                                value={this.state.text}
                                onChange={this.handleChange}
                            />
                        </label>
                        <hr />
                        <label>
                            Rating:
                            <input
                                className="form-control"
                                name="stars"
                                value={this.state.stars}
                                onChange={this.handleChange}
                            />
                        </label>
                        <hr />
                        <input
                            className="btn btn-success"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}
// const mapState = {
// }

const mapDispatchToProps = {
  createNewReview
}

export default connect(null, mapDispatchToProps)(AddReviewForm)
