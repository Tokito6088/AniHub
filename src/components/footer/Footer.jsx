import React from 'react'

import ContentWrapper from '../contentWrapper/ContentWrapper'

import './style.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="links">
          <li>
            <a href="https://github.com/yahyaMomin" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/yahya-momin-53794225a" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
        </ul>
        <div className="infoText">@ copyRights all rights reserved - AniHub</div>
      </ContentWrapper>
    </footer>
  )
}

export default Footer
