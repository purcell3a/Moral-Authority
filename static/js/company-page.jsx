function CompanyPage() {


    // let { companyId } = useParams();
    // const[companyInfo, setCompanyInfo] = React.useState({})

    // React.useEffect(() =>{
    //     let data = {companyId}
    //     fetch('/api/product-info',
    //     {method:"POST", body: JSON.stringify(data),headers: { 'Content-Type': 'application/json'}})
    //     .then(response => response.json())
    //     .then(data => setCompanyInfo(data));
    // }, []);


    return (
    <React.Fragment>

        <Container className="page-container">
            <Row>

                <Col>
                    {/* <Image className="productpageimage" src={companyInfo.img_id} rounded /> */}
                </Col>

                <Col>
                    <div className="productpageinfo">
                        {/* <h3>{companyInfo.title}</h3>
                        <h3><small>{companyInfo.company}</small></h3>
                        <h4><small><a href={companyInfo.url}>purchase</a></small></h4>
                        <h5><small>{companyInfo.description}</small></h5> */}
                        </div>
                </Col>

            </Row>
        </Container>

      </React.Fragment>
    );

}