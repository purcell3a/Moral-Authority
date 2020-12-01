"use strict";

function Shop(){

    const [productCards, setProductCard] = React.useState([{}])
    const [selectedDepartment, setselectedDepartment] = React.useState('');
    const [departments, setDepartments] = React.useState({deps:[]});
    const [certs, setCerts] = React.useState([]);
    const [selectedCerts, setSelectedCerts] = React.useState( new Set());
    const history = useHistory()
    const certsForFilter = Array.from(selectedCerts)
    const userFromStorage = JSON.parse(localStorage.getItem('user'));

    function get_all_products(){
      fetch('/app/return-products')
      .then(response => response.json())
      .then(data => setProductCard(data));
    }


    React.useEffect(() =>{
      console.log('****************** useEffect is running')
      get_all_products();
    },[]);
    console.log(selectedCerts)


    React.useEffect(() => {
      fetch('/app/list-departments')
      .then((response) => {
          return response.json();
        })
      .then(data => {
          let departmentlist = data.map(dep =>{
            return {value:dep, display:dep}
          });
          setDepartments({
          deps: [{value: '', display: '(Select a Department)'}].concat(departmentlist)
        });
      }).catch(error => {
        console.log(error);
      });
  },[]);

  React.useEffect(() => {
    fetch('/app/return-certs')
      .then(response => response.json())
      .then(data => setCerts(data));
      },[]);

    // when the product is clicked on - set that product id to state and send it with redirect
    function handleMoreInfoClick(productId){
      history.push({pathname:`/app/product-page/${productId}`});
    };

    function handleDepartmentSelect(evt){
      setselectedDepartment(evt.target.value)
    }

    function HandleFavoriteClick(productId){
      console.log('productId=',productId,'user_id',userFromStorage.id)
      let data = {product_id:productId,user_id:userFromStorage.id}
      fetch('/app/add-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => get_all_products());
    }
    // TODO  REQUEST LIST OF FAVORITE PRODUCTS WITH HANDLE FAVORITE CLICK

    function generateProductCards(){
      const cards = productCards.map((product,index) =>(
        <Card key={index} value={product.product_id}>
          <Card.Img variant="top"  src={product.img_id}/>
          {console.log(product.img_id)}
          <Card.Body>
              <Card.Title>{product.title} <i className="fa fa-heart" onClick={() => HandleFavoriteClick(product.product_id)}></i></Card.Title> 
              <small>{product.company}</small>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Button className="more-info-button" variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
          </Card.Body>
        </Card>
        ))
        return cards
    }

  //   const makePlantRows = (plantsArr) => {
  //     let rows = [];
  //     for(let i = 0; i < plantsArr.length; i=i+3) {
  //         rows.push(
  //             <Row>
  //                 <Col sm={1}></Col>
  //                 <Col sm={3}>
  //                 {plantsArr[i]}
  //                 </Col>
  //                 <Col sm={4}>
  //                 {plantsArr[i+1]}
  //                 </Col>
  //                 <Col sm={3}>
  //                 {plantsArr[i+2]}
  //                 </Col>
  //                 <Col sm={1}></Col>
  //             </Row>
  //         );
  //     }
  //     return rows
  // }




    function generateDepartments(){
      const depoptions = departments.deps.map((dep, index) => (
        <option key={index} value={dep.value}>
          {dep.display}
        </option>
      ))
      return ( <select className='sidenav-department' name="departments"onChange={handleDepartmentSelect} value={selectedDepartment}>
                {depoptions}
              </select>)
    }


    function toggleCertFilter(cert) {
      // new set is new set + existing selections
      const newSet = new Set(selectedCerts);
      //  if selection already present delete it from add
      if (selectedCerts.has(cert)) {
        newSet.delete(cert);
        setSelectedCerts(newSet);
      // else add new cert and set selected certs to new set
      } else {
        newSet.add(cert);
        setSelectedCerts(newSet);
      }
    }

    function generateCertifications(){
      const certOptions = certs.map((cert,index) => (
        <Form.Check label={cert}
                    key={index}
                    value={cert}
                    onClick={() => toggleCertFilter(cert)}/>

      ))
      return certOptions
    }

    function handleSubmit(evt){
      evt.preventDefault()
      console.log('selectedDepartment', selectedDepartment, 'selectedCerts:', certsForFilter)
        let data = {selectedDepartment:selectedDepartment,selectedCerts:certsForFilter}
        fetch('/app/filter-products',{method: "POST",  body: JSON.stringify(data),  headers: {
              'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => setProductCard(data))
      }

    return (
      <React.Fragment>

        <Container  className="page-container">
          <Row>


            <Col xs={6} md={3}>
              <Form onSubmit={handleSubmit} id="sidenav">
                <Nav defaultActiveKey='/app/product-search' className="flex-column">

                    <Form.Group>
                        {generateDepartments()}
                    </Form.Group>

                    <Form.Group className='sidenav-certs'>
                    {generateCertifications()}
                    </Form.Group>

                  </Nav>
                  <Button className="sidenav-search-button" type='submit'>Search</Button>
              </Form>
            </Col>

            {/* <AutoResponsive ref="container"> */}
            {/* {generateProductCards()} */}
          {/* </AutoResponsive> */}
            <Col xs={12} md={9}>{generateProductCards()}</Col>
          </Row>

          <Row>
          </Row>
        </Container>

      </React.Fragment>
    );
}
