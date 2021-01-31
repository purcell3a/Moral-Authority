

function DepartmentNav(){

    const history = useHistory()
    const [departments, setDepartments] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/list-departments')
        .then(response => response.json())
        .then(data => setDepartments(data))
        .catch(error => {
          console.log(error);
        });
      },[]);


    function handleDepartmentSelect(dep){
        history.push({pathname:`/shop/${dep}`});
        console.log('push to',dep)
    };

    function generateDepartments(){
        const depoptions = departments.map((dep,index) => (

            <Nav.Item key={index}>
                <Nav.Link
                        key={index}
                        value={dep}
                        onClick={() => handleDepartmentSelect(dep)}>
                        {dep}
                </Nav.Link>
            </Nav.Item>

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