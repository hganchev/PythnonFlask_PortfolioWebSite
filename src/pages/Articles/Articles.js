import React, { useState, Component, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import articleData from '../../utils/articlesData';

function Articles() {
  const [label, setLabel] = useState('All');
  const [articles, setArticles] = useState(articleData.articles);
  const [articleTime, setArticleTime] = React.useState('0');

  // filter articles based on the label and update the articles state
  useEffect(() => {
    if(label === 'All'){
      setArticles(articleData.articles);
    } else {
      const filteredArticles = articleData.articles.filter(article => article.label === label);
      setArticles(filteredArticles);
    }
  }, [label]);

  return (
    <div className='articles'>
      <div className='section_title al_center'>
        <span></span>
        <h1 className='section_title_text s_40'> Articles </h1>
      </div>
      {/* add dropdown menu and attach action when selection change*/}
      <div className="dropdown">
        <select className='select' onChange={(e) => setLabel(e.target.value)}>
          <option value='All'>All</option>
          <option value='TwinCAT'>TwinCAT</option>
          <option value='Technology'>Technology</option>
        </select>
      </div>
      <div class="grid">
      {/* map the articles and display them in the grid*/}
      {articles.map((article) => (   
        // calculate article read time
        fetch(article.url)
        .then((res) => res.text())
        .then((text) => setArticleTime(7)),
        // .then((text) => setArticleTime(Math.ceil(text.split(' ').length / 220.0))),

        <div class="item">
          <Link to={`/articleview/${article.id}`} class="link-h5">
            <h5>{article.name}</h5>
          </Link>
          <p> {article.date}</p>
          <div className='div-label'>
            <LocalOfferIcon className='label-icon'/>
            <label>{article.label}</label>   
          </div>
          <p>{articleTime} min read</p>
          <Link to={`/articleview/${article.id}`}>
            <img src={article.img}/>      
          </Link>
        </div>
      ))}
      </div>  
    </div>
  );
}

export default Articles;
