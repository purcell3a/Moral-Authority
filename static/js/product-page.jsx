function ProductPage() {


    let { productId } = useParams();
    const[productInfo, setProductInfo] = React.useState({})

    React.useEffect(() =>{
        let data = {productId}
        fetch('/api/product-info', 
        {method:"POST", body: JSON.stringify(data),headers: { 'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setProductInfo(data));
    }, []);


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
                        <h4><small><a href={productInfo.url}>purchase</a></small></h4>
                        <h5><small>{productInfo.description}</small></h5>
                        </div>
                </Col>

            </Row>
        </Container>

      </React.Fragment>
    );

}