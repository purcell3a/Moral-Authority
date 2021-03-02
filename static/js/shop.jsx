"use strict";

function Shop(props){

    // let { dep } = useParams();
    let {cat} = useParams();
    const [productCards, setProductCards] = React.useState([])
    const [certs, setCerts] = React.useState([]);
    const [selectedCerts, setSelectedCerts] = React.useState( new Set());
    const history = useHistory()
    const certsForFilter = Array.from(selectedCerts)

    React.useEffect(() =>{
      get_all_products();
    },[cat]);


    React.useEffect(() => {
      fetch('/api/return-certs')
      .then(response => response.json())
      .then(data => setCerts(data));
    },[]);


    // ==================================== IN PROGRESS ===========================================

    let active = 2;
    let items = [];

    function paginationBasic(){
      for (let number = 1; number <= 5; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>
        )};
      return items
    }


    function usePagination(data, itemsPerPage) {
      const [currentPage, setCurrentPage] = useState(1);
      const maxPage = Math.ceil(data.length / itemsPerPage);
    }

    function currentData() {
      const begin = (currentPage - 1) * itemsPerPage;
      const end = begin + itemsPerPage;
      return data.slice(begin, end);
    }

    function next() {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    function jump(page) {
      const pageNumber = Math.max(1, page)
      setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }

    // ==================================== IN PROGRESS ===========================================

    function get_all_products(){
      let user_id = props.user? props.user.id:'0'
      let data = {user_id,cat}
      fetch('/api/return-products',
      {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
      .then(data => {console.log('GET-ALL-PRODUCTS-IN-DEP',data)
      setProductCards(data)});

    }


    function handleFavoriteClick(productId){
      let user_id = props.user? props.user.id:alert('Please Log In To Favorite')
      let data = {'product_id':productId,'user_id':user_id}
      fetch('/api/toggle-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => {console.log(data)
        get_all_products()});
    }


    function generateProductCards(){
      const cards = productCards.map((product,index) =>(

          <Card key={product.product_id.toString() + product.product_favorite} value={product.product_id}>

            <Card.Img variant="top"  src={product.img_id}/>

            <Card.Body>

                <Card.Title>
                    <i className={product.product_favorite === 'True'?  "red fa-heart" : "white fa-heart"} onClick={() => handleFavoriteClick(product.product_id)}></i>
                    <div className='truncate-description'>{product.title}</div>
                </Card.Title>

                <small>{product.company}</small>

                  <Card.Text className='truncate-description'>
                    {product.description}
                  </Card.Text>

                <Button className="more-info-button"
                        variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>
                        More Info
                </Button>

            </Card.Body>

          </Card>

        ))
        return cards
    }


    function toggleCertFilter(cert) {
      const newSet = new Set(selectedCerts);
      if (selectedCerts.has(cert)) {
        newSet.delete(cert);
        setSelectedCerts(newSet);
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
        let data = {dep,selectedCerts:certsForFilter}
        fetch('/api/filter-products',
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => setProductCards(data))
      }

    return (
      <React.Fragment>

            <Row id='pagination-row'>
            {paginationBasic()}
            </Row>

          <Row className="product-row">

            <Col xs={6} md={3}>

                <Form onSubmit={handleSubmit} id="sidenav">
                    <Nav defaultActiveKey='/product-search' className="flex-column">

                    <Form.Group className='sidenav-certs'>
                    {generateCertifications()}
                    </Form.Group>

                    </Nav>

                  <Button className="sidenav-search-button"
                          type='submit'>
                          Search
                  </Button>

                </Form>

            </Col>

            <Col xs={12} md={9}>
              {generateProductCards()}
            </Col>

        </Row>

      </React.Fragment>
    );
}
