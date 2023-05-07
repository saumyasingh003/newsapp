import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News =(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  //document.title = `${capitalizeFirstLetter(props.category )}- NewsMonkey`;
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults ]= useState(0)
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };



    const updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae73592fe852474a8071f27322374897&pageSize=${props.pageSize}`;
    setLoading(true)//yaha setloading true hoga...url ke just baad...na ki fetch ke baad...ooh
    let data = await fetch(url);
    props.setProgress(30);
    // setState({ loading: true });
 
    let parsedData = await data.json();
    props.setProgress(50);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.TotalResults)
    setLoading(false)
   
    props.setProgress(100);//ye line function ke bahar tha
    }
  
  useEffect(() => {
    updateNews()
  },[])
  

//  const  handlePrevClick = async () => {
//  setPage(page-1)
//     updateNews();
//   };

  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // };
   const fetchMoreData = async () => {
    //  setPage=(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae73592fe852474a8071f27322374897&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    setLoading(true)
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
     };

    return (
    <>
          <h1 className="text-center" style={{ margin: "35px 0px",marginTop:'90px' }}>
            NewsMonkey-Top {capitalizeFirstLetter(props.category)}{" "}
            Headlines
          </h1>
          {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className="container">
            <div className="row">
              {articles.map((element) => {
              return(
                  <div className="col md-4" key={element.url}>
                    <Newsitem
                      title={element.title? element.title.slice(0,45):""}
                      description={element.description? element.description.slice(0,92):"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem nostrum deleniti"} 
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
        
      </>
    )
         }


News.defaultProps = {
  country: "in",
  pageSize: 15,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
