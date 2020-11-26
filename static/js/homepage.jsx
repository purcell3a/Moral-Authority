// "use strict";

// *******************************************************************
function Homepage() {

  const [productCards, setProductCard] = React.useState([{}])
  const history = useHistory()


  React.useEffect(() =>{
    console.log('****************** useEffect is running')
    fetch('/app/recently-added')
    .then(response => response.json())
    .then(data => setProductCard(data));
  },[]);


  function generateProductCards(){
    const cards = productCards.map((product,index) =>(
      <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
        <Card.Img variant="top"  src={product.img_id} />
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Button variant="primary">Favorite</Button>
              <Button variant="primary" onClick={() => handleClick(product.product_id)}>More Info</Button>
        </Card.Body>
      </Card>
      ))
      return cards
  }

  function handleClick(productId){
    history.push({pathname:`/product-page/${productId}`});
  };






  // const url = 'https://www.instagram.com/graphql/query/?query_hash=d4d88dc1500312af6f937f7b804c68c3&variables={user_id:239369330125,include_chaining:false,include_reel:false,include_suggested_users:false,include_logged_out_extras:true,include_highlight_reels:true,include_live_status:true}';

  // const cache = {
  //   lastFetch: 0,
  //   posts:[],
  // };
  
  // async function getPosts(){
  //   const timeSinceLastFetch = Date.now() - caches.lastFetch;
  //   if (timeSinceLastFetch <= 1800000){
  //     return caches.posts;
  //   }
  //   const data = await fetch(url).then(res = res.json());
  //   cache.lastFetch = Date.now();
  //   cache.posts = data;
  //   return data;
  // }
  
  
  // function useInstagram(){
  //   const [posts, setPosts] = React.useState([]);
  //     React.useEffect(() => {
  //       fetch(url)
  //       .then (res => res.json())
  //       .then(data =>{ data.map(data, index)
  //         setPosts(data);
  //       })
  //     },[]);
  //     return posts;
  // }
  
  // function Instagram(){
  //   const gramz = useInstagram();
  //   return(
  //     <div>
  //       {gramz.map(gram => (
  //         <a href={gram.url} key={gram.id}>
  //         <img key={gram.id} src={gram.thumbnail} alt={gram.caption}/> </a>
  //       ))}
  //     </div>
  //   )
  // }

    return (
      <React.Fragment>

          <Image src='static/img/begoodyellow.png' fluid />

          <Container>

          <Row>
              <h2>Recently Added Products</h2>
          </Row>

          <Row>{generateProductCards()}</Row>

          {/* <Row>{Instagram()}</Row> */}

        </Container>
      </React.Fragment>
    );
  }

//   ReactDOM.render(<App />, document.getElementById('app'));
// ******************************************************************* */
