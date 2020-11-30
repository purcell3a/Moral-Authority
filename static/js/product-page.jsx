function ProductPage() {


    let { productId } = useParams();
    const[productInfo, setProductInfo] = React.useState({})
    let data = {productId}
    // when the page load
    React.useEffect(() =>{
        // send product title and description to server
        fetch('/app/product-info', {method:"POST", body: JSON.stringify(data),headers: {
            'Content-Type': 'application/json'}})
        //  take the rest of the product data returned and add to state
        .then(response => response.json())
        .then(data => setProductInfo(data));
    }, []);
    console.log ('productinfo:', productInfo);

    return (
    <React.Fragment>
        <Container className="page-container">
            <Row>
                <Col>
                    <Image className="productpageimage" src={productInfo.img_id} rounded />
                </Col>
                <Col>
                    <div className="productpageinfo">
                    <h3>{productInfo.title}</h3>
                    <h3><small>{productInfo.company}</small></h3>
                    <h4><small>{productInfo.url}</small></h4>
                    <h5><small>{productInfo.description}</small></h5>
                    </div>
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    );

}