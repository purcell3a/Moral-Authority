// *******************************************************************
  "use strict";
  function AddProduct() {

    const [productName, setProductName] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [productUrl, setProductUrl] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [bcorps, setBcorps] = React.useState({corps:[]});
    const [selectedBCorp, setSelectedBcorp] = React.useState('');
    const [departments, setDepartments] = React.useState({deps:[]});
    const [selectedDepartment, setselectedDepartment] = React.useState('');
    const [certs, setCerts] = React.useState([]);
    const [selectedCerts, setSelectedCerts] = React.useState( new Set());
    const certsForFilter = Array.from(selectedCerts)
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    const history = useHistory()
    const [file, setSelectedFile] = React.useState(null)
    const myWidget = cloudinary.createUploadWidget({cloudName: 'purcella',upload_preset: 'ipialmwj',}, (error, result) => { if (result.event == "success") {
          setSelectedFile(result.info.url) // result.info contains data from upload
      } })

    function handleSubmit(evt){
      evt.preventDefault()
      console.log(productName, company,productUrl,description,selectedBCorp,'selecteddepartment=',selectedDepartment,'selectedCerts:', certsForFilter,'user_id',userFromStorage.id, 'file=',file)
      let data = {productName:productName, company:company, productUrl:productUrl, description:description, selectedBCorp:selectedBCorp,category:selectedDepartment, selectedCerts:certsForFilter,user_id:userFromStorage.id, img:file }
      fetch('/app/add-product',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => console.log(data));
      alert('Product Created!')
      history.push('/')
      // return (
        // <Alert variant='dark'>Product Created!</Alert>

      // )
    }


    React.useEffect(() => {
        fetch('/app/list-bcorps')
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
      fetch('/app/list-departments')
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
    fetch('/app/return-certs')
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
      if (selectedCerts.has("Bcorp")){
        const options = bcorps.corps.map((corp, index) => (
          <option key={index} value={corp.value}>
            {corp.display}
          </option>
        ))
        return(<select name="BCorps"onChange={handleBcorpSelect} value={selectedBCorp}>
              {options}
            </select>)
      }else{
        return []
      }
    }

    function generateDepartments(){
      const depoptions = departments.deps.map((dep, index) => (
        <option key={index} value={dep.value}>
          {dep.display}
        </option>
      ))
      return depoptions
    }

    // function handleFileChange(evt){
    //   setSelectedFile(evt.target.value)
    // }
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

      return (
        <React.Fragment>
          <Container>

                  <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>

                          <Form.Group>
                          <label>Product Notes</label>
                          <textarea required className="form-control" rows="5" id="comment" value={description} onChange={handleDescriptionChange}></textarea>
                          </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <input required type="text" name="product-name" className="form-control"  placeholder= "product name" value={productName} onChange={handleProductNameChange}></input>
                            </Form.Group>

                            <Form.Group>
                                <input required type="text" name="product-company" className="form-control" placeholder= "company" value={company} onChange={handleCompanyChange}></input>
                            </Form.Group>

                            <Form.Group>
                                <input required type="text" name="product-url" className="form-control" placeholder= "product url" value={productUrl} onChange={handleProductUrlChange}></input>
                            </Form.Group>

                            <Form.Group required>
                            <select required name="departments"onChange={handleDepartmentSelect} value={selectedDepartment}>
                                {generateDepartments()}
                                </select>
                            </Form.Group>

                            <Form.Group>
                            {generateCertifications()}
                            </Form.Group>

                            <Form.Group>
                                        {generateOptions()}
                            </Form.Group>

                            <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                            </InputGroup.Prepend>
                            <FormControl placeholder="placeholder" aria-label="Text input with checkbox" />
                            </InputGroup>

                              <Button type="submit">Submit for Review</Button>
                              {/* <Alert variant='dark'>Product Created!</Alert> */}
                          </Col>
                    </Form.Row>

                  </Form>
                  <Button id="upload_widget" className="cloudinary-button"  onClick={()=> {myWidget.open()}}>Upload files</Button>
          </Container>

    </React.Fragment>
  );
}