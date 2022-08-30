import React, { Component } from 'react'

export class NewsItem extends Component {
    
    
    render() {
        let {title,description,imageurl,newsUrl } = this.props;
        return (
            <div>
                <div className ="card" >
                    <img src={!imageurl?"https://images.livemint.com/img/2022/07/25/600x338/Unemployment-Benefits-0_1657803505355_1657803505355_1658726522782_1658726522782.jpg":imageurl} class="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">{title}...</h5>
                    <p className ="card-text">{description}...</p>
                    <a href={newsUrl} target= "blank" className = "btn btn-primary btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem