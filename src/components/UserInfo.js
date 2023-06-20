export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._userInfo = {
      userName: this._name.textContent,
      userJob: this._job.textContent
    };

    return this._userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

}
