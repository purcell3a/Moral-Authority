function ProductPage() {


    let { productId } = useParams();
    const[productInfo, setProductInfo] = React.useState({})
    let data = {productId}
    // when the page load
    React.useEffect(() =>{
        // send product title and description to server
        fetch('/product-info', {method:"POST", body: JSON.stringify(data),headers: {
            'Content-Type': 'application/json'}})
        //  take the rest of the product data returned and add to state
        .then(response => response.json())
        .then(data => setProductInfo(data));
    }, []);
    console.log ('productinfo:', productInfo);

    return (
    <React.Fragment>
        <Container>
            <Row>
                <Col>
                    <Image src={productInfo.img_id} rounded />
                </Col>
                <Col>
                <div>{productInfo.title}</div>
                <div>{productInfo.company}</div>
                <div>{productInfo.url}</div>
                <div>{productInfo.url}</div>
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    );

}