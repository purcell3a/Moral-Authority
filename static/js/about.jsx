

function About(){

    return (

        <React.Fragment>

            <Row className='aboutme-page-container'>

                <Card style={{ width: '18rem' }} className="about-profile-card">

                    <div className="background-block">
                        <Card.Img src='static/img/ficus.png' alt="profile-sample1" className="background"/>
                    </div>

                    <div className="profile-thumb-block">
                        <Image src='static/img/about.jpeg' alt="profile-image" className="profile"></Image>
                    </div>

                    <Card.Title className="card-content">
                        <h2>Angela Purcell</h2>
                        <small>Software Developer</small>
                        <Button id="profile-photo-upload-button" href='https://www.linkedin.com/in/purcell3a/'><small>Linked In</small></Button>
                    </Card.Title>

                </Card>

                <Card.Text id='aboutmetext'>
                    <p>This project is dedicated to the disparity of our most valuable resource, Time.</p> 

                    <p>With lower income individuals and minorities being the most affected and least equiped to participate in
                        decisions made by corporations and politicians the need for better resources is clear.</p>

                    <p>We have seen statistically in our most recent elections that the people of our country are active, engaged
                        and motivated. Yet not everyone has the time or resources to influence the corporate world they way we do so
                        every four years with our vote.</p>

                    <p>I built Moral Authority as a public resource, for individuals to easily find companies and products which match their
                        values. As Moral Authority grows I see it becoming a source of trusted information empowering individuals to have impact with their
                        purchases.</p>

                    <p> After All, Every Dollar Is A Vote.</p>

                </Card.Text>

            </Row>
        </React.Fragment>
    )
}