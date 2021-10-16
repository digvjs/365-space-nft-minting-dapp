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

  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
          <div className="countdown text-center">
            {/* SOLD &nbsp;OUT &nbsp;IN &nbsp;17 &nbsp;MINUTES */}
          </div>
          <div className="row reverse-mobile">
            <div className="col-12 col-md-6 left-text-col">
              <h1>Welcome to <br /><span>8 BIT UNIVERSE</span>
              </h1>
              <h2>Become a Citizen.</h2>
              <div className="d-flex">
                <a href="#counts" className="btn-get-started scrollto">MINT</a>
                <a href="https://vimeo.com/589027820" className="venobox btn-watch-video" data-vbtype="video" data-autoplay="true"> Watch Video <i className="icofont-play-alt-2"></i></a>
              </div>
            </div>
            <div className="col-12 col-md-6 pos-relative">
              <div className="gameboy">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="about" className="about section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h3><span>The &nbsp;Big &nbsp;Bang</span></h3>
            </div>
            <div className="row">
              <div className="col-12 share-tech">
                <p>We are the <span>IMMORTAL ONES</span>. We created the 8 Bit Metaverse to exist both in the real world & the digital world. Through the 8 Bit Metaverse, we intend to create & develop a digital & real life community for the 8 Bit Metaverse Early Citizens
                </p>
                <p>
                  In total, there are 8888 8 Bit Metaverse Early Citizens NFT. Each Early Citizens NFT is unique and corresponds to a unique custom generated avatar.
                </p>
                <p>
                  You can become an Early Citizen in the 8 Bit Metaverse by minting a 8 Bit Metaverse NFT at a cost of 0.08888 ETH + Gas fee.
                </p>
              </div>
            </div>
            <img src="/assets/img/8_bit_universe.png" className="w-100 mt-3" alt="" />
          </div>
        </section>
        <section id="counts" className="counts">
          <div className="container text-white">
            {
              (blockchain.account !== "" && blockchain.smartContract !== null) ?
                (<div className="container" >
                  <div className="section-title">
                    <h3><span>Total &nbsp;Minted</span></h3>
                  </div>
                  <div className="row mint-count">
                    <span data-toggle="counter-up" className="mintedAmount">{data.totalSupply}</span>/<span data-toggle="counter-up">{data.maxSupply ?? 5110}</span>
                  </div>
                  <div className="row text-center mt-4">
                    <div className="col-md-12">
                      <span id="status"><span className="badge bg-info">Connected: {blockchain.account}</span></span>
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
                                  <span>1</span> &nbsp;&nbsp;
                                </div>
                                <div className="col-8">
                                  <input type="range" className="range-slider" min="1" max={data.maxMintAmount ?? 20} value={numberOfNFTs} step="1" onChange={onChangeAmount} />
                                </div>
                                <div className="col-2 text-left">
                                  &nbsp;&nbsp; <span>{data.maxMintAmount ?? 20}</span>
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
            <h3><span>Roadmap</span></h3>
          </div>
          <div className="container py-5">
            <div className="timeline share-tech">
              <div className="timeline-container primary">
                <div className="timeline-icon">
                  <i className="far fa-grin-wink"></i>
                </div>
                <div className="timeline-body">
                  <h4 className="timeline-title"><span className="badge">8 &nbsp;Bit &nbsp;Digital &nbsp;Metaverse</span></h4>
                  <ul className="todo-list">
                    <li>
                      <input type="checkbox" id="find" disabled />
                      <label className="toggle" htmlFor="find"></label>
                      20 days after Mint - 1st airdrop
                    </li>
                    <li>
                      <input type="checkbox" disabled id="build" />
                      <label className="toggle" htmlFor="build"></label>
                      30 days after Mint - 8 Bit Metaverse Digital Expansion Phase 1
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      50 days after Mint - NFT collaboration announcement & deployment
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      70 days after Mint - 8 Bit Metaverse Digital Expansion Phase 2
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      90 days after Mint - NFT collaboration announcement & deployment
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      120 days after Mint - 8 Bit Metaverse Digital Expansion Phase 3
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      Every month After - community vote on 8 Bit Metaverse Digital Expansion
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      Every month After - deployment on the 8 Bit Metaverse Digital Expansion
                    </li>
                  </ul>
                  <p className="timeline-subtitle">Short & Immediate</p>
                </div>
              </div>
              <div className="timeline-container danger">
                <div className="timeline-icon">
                  <i className="far fa-grin-hearts"></i>
                </div>
                <div className="timeline-body">
                  <h4 className="timeline-title"><span className="badge">8 &nbsp;Bit &nbsp;Real &nbsp;Life &nbsp;Metaverse</span></h4>
                  <ul className="todo-list">
                    <li>
                      <input type="checkbox" id="find" disabled />
                      <label className="toggle" htmlFor="find"></label>
                      Weekly community event on Discord
                    </li>
                    <li>
                      <input type="checkbox" disabled id="build" />
                      <label className="toggle" htmlFor="build"></label>
                      6 months after Mint - 1st in real life community meet up
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      Yearly 8 Bit Metaverse IRL airdrops
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      Yearly in real life community meet up
                    </li>
                    <li>
                      <input type="checkbox" disabled id="ship" />
                      <label className="toggle" htmlFor="ship"></label>
                      Launch of 8 Bit Metaverse Merchandise & Comics
                    </li>
                  </ul>
                  <p className="timeline-subtitle">Short & Immediate</p>
                </div>
              </div>
              <div className="timeline-container success">
                <div className="timeline-icon">
                  <i className="far fa-grin-tears"></i>
                </div>
                <div className="timeline-body">
                  <h4 className="timeline-title"><span className="badge">8 &nbsp;Bit &nbsp;Beyond</span></h4>
                  <p>With the revenue generated from the 8 Bit Metaverse we want to continue to fund our dev team to deploy & finalize the 8 Bit Metaverse Game. This is our long term goal, here are some of our demo graphics, the completion of the 8 Bit Metaverse game really depends on the growth of the 8 Bit Digital Metaverse. Although we have private investor capital, the growth of the 8 Bit Metaverse would really accelerate our development.</p>
                  <p className="timeline-subtitle">Long Term</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="community" className="community">
          <div className="section-title">
            <h3><span>Community</span></h3>
          </div>
          <div className="container py-5">
            <p className="share-tech">A community is empty without Citizens. To build the Metaverse, our first & foremost priority is to ensure everyone is accepted in the community. We want to provide you a place to make friends, network or just chill in both the digital world, the real world and the 8 Bit Metaverse Game that we are currently developing.</p>
          </div>
        </section>
        <section id="team" className="team">
          <div className="section-title">
            <h3><span>Immortal &nbsp;Ones</span></h3>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/gameboy/penguin_red_background.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Immortal &nbsp; Mark<br />
                  <div className="mt-3 small-text">Head Programmer</div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/gameboy/frankenstein_batman_purple_background.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Immortal &nbsp; Shane<br />
                  <div className="mt-3 small-text">Head Web Designer / Metaverse</div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/gameboy/chicken_pilot_hat_pink_background.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Immortal &nbsp; Eric<br />
                  <div className="mt-3 small-text">Head Marketing</div>
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
