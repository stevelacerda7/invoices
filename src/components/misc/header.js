import React from 'react';

const Header = (props) => {
  return (
    <h2 className={(props.classes ? props.classes : "") + " small-pad"}>{ props.title }</h2>
  )
}

export default Header;
