import React from 'react'
import { connect } from 'react-redux'
// import Category from './Category'

class Sidebar extends React.Component {
    render() {
        const elemental = this.props.products.filter(product => product.category === 'elemental')
        const adaptation = this.props.products.filter(product => product.category === 'adaptation')
        const mental = this.props.products.filter(product => product.category === 'mental')
        console.log(elemental)
        return (
            <sidebar className='col-xs-2 sidebar-nav'>
                <div className="sidebar-header">
                    <label href="/">
                        <div>Categories</div>
                    </label>
                </div>
                <div>
                    <h5>
                        <a className='clearfix' to='/'>Elemental</a>
                        <a className='clearfix'>Adaptation</a>
                        <a className='clearfix'>Mental</a>
                    </h5>

                </div>

                <div>
                    <label>Sort by</label>
                    <select style={{ color: '#263238' }}>
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                        <option>Oldest to Newest</option>
                        <option>Newest to Oldest</option>
                        <option>Best Selling</option>
                    </select>
                </div>
            </sidebar>
        )
    }
}
const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(Sidebar)
