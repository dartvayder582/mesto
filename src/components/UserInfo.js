export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
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
    this._job.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }
}
