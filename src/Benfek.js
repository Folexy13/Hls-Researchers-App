import React from 'react'

const Benfek = () => {
  return (
    <section className="directory">
        <h2>Directory</h2>
        <ul>
            <li>
                <span class="directory-link">
                    <i class="fas fa-users"></i>
                    <span>Benfeks</span>
                </span>
            </li>
            <li>
                <span class="directory-link">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Purchases</span>
                </span>
            </li>
            <li>
                <span class="directory-link">
                    <i class="fas fa-user-plus"></i>
                    <span>Add benfek</span>
                </span>
            </li>
        </ul>
    </section>
  )
}

export default Benfek