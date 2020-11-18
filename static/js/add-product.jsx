// *******************************************************************
  "use strict";

  function AddProduct() {

    const [productName, setProductName] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [productUrl, setProductUrl] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [img, setImg] = React.useState('')
    const [bcorps, setBcorps] = React.useState({corps:[]});
    const [selectedBCorp, setSelectedBcorp] = React.useState('');
    const [departments, setDepartments] = React.useState({deps:[]});
    const [selectedDepartment, setselectedDepartment] = React.useState('');
    const [certs, setCerts] = React.useState([]);
    const [selectedCerts, setSelectedCerts] = React.useState( new Set());
    const certsForFilter = Array.from(selectedCerts)


    function handleSubmit(evt){
      evt.preventDefault()
      console.log(productName, company,productUrl,description,img,selectedBCorp,'selecteddepartment=',selectedDepartment,'selectedCerts:', certsForFilter)
      let data = {productName:productName, company:company, productUrl:productUrl, description:description, img:img, selectedBCorp:selectedBCorp,category:selectedDepartment, selectedCerts:certsForFilter }
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

    function generateOptions(){
      const options = bcorps.corps.map((corp, index) => (
        <option key={index} value={corp.value}>
          {corp.display}
        </option>
      ))
      return options
    }

    function generateDepartments(){
      const depoptions = departments.deps.map((dep, index) => (
        <option key={index} value={dep.value}>
          {dep.display}
        </option>
      ))
      return depoptions
    }

    function handleDepartmentSelect(evt){
      setselectedDepartment(evt.target.value)
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

                  <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                        <label>Product Notes</label>
                        <textarea className="form-control" rows="5" id="comment" value={description} onChange={handleDescriptionChange}></textarea>
                        <div className="form-group">
                        <input type="text" placeholder= "img url"  value={img} onChange={handleImgChange}></input>
                        </div>
                        </Col>
                        <Col>
                            <Form.Group>
                                <input type="text" name="product-name" className="form-control"  placeholder= "product name" value={productName} onChange={handleProductNameChange}></input>
                            </Form.Group>

                            <Form.Group>
                                <input type="text" name="product-company" className="form-control" placeholder= "company" value={company} onChange={handleCompanyChange}></input>
                            </Form.Group>

                            <Form.Group>
                                <input type="text" name="product-url" className="form-control" placeholder= "product url" value={productUrl} onChange={handleProductUrlChange}></input>
                            </Form.Group>

                            <Form.Group>
                            <select name="departments"onChange={handleDepartmentSelect} value={selectedDepartment}>
                                {generateDepartments()}
                                </select>
                            </Form.Group>

                            <Form.Group>
                                <select name="BCorps"onChange={handleBcorpSelect} value={selectedBCorp}>
                                        {generateOptions()}
                                </select>
                            </Form.Group>

                            <Form.Group>
                            {generateCertifications()}
                            </Form.Group>

                            <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                            </InputGroup.Prepend>
                            <FormControl placeholder="placeholder" aria-label="Text input with checkbox" />
                            </InputGroup>

                              <Button type="submit">Submit for Review</Button>
                          </Col>
                    </Form.Row>

                    <Form.Row>row 2</Form.Row>
                  </Form>

          </Container>

    </React.Fragment>
  );
}