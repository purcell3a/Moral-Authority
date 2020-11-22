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


    React.useEffect(() =>{
      console.log('****************** useEffect is running')
      fetch('/return-products')
      .then(response => response.json())
      .then(data => setProductCard(data));
    },[]);
    console.log(selectedCerts)


    React.useEffect(() => {
      fetch('/list-departments')
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
    fetch('/return-certs')
      .then(response => response.json())
      .then(data => setCerts(data));
      },[]);

    // when the product is clicked on - set that product id to state and send it with redirect
    function handleMoreInfoClick(productId){
      history.push({pathname:`/product-page/${productId}`});
    };

    function handleDepartmentSelect(evt){
      setselectedDepartment(evt.target.value)
    }

    function HandleFavoriteClick(productId){
      console.log('productId=',productId,'user_id',userFromStorage.id)
      let data = {product_id:productId,user_id:userFromStorage.id}
      fetch('/add-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => console.log(data));
    }

    function generateProductCards(){
      const cards = productCards.map((product,index) =>(
        <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
          <Card.Img variant="top"  src="https://ak1.ostkcdn.com/images/products/is/images/direct/253a2005917bd95dc5e7d696323012f2aa5164b6/Team-Fortress-2-Balloonicorn-11%22-Plush-Doll.jpg" />
          <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Button variant="primary" onClick={() => HandleFavoriteClick(product.product_id)}>Favorite</Button>
              <Button variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
          </Card.Body>
        </Card>
        ))
        return cards
    }


    function generateDepartments(){
      const depoptions = departments.deps.map((dep, index) => (
        <option key={index} value={dep.value}>
          {dep.display}
        </option>
      ))
      return depoptions
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
        fetch('/filter-products',{method: "POST",  body: JSON.stringify(data),  headers: {
              'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => setProductCard(data))
      }

    return (
      <React.Fragment>

        <Container>
          <Row>


            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit} id="sidenav">
                <Nav defaultActiveKey="/product-search" className="flex-column">

                    <Form.Group>
                      <select name="departments"onChange={handleDepartmentSelect} value={selectedDepartment}>
                        {generateDepartments()}
                      </select>
                    </Form.Group>

                      {/* #we can map this given categories in db */}
                    <Form.Group>
                    {generateCertifications()}
                    </Form.Group>

                  </Nav>
                  <Button type='submit'>Search</Button>
              </Form>
            </Col>


            <Col xs={12} md={8}>{generateProductCards()}</Col>
          </Row>

          <Row>
          </Row>
        </Container>

      </React.Fragment>
    );
}
