import React from 'react'
import { connect } from 'react-redux'
import Category from './Category'

class Sidebar extends React.Component {
    render() {
        const { products } = this.props
        const elemental = products.filter(product => product.category === 'elemental')
        const adaptation = products.filter(product => product.category === 'adaptation')
        const mental = products.filter(product => product.category === 'mental')
        return (
            <sidebar className='col-xs-2'>
                <div className="sidebar-header">
                    <h3 href="/">
                        <div>Categories</div>
                    </h3>
                </div>
                {/* <Category props={elemental} />
                <Category props={adaptation} />
                <Category props={mental} /> */}

            </sidebar>
        )
    }
}
const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(Sidebar)
