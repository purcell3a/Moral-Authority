"use strict";

function Shop(){

    const [productCards, setProductCard] = React.useState([{}])
    const [selectedDepartment, setselectedDepartment] = React.useState('');
    const [departments, setDepartments] = React.useState({deps:[]});


    // const [selectedBrands, setSelectedBrands] = useState(new Set());
    // const [products, setProducts] = useState(allProducts);
    const history = useHistory()


    React.useEffect(() =>{
      console.log('****************** useEffect is running')
      fetch('/return-products')
      .then(response => response.json())
      .then(data => setProductCard(data));
    },[]);
    console.log('productcards:',productCards);


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

    // when the product is clicked on - set that product id to state and send it with redirect
    function handleClick(productId){
      history.push({pathname:`/product-page/${productId}`});
    };

    function handleDepartmentSelect(evt){
      setselectedDepartment(evt.target.value)
    }


    function generateProductCards(){
      const cards = productCards.map((product,index) =>(
        <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
          <Card.Img variant="top"  src="https://www.pcmedicalllc.com/images/ecommerce/no-img-med.jpg" />
          <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Button variant="primary" onClick={() => handleClick(product.product_id)}>Go somewhere</Button>
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

    // function handleSubmit(evt){
    //   evt.preventDefault()
    //     let data = {category:selectedCategory,Bcorp:certBcorp,category:certEWG,category:selectedCategory,category:selectedCategory}
    //     fetch('/signup',{method: "POST",  body: JSON.stringify(data),  headers: {
    //           'Content-Type': 'application/json'}} )
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //   }

    return (
      <React.Fragment>

        <Container>
          <Row>


            <Col xs={6} md={4}>
              <Form>
                <Nav defaultActiveKey="/product-search" className="flex-column">


                    <Form.Group>
                      <select name="departments"onChange={handleDepartmentSelect} value={selectedDepartment}>
                        {generateDepartments()}
                      </select>
                    </Form.Group>

                      {/* #we can map this given categories in db */}
                    {/* <Form.Group>
                    <Form.Check label="Bcorp" onSelect={handleBcorpSelect} value={certBcorp}/>
                    <Form.Check label="EWG" onSelect={handleEWGSelect} value={certEWG}/>
                    <Form.Check label="FairTrade" onSelect={handleFairTradeSelect} value={certFairtrade}/>
                    <Form.Check label="LeapingBunny" onSelect={handleLeapingBunnySelect} value={certLeapingBunny}/>
                    </Form.Group> */}

                    <Form.Group>
                      <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Form.Group>
                  </Nav>
                  <Button type='submit'>Search</Button>
              </Form>
            </Col>


            <Col xs={12} md={8}>{generateProductCards()}</Col>
          </Row>
        </Container>

      </React.Fragment>
    );
}


//   // Whenever brand filter changes update the products list
//   useEffect(() => {
//     if (firstTime.current) {
//       firstTime.current = false;
//     } else {
//       if (selectedBrands.size === 0) {
//         setProducts(allProducts);
//         return;
//       } else {
//         const updatedProducts = allProducts.filter(product =>
//           selectedBrands.has(product.brand)
//         );
//         setProducts(updatedProducts);
//       }
//     }
//   }, [selectedBrands]);

//   function toggleBrandFilter(brand) {
//     const newSet = new Set(selectedBrands);
//     if (selectedBrands.has(brand)) {
//       newSet.delete(brand);
//       setSelectedBrands(newSet);
//     } else {
//       newSet.add(brand);
//       setSelectedBrands(newSet);
//     }
//   }
//   return (
//     <div className="App">
//       <p>Please select a brand</p>

//       <section className="filters">
//         {availableBrands.map(brand => (
//           <Filter
//             brandName={brand}
//             key={brand}
//             handleClick={() => toggleBrandFilter(brand)}
//             selectedBrands={selectedBrands}
//           />
//         ))}
//       </section>
//       <section className="products">
//         {products.map(product => (
//           <Product product={product} key={product.name} />
//         ))}
//       </section>
//     </div>
//   );
// }
