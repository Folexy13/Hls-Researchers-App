import React from 'react'

const Account = () => {
  return (
    <section className="wallet">
        <h2>Wallet</h2>
        <ul>
            <li>
                <span className="wallet-link">
                    <i class="fas fa-history"></i>
                    <span>Account</span>
                </span>
            </li>
            <li>
                <span class="wallet-link">
                    <i class="fas fa-chart-line"></i>
                    <span>Earnings</span>
                </span>
            </li>
            <li>
                <span class="wallet-link">
                    <i class="fas fa-money-bill-alt"></i>
                    <span>Withdraw</span>
                </span>
            </li>
        </ul>
    </section>
  )
}

export default Account