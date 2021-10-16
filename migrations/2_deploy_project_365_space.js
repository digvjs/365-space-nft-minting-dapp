const Project365Space = artifacts.require("Project365Space");

module.exports = function (deployer) {
  deployer.deploy(Project365Space, "https://");
};
