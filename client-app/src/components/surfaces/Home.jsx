import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Hello SUMMER</h1>
            <h3>Go to <Link to='/activities'>Activities</Link></h3>
        </div>
    )
}
