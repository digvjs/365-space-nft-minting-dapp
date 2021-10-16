const Project365Space = artifacts.require("./Project365Space.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Project365Space", (accounts) => {
  let project365Space;

  before(async () => {
    project365Space = await Project365Space.deployed();
  });

  describe("Project365Space deployment", async () => {
    it("deploys successfully", async () => {
      const address = await project365Space.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
    });

    it("has correct name", async () => {
      const name = await project365Space.name();
      assert.equal(name, "365 Space Project");
    });
  });
});
