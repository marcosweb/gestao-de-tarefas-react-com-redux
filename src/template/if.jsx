import React from 'react'

export default props => {
    if (props.test) {
        return props.children
    }
    return false
    //return props.test ? props.children : false
}