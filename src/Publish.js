import React from 'react'

const Publish = () => {
  return (
    <section className="publish">
        <h2>Publish</h2>
        <ul>
            <li>
                <span class="publish-link">
                    <i class="fas fa-capsules"></i>
                    <span>Supplements</span>
                </span>
            </li>
            <li>
                <span href="#" class="publish-link">
                    <i class="fas fa-newspaper"></i>
                    <span>Articles</span>
                </span>
            </li>
            <li>
                <span class="publish-link">
                    <i class="fas fa-podcast"></i>
                    <span>Podcasts</span>
                </span>
            </li>
        </ul>
    </section>
  )
}

export default Publish