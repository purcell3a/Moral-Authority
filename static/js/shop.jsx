"use strict";

function Shop(props){

    // * GENERATE CONTENT
    // let { dep } = useParams();
    let {cat} = useParams();
    const history = useHistory()
    const [companySearch, setCompanySearch] = React.useState([])
    const [productTypes, setProductTypes] = React.useState([])
    const [certs, setCerts] = React.useState([]);
    const [productCards, setProductCards] = React.useState([])

    // * FILTERING
    const [currentPage, setCurrentPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(5);
    const [selectedCerts, setSelectedCerts] = React.useState(new Set());
    const certsForFilter = Array.from(selectedCerts)

    // !IP
    const [selectedCompanies, setSelectedCompanies] = React.useState(new Set());
    const companiesForFilter = Array.from(selectedCompanies)

    const [selectedTypes, setSelectedTypes] = React.useState(new Set());
    const typesForFilter = Array.from(selectedTypes)

    let active = currentPage
    let items = [];

    React.useEffect(() =>{
      get_search_parameters()
      get_all_products();
      setCurrentPage(1)
    },[cat]);


    React.useEffect(() => {
      fetch('/api/return-certs')
      .then(response => response.json())
      .then(data => setCerts(data));
    },[]);


    // ==================================== IN PROGRESS START ===========================================

    function get_search_parameters(){
      let user_id = props.user? props.user.id:'0'
      let data = {user_id,cat}
      fetch('/api/return-search-parameters',
      {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
      .then(data => {
        setCompanySearch(data.companies)
        setProductTypes(data.types)
      });
    }

    function generateCompanies(){
      const companyOptions = companySearch.map((product,index) => (

        <Form.Check label={product}
                    key={index}
                    value={product}
                    onClick={() => toggleCompanyFilter(product)}/>
      ))
      return(
        <React.Fragment>
          <h6>Companies</h6>
          {companyOptions[10]}
        </React.Fragment>
      )
    }

    function generateProductType(){
      const productTypeList = productTypes.map((type,index) => (

        <Form.Check label={type}
                    key={index}
                    value={type}
                    onClick={() => toggleTypeFilter(type)}/>
      ))
      return(
        <React.Fragment>
          <h6>Product Type</h6>
          {productTypeList}
        </React.Fragment>
      )
    }

    // ==================================== IN PROGRESS END ===========================================
    function paginationBasic(){
      for (let number = 1; number <= maxPage; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active} onClick={() => jump(number)}>
            {number}
          </Pagination.Item>
        )};
      return (
        <React.Fragment>
          <Pagination.First onClick={() => jump(1)}/>
          <Pagination.Prev onClick={() => prev()}/>
            {items}
          <Pagination.Next onClick={() => next()}/>
          <Pagination.Last onClick={() => jump(maxPage)}/>
        </React.Fragment>
        )
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

    function handleMoreInfoClick(productId){
      history.push({pathname:`/product-page/${productId}`});
    };

    function get_all_products(){
      let user_id = props.user? props.user.id:'0'
      let data = {user_id,cat}
      fetch('/api/return-products',
      {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
      .then(data => {
        setMaxPage(Math.ceil(data.length / 25))
        setProductCards(data)
      });
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

      const begin = (currentPage - 1) * 25;
      const end = begin + 25;
      const dividedProducts = productCards.slice(begin, end)
      const cards = dividedProducts.map((product,index) =>(

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

    // !IP
    function toggleCompanyFilter(company) {
      const newSet = new Set(selectedCompanies);
      if (selectedCompanies.has(company)) {
        newSet.delete(cert);
        setSelectedCompanies(newSet);
      } else {
        newSet.add(cert);
        setSelectedCompanies(newSet);
      }
    }
    // !IP
    function toggleTypeFilter(type) {
      const newSet = new Set(selectedCerts);
      if (selectedCerts.has(type)) {
        newSet.delete(cert);
        setSelectedTypes(newSet);
      } else {
        newSet.add(cert);
        setSelectedTypes(newSet);
      }
    }

    function generateCertifications(){
      const certOptions = certs.map((cert,index) => (
        <Form.Check label={cert}
                    key={index}
                    value={cert}
                    onClick={() => toggleCertFilter(cert)}/>

      ))
      return(
        <React.Fragment>
          <h6>Product Certifications</h6>
          {certOptions}
        </React.Fragment>
      )
    }


    function handleSubmit(evt){
      evt.preventDefault()
        let data = {dep,selectedCerts:certsForFilter,selectedCompanies:companiesForFilter,selectedTypes:typesForFilter}
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

                  <DropdownButton className="sidenav-search-button" id="search-for" title="Search For">
                      <Dropdown.Item label={'Company'}
                                      value={'Company'}
                                      onClick={() => toggleCertFilter(value)}>
                                      Company
                      </Dropdown.Item>
                      <Dropdown.Item label={'Product'}
                                      value={'Product'}
                                      onClick={() => toggleCertFilter(value)}>
                                      Product
                      </Dropdown.Item>
                  </DropdownButton>

                    <Nav defaultActiveKey='/product-search' className="flex-column">

                    <Form.Group className='sidenav-certs'>
                    {generateProductType()}
                    {generateCertifications()}
                    {generateCompanies()}
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
