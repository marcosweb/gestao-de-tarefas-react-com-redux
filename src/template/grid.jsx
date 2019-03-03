import React, { Component } from 'react'

export default class Grid extends Component {
    toCssClasses(strNumbers) {
        const arrayNumbers = strNumbers.split(' ') || ['12 9 3 2']
        const types = ['xs','sm','md','lg']
        return arrayNumbers.slice(0, 4).map((item, index) => {
            const type = types[index]
            return `col-${type}-${item}`
        }).join(' ')
    }

    render() {
        const gridClasses = this.toCssClasses(this.props.cols || 12)
        return (
            <div className={gridClasses}>
                {this.props.children}
            </div>
        )
    }
}
