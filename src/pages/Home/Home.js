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
        to: "0xd8108ba38aD262a9206da06a0BA7FFF5d5EEa125",
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
              <img src="/assets/img/spaceboy.png" alt="" className="spaceboy" />
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
              <div className="col-12 text-justify share-tech">
                <p>
                  In 1957 the great Space Era began…
                </p>
                <p>
                  We all know how that fairy tale goes because we’re living in the collateral damage of it every day, all around the globe. Not only does the Space Era produce searches for life beyond this planet, but they do so without any inhibitions for the environment, and the people affected by their lust for the destruction of Earth’s night sky.
                </p>
                <p>
                  365SpaceProject was created as a means to access the ecosystem of people who are willing to stand behind a company whose sole purpose is to work with, donate to, and sponsor Global projects designed to reduce air pollution.
                </p>
                <p>
                  As part of the 365SpaceProject, 5110 NFT’s will be minted. Each NFT represents a unique star map, which correlates to particular dates, times, and continental locations around the world. Our first mission after minting completes is to donate and plant 100,000 trees. Holding a 365SpaceProject NFT grants you immediate access to private community events, partnered retail & store discounts, and continued access to the inner circle of the project’s development.
                </p>
                <p>
                  A 5% royalty will go towards continued development and promotion of the 365 Space Project.
                </p>
                <p>
                  You can become a part of the 365 Space Project by minting an NFT at a cost of 0.09ETH + Gas.
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
                    (() => {
                      if (data.totalSupply === data.maxSupply) {
                        return (
                          <div className="row text-center mt-4 flex-center">
                            SOLD OUT
                          </div>
                        )
                      } else {
                        if (!data.isSaleActive) {
                          return (
                            <div class="text-center mt-4">
                              Sale is not active!
                            </div>
                          )
                        }
                        else {
                          return (
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
                      }
                    })()
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
                        <div className="text-danger mt-4" style={{ textAlign: "center" }}>
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
                      20 Days after mint - 100,000 trees planted
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
        <section id="charity" className="charity">
          <div className="section-title">
            <h1><span>Charity</span></h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-6 mb-4 mb-md-0">
                <a href="https://onetreeplanted.org/products/plant-trees?gclid=Cj0KCQjwt-6LBhDlARIsAIPRQcKOP6eoUu6U8sULbPq0jKFi9yEYtzU0TwquxL5XjIBG-L5n8HoXbr4aAkIKEALw_wcB" target="_blank" rel="noreferrer">
                  <img src="/assets/img/trees.jpg" alt="" className="img-thumbnail img-fluid" />
                </a>
              </div>
              <div className="col-sm-6 mb-4 mb-md-0">
                <a href="https://www.4ocean.com" target="_blank" rel="noreferrer">
                  <img src="/assets/img/oceans.jpg" alt="" className="img-thumbnail img-fluid" />
                </a>
              </div>
            </div>
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
                  Space Andrew <br />
                  <div className="mt-3 small-text">Marketing</div>
                  <p className="mt-3">
                    Has worked in the crypto space for the past 3 years on various projects. Best known for working with big-name companies such as MTV, Purekana, Reef Dispensaries, and a number of different celebrities.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/vitalik.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Space Vitalik<br />
                  <div className="mt-3 small-text">Programing</div>
                  <p className="mt-3">Has been working for varios crypto projects for the past year developing the source code and meta data. He personally has coded each image for the 365 Space Project as they are not randomly generated like most NFT projects.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <img className="w-100" src="/assets/img/ivan.png" alt="" />
                <div className="text-center mt-2 text-white">
                  Space Brandon<br />
                  <div className="mt-3 small-text">Website</div>
                  <p className="mt-3">Has been creating website for clients for the past 7 years and is very familiar with UI. If you would like to see anything added to the website be sure to mention it in the Discord!</p>
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
