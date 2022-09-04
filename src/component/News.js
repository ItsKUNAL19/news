import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes  from 'prop-types';

export class News extends Component {
static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
}

static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
}
    
    constructor()
        {
            super();
            this.state = {
                articles : [],
                loading : false,
                page : 1
            }
        }

    async componentDidMount()
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d86baefd54d4a23b431f6e532211b4e&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles :parsedData.articles, 
            totalResults : parsedData.totalResults,
            loading :false
        })
    }

    handlePreviousClick = async()=>
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category} &category=${this.props.category}&apiKey=6d86baefd54d4a23b431f6e532211b4e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page : this.state.page-1 ,
            articles :parsedData.articles,
            loading:false
        })
    }

    handleNextClick = async()=>
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d86baefd54d4a23b431f6e532211b4e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
        {
        let data = await fetch(url);
        this.setState({loading:true});
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page : this.state.page+1 ,
            articles :parsedData.articles,
            loading :false
        })}
    }

  render() {
    return (
      <div className="container my-3">
      <h2 className="text-center" style={{margin:'4%'}}>MD NEWS</h2>
        {this.state.loading&&<Spinner/>}
      <div className="row">
      {!(this.state.loading)&& this.state.articles && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url} >
          <NewsItem title={element.title?element.title:""} description ={element.description?element.description:""} imageurl ={element.urlToImage} newsUrl = {element.url} /> 
          </div>  
      })}
         
      </div>
      <div className="containerr d-flex justify-content-between my-5">
            <button disabled = {this.state.page<=1} type="button" class="btn btn-dark" onClick = {this.handlePreviousClick}> &larr; previous</button>
            <button type="button" class="btn btn-dark" onClick = {this.handleNextClick}>next &rarr;</button>
      </div>
      </div>
      
    )
  }
}

export default News