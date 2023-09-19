import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './header';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function App() {
  const [curPage, setCurPage] = useState(0);
  const data = window.data;

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      const curPage = hash ? parseInt(hash) : 0
      if(!isNaN(curPage)) {
        setCurPage(curPage)
      }
    })
  }, [])

  const onClickImg = useCallback((slide, e) => {
    window.location.hash = `#${e.index + 1}`
  })

  let content = null
  if (curPage === 0) {
    content = <div className="home">
      <section className="section1">
        <div className="image-list">
          <Splide options={ {
                autoplay: true,
                interval: data.playInterval || 3000,
                rewind: true,
                type   : 'fade',
              } } onClick={onClickImg}>
            {
              data.tabs.map((item, i) => <SplideSlide key={i}>
                <div className="image-box">
                  <img src={`./image/${item.imageFile}`} alt=""/>
                  <div><a className="btn" href={`#${i + 1}`}>{item.buttonText}</a></div>
                </div>
              </SplideSlide>
              )
            }
          </Splide>
        </div>
      </section>
      <section class="section-2">
        <div class="intro">
          <header>Introduction</header>
          <p>
            {data.home.introduction}
          </p>
        </div>
        <div class="contact">
          <header>Contact</header>
          <p>
            email: <span>{data.home.contact.email}</span>
          </p>
        </div>
      </section>
    </div>
  } else {
    const detail = data.tabs[curPage - 1];
    content = <div className="detail">
      <header>{detail.title}</header>
      <section className="sec1">
        <img className="pic" src={`./image/${detail.imageFile}`} />
        <h3>{detail.section1.title}</h3>
        
        <p>{detail.section1.desc}</p>
      </section>
      
      <section className="sec2">
        <h3>{detail.section2.title}</h3>
        <p>{detail.section2.desc}</p>
      </section>

      <section className="sec3">
        <h3>{detail.section3.title}</h3>
        <p>{detail.section3.desc}</p>
      </section>

    </div>
  }

  return (
    <div className="App">
      <Header current={curPage} onChange={setCurPage} />
      <div className="main">{content}</div>
    </div>
  );
}

export default App;
