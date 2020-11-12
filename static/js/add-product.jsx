// *******************************************************************
  "use strict";

  function AddProduct() {

    const [productName, setProductName] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [productUrl, setProductUrl] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [img, setImg] = React.useState('')
    const [bcorp, setBcorp] = React.useState([]);
    // const [selectedBCorp, setSelectedBCorp] = useState("");

    React.useEffect(() => {
    fetch('/list-bcorps')
      .then(response => response.json())
      .then(data => setBcorp(data));
  }, []);

      //   <select
      //   name="Bcorps"
      //   onChange={e => handleBCorpSelect(e)}
      //   value={selectedBCorp}
      // >
      //   <option value="">Select the BCorp</option>
      //   {countryList.map((country, key) => (
      //     <option key={key} value={country.name}>
      //       {country.name}
      //     </option>
      //   ))}
      // </select>
    function handleSubmit(evt){
      evt.preventDefault()
      console.log('productpage')

    let data = {productName:productName, company:company, productUrl:productUrl, description:description, img:img}
    fetch('/add-product',{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}} )
    .then(response => response.json())
    .then(data => console.log(data));
    }

    function handleProductNameChange(evt){
      setProductName(evt.target.value)


    }

    function handleCompanyChange(evt){
      setCompany(evt.target.value)


    }

    function handleProductUrlChange(evt){
      setProductUrl(evt.target.value)
    }

    function handleDescriptionChange(evt){
      setDescription(evt.target.value)
    }

    function handleImgChange(evt){
      setImg(evt.target.value)
    }

      return (
        <React.Fragment>
          <Container>
            <Row>
              <Col>1 of 2</Col>
              <Col>
              <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                  <input type="text" name="product-name" className="form-control"  placeholder= "product name" value={productName} onChange={handleProductNameChange}></input>
                              </div>
                              <div className="form-group">
                                <input type="text" name="product-company" className="form-control" placeholder= "company" value={company} onChange={handleCompanyChange}></input>
                              </div>
                              <div className="form-group">
                                  <input type="text" name="product-url" className="form-control" placeholder= "product url" value={productUrl} onChange={handleProductUrlChange}></input>
                              </div>
                              <div className="form-group">
                                <label>BCorp Certified?:</label>
                                {/* some kind of for statement here for bcorp generating */}
                                {/* <select className="form-control" id="sel1">*/}
                                  <option>Choose:</option>
                                  <option>{bcorp}</option>
                              </div>

                              <div className="col-lg-12 loginbttm">
                                  <div className="col-lg-6 login-btm login-text">
                                  </div>
                                  <div className="col-lg-6 login-btm login-button">
                                      <button type="submit" className="btn btn-outline-primary">Submit for Review</button>
                                  </div>
                              </div>
                          </form>
                          </Col>
            </Row>
            <Row>
              <Col>
          <label>Product Notes</label>
          <textarea className="form-control" rows="5" id="comment" value={description} onChange={handleDescriptionChange}></textarea>
          <div className="file-uploader">
            <input type="file" value={img} onChange={handleImgChange}></input>
          </div>
          <div className="form-group">
            <input type="text" placeholder= "img url"  value={img} onChange={handleImgChange}></input>
          </div>
              </Col>
              <Col>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup.Prepend>
                  <FormControl placeholder="placeholder" aria-label="Text input with checkbox" />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Radio aria-label="Radio button for following text input" />
                  </InputGroup.Prepend>
                  <FormControl placeholder="placeholder" aria-label="Text input with radio button" />
                </InputGroup>
              </Col>
            </Row>
          </Container>

    </React.Fragment>
  );
}




