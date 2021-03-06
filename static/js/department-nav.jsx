

function DepartmentNav(){

    const history = useHistory()
    const [departments, setDepartments] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState(['subcategory','other']);

    React.useEffect(() => {
        fetch('/api/list-departments-subcategories')
        .then(response => response.json())
        .then(data => setDepartments(data))
        .catch(error => {
          console.log(error);
        });
      },[]);


    // function handleDepartmentSelect(dep){
    //     history.push({pathname:`/shop/${dep}`});
    //     console.log('push to',dep)
    // };

    function handleSubcategorySelect(cat){
      history.push({pathname:`/shop/${cat}`})
      console.log('push to',cat)
    }

    function generateDepartments(){
        const depoptions = Object.keys(departments).map((dep,index) => (

              <NavDropdown title={dep}
                          id="basic-nav-dropdown" 
                          key={index}
                          value={dep}>
                           {/* onClick={() => handleDepartmentSelect(dep)}> */}
                    {departments[dep].map((cat,index) => (
                    <NavDropdown.Item href="#action/3.1"
                                      key={index}
                                      value={cat}
                                      onClick={() => handleSubcategorySelect(cat)}>
                                      {cat}
                    </NavDropdown.Item>))}
              </NavDropdown>
        ))
        return depoptions
      }

    return (
        <React.Fragment>
            <Nav
            className="justify-content-center"
            activeKey="/home"
            id='department-nav'>

                {generateDepartments()}

            </Nav>

        </React.Fragment>
      );
}