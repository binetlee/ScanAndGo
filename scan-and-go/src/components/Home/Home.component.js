import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import HFapp from '../HFapp/HFapp.component';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import offer from './img/offer.png';
import sbotd from './img/sbotd.png';
import cabinet_mobile from './img/cabinet_mobile.webp';
import scan from './img/scan.png';
import recommendations from './img/recommendations.png';
import { validateCredential } from "../Security/Security.component";
import { GreyOutContext } from "../../context";

export function Home({ }) {
  useEffect(() => {

  }, []);
  const history = useHistory();

  const { showGreyOut, hideGreyOut } = useContext(GreyOutContext);

  const handleClick = () => {
    showGreyOut();
    validateCredential(() => {history.push("/scanandgo"); hideGreyOut();}).catch(() => hideGreyOut());
  }

  return (
    <>
      <HFapp />
      <div className="grid isBound">
        {/*Carousel*/}
        {/* <OwlCarousel className='owl-theme' loop autoplay margin={10} autoWidth dots nav={true}>
          <div class='item'>
            <img src={cabinet_mobile} />
          </div>
          <div class='item'>
            <img src="https://contentgrid.thdstatic.com/hdus/en_US/DTCCOMNEW/fetch/NexGen/ContentPage/20210805THDFOUNDATION.png" />
          </div>
          <div class='item'>
            <img src="https://contentgrid.thdstatic.com/hdus/en_US/DTCCOMNEW/fetch/NexGen/ContentPage/20210805Cleaning1.png" />
          </div>
        </OwlCarousel>; */}

        <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
          <img src={cabinet_mobile} style={{ width: '100%' }} />
        </div>

        <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
          <img src={sbotd} style={{ width: '100%' }} />
        </div>

        {/*Scan and Go*/}
        <div className="col__12-12 col__8-12--xs u--paddingNone-top  col__4-12--lg col__12-12--md col__6-12--sm">
          <div className="align-center">
            <img src={scan} className="responsive" />
          </div>
        </div>
        <div className="col__12-12">
              <button
                className="bttn--primary scan-btn"
                onClick={handleClick}>
                <span class="bttn__content bold">Start Scan &amp; Go</span>
              </button>
        </div>


      {/*Rest of the page*/}
      <div className="col__12-12">
      <img class="promotionalNav2__card__img" src="https://contentgrid.thdstatic.com/hdus/en_US/DTCCOMNEW/fetch/NexGen/ContentPage/20210812Decor.jpg" alt=" " className="fit-width"/>
        <img src={offer} className="fit-width"/>
        <img src={recommendations} className="recommendations"/>
      </div>
      
        
      <a id="Foundation" data-automation-id="covidBanner" href="https://corporate.homedepot.com/newsroom/covid-19-update-how-home-depot-preparing-and-responding"><img alt="covid banner" className="col__12-12" src="https://assets.thdstatic.com/personalized-homepage-ui/0.368.0/build/7a1dbef577b828b0c78c9f02b7481b22.jpg" /></a>
    </div>
    </>

  )
}

export default Home;