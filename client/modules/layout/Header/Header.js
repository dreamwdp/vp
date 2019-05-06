import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.sass';

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showMenu: false,
    }
    this.onFBClick = this.onFBClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }
  toggleMobileMenu(){
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }
  onFBClick(evt){
    evt.preventDefault();
    this.props.onOAuth(this.props.facebookUrl);
  }

  onLogout() {
    this.props.onLogout();
  }

  render() {
    const { url, isAuth, detail, authReady } = this.props;
    let imagUrl = isAuth ? detail.get('img') : '//dkny.oss-cn-hangzhou.aliyuncs.com/2/icon.png'
    if (__DEV__ && isAuth) {
      imagUrl = 'http://dkny.oss-cn-hangzhou.aliyuncs.com/temp/test_profile.jpeg';
    }
    return (<nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <img src={imagUrl} height="28" />
      </Link>
      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        onClick={this.toggleMobileMenu}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div className={`navbar-menu ${this.state.showMenu ? 'is-active' : ''}`}>
      <div className="navbar-start">
        {
          isAuth &&
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              { detail.get('name') }
            </a>
    
            <div className="navbar-dropdown">
              <Link className="navbar-item"
                to="/portfolio"
                onClick={this.props.onEnterProfile.bind(null, 'myPortfolio')}
              >
                Profile
              </Link>
              <Link className="navbar-item"
                to="/like"
                onClick={this.props.onEnterProfile.bind(null, 'myLiked')}
              >
                Like
              </Link>
              {
                detail.get('isAdmin') &&
                <Link className="navbar-item"
                  to="/adminpanel"
                >
                  Admin
                </Link>
              }
              <hr className="navbar-divider" />
              <a className="navbar-item"
                onClick={ev => {
                ev.preventDefault();
                this.onLogout();
              }}>
                Log out
              </a>
            </div>
          </div>
        }
        
        <Link to="/popular" className={`navbar-item ${url === '/popular' ? style.selected : ''}`}>
          Popular
        </Link>
        <Link to="/latest" className={`navbar-item ${['/', '/latest'].includes(url) ? style.selected : ''}`}>
          Latest
        </Link>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            More
          </a>
  
          <div className="navbar-dropdown">
            <a className="navbar-item" href="//www.javascript.fun/about">
              About
            </a>
            <a className="navbar-item" href="//www.colorpk.com" target="_blank">
              ColorPK v2.0
            </a>
            <hr className="navbar-divider" />
            <a className="navbar-item" href="//github.com/im6/vp/issues" target="_blank">
              Report an issue
            </a>
          </div>
        </div>
      </div>
  
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/new" className="button is-small is-primary">
              New Color
            </Link>
            &nbsp;&nbsp;
            {
              !isAuth && authReady &&
              <a className="button is-small is-info" onClick={this.onFBClick}>
                Facebook Login
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  </nav>)
  }
}

export default Header;