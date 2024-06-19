export class OrgAlreadyExists extends Error {
  constructor() {
    super("ORG Already Exists");
  }
}
