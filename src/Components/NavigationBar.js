// import React from 'react';
// function NavigationBar() {
//   return (
//   );
// }
// export default ;

// import React from 'react';
// import Nav from 'react-bootstrap/Nav';

// class NavigationBar extends React.Component {
//   componentDidMount() {
//     const apiUrl = 'http://localhost:8000/movies/findall';
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//   render() {
//     return (
//       <Nav
//         activeKey="/home"
//         onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
//       >
//         <Nav.Item>
//           <Nav.Link href="/home">Home</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="link-1">Movies</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="link-2">Link</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="disabled" disabled>
//             Disabled
//           </Nav.Link>
//         </Nav.Item>
//       </Nav>
//     );
//   }
// }
// export default NavigationBar;

import Nav from 'react-bootstrap/Nav';
function NavigationBar() {
  
  return (
    <Nav
      activeKey="/"
    >
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" href="/">Movies</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Something</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default NavigationBar;
