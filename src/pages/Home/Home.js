import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { connect } from '../../redux/blockchain/blockchainActions';
import { fetchData } from '../../redux/data/dataActions';

const Home = () => {
  const [numberOfNFTs, setNumberOfNFTs] = useState(1)
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);

  const mintNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your NFTs...");
    setClaimingNft(true);
    let cost = blockchain.web3.utils.fromWei(data.cost.toString());
    let lastBlock = blockchain.web3.eth.getBlock("latest");
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: lastBlock.gasLimit,
        to: "0xe6b19A6e54AAaef62F4a907Ffc387b8da34702FF",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((cost * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          `WOW, you got ${_amount} NFTs of 365SpaceProject. Go visit <a href="https://opensea.io/account" target="_blank">Opensea.io</a> to view it.`
        );
        setClaimingNft(false);
        setNumberOfNFTs(1);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const onChangeAmount = (event) => {
    setNumberOfNFTs(event.target.value)
  }

  const parseAccount = (address) => {
    let len = address.length;
    return address.substr(0, 6) + '...' + address.substr(len - 4, len);
  }

  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
          <div className="countdown text-center">
            {/* SOLD &nbsp;OUT &nbsp;IN &nbsp;17 &nbsp;MINUTES */}
          </div>
          <div className="row reverse-mobile">
            <div className="col-12 col-md-6 left-text-col">
              <h1 className="mb-4">
                Welcome to the<br />
                <span>365 Space Project</span>
              </h1>
              <div className="d-flex">
                <a href="#counts" className="btn-get-started scrollto">MINT</a>
              </div>
            </div>
            <div className="col-12 col-md-6 pos-relative">
              <img src="https://i.pinimg.com/originals/a0/26/1b/a0261b885cfba5a65c675c33327acf5a.png" alt="" className="spaceboy" />
              {/* <div className="gameboy">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 584 822" style={{ enableBackground: 'new 0 0 584 822' }} xmlSpace="preserve">
                  <path className="st0 btn-1" d="M150.3,540.2h-27c-0.4,0-0.8,0-1.1-0.1l0,33.3c0.4-0.1,0.8-0.1,1.1-0.1h27c4.5,0,8.2-2.8,8.2-6.3v-20.5C158.5,543,154.8,540.2,150.3,540.2z" />
                  <path className="st0 btn-2" d="M81.1,540.1c-0.4,0.1-0.8,0.1-1.1,0.1h-27c-4.5,0-8.2,2.8-8.2,6.3V567c0,3.5,3.7,6.3,8.2,6.3h27c0.4,0,0.8,0,1.1,0.1L81.1,540.1z" />
                  <g className="btn-3">
                    <g>
                      <ellipse transform="matrix(0.2298 -0.9732 0.9732 0.2298 -287.1071 775.2178)" className="st1" cx="346.2" cy="569" rx="30.2" ry="30.2" />
                    </g>
                    <g>
                      <ellipse className="st2" cx="346.2" cy="560.3" rx="21.5" ry="21.5" />
                    </g>
                    <g>
                      <g>
                        <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -292.6 398.7731)" className="st3" cx="335.1" cy="552.6" rx="8.1" ry="8.1" />
                      </g>
                      <g>
                        <path className="st3" d="M357.5,557.3c0,2.6-2.1,4.7-4.7,4.7c-2.6,0-4.7-2.1-4.7-4.7c0-2.6,2.1-4.7,4.7-4.7S357.5,554.7,357.5,557.3z" />
                      </g>
                    </g>
                  </g>
                  <g className="btn-4">
                    <g>
                      <circle className="st4" cx="425.3" cy="532.2" r="30.2" />
                    </g>
                    <g>
                      <ellipse className="st5" cx="425.3" cy="523.5" rx="21.5" ry="21.5" />
                    </g>
                    <g>
                      <g>
                        <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -243.432 443.8828)" className="st6" cx="414.1" cy="515.8" rx="8.1" ry="8.1" />
                      </g>
                      <g>
                        <path className="st6" d="M436.5,520.5c0,2.6-2.1,4.7-4.7,4.7c-2.6,0-4.7-2.1-4.7-4.7c0-2.6,2.1-4.7,4.7-4.7C434.4,515.8,436.5,517.9,436.5,520.5z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <img src="/assets/img/gameboy.svg" className="w-100 gameboy-bg" alt="" />
              <div className="inner-msg">
                <div className="click-text">Click&nbsp; buttons &nbsp;to &nbsp; scroll</div>
                <div className="button-row">
                  <img src="/assets/img/a-btn.svg" alt="" /><div className="text-row-btn">Scroll &nbsp; Right</div>
                </div>
                <div className="button-row">
                  <img src="/assets/img/b-btn.svg" alt="" /><div className="text-row-btn">Scroll &nbsp; Left</div>
                </div>
                <div className="button-row">
                  <img src="/assets/img/r-btn.svg" alt="" /><div className="text-row-btn">Scroll &nbsp; Right</div>
                </div>
                <div className="button-row">
                  <img src="/assets/img/l-btn.svg" alt="" /><div className="text-row-btn">Scroll &nbsp; Left</div>
                </div>
              </div>
              <div className="owl-carousel gameboy-carousel">
                <img src="/assets/img/gameboy/blue_skin_ethereum_icey_goggles_black_bowtie_tiffany_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/brown_head_burglar_hoodie_organge_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/blue_skin_goggles_headphones_cigarrette_red_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/brown_head_crown_green_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/brown_head_cyclopse_pink_hair_blunt_yellow_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/brown_head_hoodie_peach_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/rooster_crown_blue_sunglasses_tiffany_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/chicken_pilot_hat_pink_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/dracula_goggles_tiffany_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/frankenstein_batman_purple_background.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/purple_cyclopse.png" className="w-100 slide-gameboy" alt="" />
                <img src="/assets/img/gameboy/bane_hoodie_ethereum_green_background.png" className="w-100 slide-gameboy" alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="about" className="about section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h1><span>Our Goal</span></h1>
            </div>
            <div className="row">
              <div className="col-12 share-tech">
                <p>
                  In 1957 the Space Era Started. This was also around the same time period where an increased amount of pollution started to flood our world. Through the 365 Space Project, we intend to donate and sponsor different charities to help reduce air pollution. After the initial sellout, we pledge 10,000 trees and a portion of royalties to help various causes.
                </p>
                <p>
                  In total, there will be 5110 NFTs Minted in the 365 Space Projects. Each NFT will be a unique star constellation that is correlated to date, time, and continents around the world. Holding one of these NFTs will give you access to private community events, store discounts requested by our community, and an evolving full-scale project.
                </p>
                <p>
                  You can become a part of the 365 Space Project by minting an NFT at a cost of 0.1 ETH + Gas fee.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="counts" className="counts">
          <div className="container text-white">
            {
              (blockchain.account !== "" && blockchain.smartContract !== null) ?
                (<div className="container" >
                  <div className="section-title">
                    <h1><span>Total &nbsp;Minted</span></h1>
                  </div>
                  <div className="row mint-count">
                    <span data-toggle="counter-up" className="mintedAmount">{data.totalSupply}</span>/<span data-toggle="counter-up">{data.maxSupply ?? 5110}</span>
                  </div>
                  <div className="row text-center mt-4">
                    <div className="col-md-12">
                      <span id="status"><span className="bg-info p-2">Connected &nbsp; {parseAccount(blockchain.account)}</span></span>
                    </div>
                  </div>
                  {
                    (data.totalSupply === data.maxSupply) ?
                      (
                        <div className="row text-center mt-4 flex-center">
                          SOLD OUT
                        </div>
                      )
                      : (
                        <>
                          <div className="mt-4 text-center">
                            <span>Please use below slider to select the number of NFTs to mint.</span><br />
                            <span>1 SPACE = {blockchain.web3.utils.fromWei(data.cost.toString())} ETH</span>
                          </div>
                          <div className="row text-center" style={{ marginTop: 30 }}>
                            <div className="col-md-8 offset-md-2">
                              <div className="row">
                                <div className="col-2 text-right">
                                  <span>1</span>
                                </div>
                                <div className="col-8">
                                  <input type="range" className="range-slider" min="1" max={data.maxMintAmount ?? 20} value={numberOfNFTs} step="1" onChange={onChangeAmount} />
                                </div>
                                <div className="col-2 text-left">
                                  <span>{data.maxMintAmount ?? 20}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 mt-4" style={{ marginTop: 20 }}>
                              <button className="btn btn-get-started"
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  mintNFTs(numberOfNFTs);
                                  getData();
                                }}>
                                {claimingNft ? "MINTING IN PROCESS..." : `Mint ${numberOfNFTs} SPACE`}
                              </button>
                            </div>
                            <div className="col-md-12 text-warning mt-4" style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: feedback }}>
                            </div>
                          </div>
                        </>
                      )
                  }
                </div>
                )
                :
                (
                  <>
                    <div className="row text-center mt-5">
                      <div className="col-md-12">
                        <img id="metaicon" className="meta-gray" width="100" height="100" src="/assets/img/metamask.png" alt="" />
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }} className="row text-center">
                      <div className="col-md-12">
                        <button id="enableMetamask" className="btn btn-get-started"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(connect());
                            getData();
                          }}>
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <div className="text-danger" style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </div>
                      </>
                    ) : null}
                  </>
                )
            }
          </div>
        </section>
        <section id="roadmap" className="roadmap">
          <div className="section-title">
            <h1><span>Roadmap</span></h1>
          </div>
          <div className="container py-5">
            <div className="timeline share-tech">
              <div className="timeline-container primary">
                <div className="timeline-icon">
                  <i className="far fa-grin-wink"></i>
                </div>
                <div className="timeline-body">
                  <div className="timeline-title"><span className="badge">Short &nbsp;& &nbsp;Immediate</span></div>
                  <ul className="todo-list">
                    <li>
                      <input type="checkbox" id="find" disabled />
                      <label className="toggle" htmlFor="find"></label>
                      10 Days after mint - First store discount announced for holders
                    </li>
                    <li>
                      <input type="checkbox" disabled id="build" />
                      <label className="toggle" htmlFor="build"></label>
                      15 Days after mint - Influencer and celebrity collaborations
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      20 Days after mint - 10,000 trees planted
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      30 Days after mint - Updated artwork for every NFT
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      40 Days after mint - Early access to other NFT collections
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      50 Days after mint - Community voted collaborations
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      90 Day after mint - Community voted events
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      120 Days after mint - 3D NFT update to all artwork
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      12 months after mint - partner with other NFT projects to own "space" in the metaverse.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-container danger">
                <div className="timeline-icon">
                  <i className="far fa-grin-hearts"></i>
                </div>
                <div className="timeline-body">
                  <div className="timeline-title"><span className="badge">Long &nbsp; Term</span></div>
                  <ul className="todo-list">
                    <li>
                      <input type="checkbox" id="find" disabled />
                      <label className="toggle" htmlFor="find"></label>
                      With the revenue generated from the 365 Space Project, we will fund the development team to make frequent updates so that our NFTs are always evolving and continue donations frequently to help air pollution so everyone in our world can enjoy star constellations. We will also continue to do celebrity collaboration and add incentives for holders. As this project grows we will add other NFT collections to help increase our impact on air pollution.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="community" className="community">
          <div className="section-title">
            <h1><span>Community</span></h1>
          </div>
          <div className="container py-5">
            <p className="share-tech">Our movement will fail without a strong community. We are dedicated to making a strong environment where everyone has equal say on this project and the causes we choose to support. This will be a space to make friends, network, and discuss long-term ideas for the 365 Space Project.</p>
          </div>
        </section>
        <section id="team" className="team">
          <div className="section-title">
            <h1><span>Our &nbsp;Founders</span></h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/andrew.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Andrew <br />
                  <div className="mt-3 small-text">Marketing</div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/vitalik.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Vitalik<br />
                  <div className="mt-3 small-text">Programing</div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/ivan.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Ivan<br />
                  <div className="mt-3 small-text">Website</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
