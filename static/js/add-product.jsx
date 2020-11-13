// *******************************************************************
  "use strict";

  function AddProduct() {

    const [productName, setProductName] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [productUrl, setProductUrl] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [img, setImg] = React.useState('')
    const [bcorps, setBcorps] = React.useState({corps:[]});
    const [selectedBCorp, setSelectedBcorp] = React.useState("");


    function handleSubmit(evt){
      evt.preventDefault()
      console.log(productName, company,productUrl,description,img,selectedBCorp)
      let data = {productName:productName, company:company, productUrl:productUrl, description:description, img:img, selectedBCorp:selectedBCorp }
      fetch('/add-product',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => console.log(data));
    }


    React.useEffect(() => {
        fetch('/list-bcorps')
        .then((response) => {
            return response.json();
          })
        .then(data => {
            let bcorplist = data.map(corp =>{
              return {value:corp, display:corp}
            });
            setBcorps({
            corps: [{value: '', display: '(Select your bcorp)'}].concat(bcorplist)
          });
        }).catch(error => {
          console.log(error);
        });
    },[]);


    function generateOptions(){
      const options = bcorps.corps.map((corp, index) => (
        <option key={index} value={corp.value}>
          {corp.display}
        </option>
      ))
      return options
    }


    function handleBcorpSelect(evt){
      setSelectedBcorp(evt.target.value)
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

                                <select name="BCorps"onChange={handleBcorpSelect} value={selectedBCorp}>
                                {generateOptions()}
                                </select>
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
              </Col>
            </Row>
          </Container>

    </React.Fragment>
  );
}