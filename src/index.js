import _ from 'lodash';

const propertyData = {
  id: 1,
  propertyName: '1BR Japanese-style Private Room near Kyoto Station',
  propertyType: 'private',
  cancelPolicy: 'strict',
  roomNum: 1,
  bathroomNum: 1,
  priceInDollars: 50,
  host: {
    id: 1,
    firstName: 'Tom'
  }
}

function handleClick(e) { // よくあるパターン
  e.preventDefault(); // 一番最初に書く
  const mainEl = document.getElementById('main');
  return getData().then((desc) => { // returnを書く（成功も失敗も返す）
    mainEl.innerHTML = `
    <p>宿泊施設名: ${desc.propertyName}</p>
    <p>宿泊施設タイプ: ${desc.propertyType}</p>
    <p>キャンセルポリシー: ${desc.cancelPolicy}</p>
    <p>部屋数: ${desc.roomNum}</p>
    <p>バスルーム数: ${desc.bathroomNum}</p>
    <p>価格 (USD): ${desc.priceInDollars}</p>
    <p>ホストID: ${desc.host.id}</p>
    <p>ホスト名: ${desc.host.firstName}</p>
    `
  })
  .catch((error) => {
    mainEl.innerHTML = `
    <p>${error.message}</p>
    `
  })
}
  /* 
    getDataを呼び出して、mainEl.innerHTMLを利用して、結果を出力します。
  */

function getData() {
  return fetchData().then((res) => { // elseの部分があるから .then((resolve, reject) => ではない？
    if (res.success) {
      return Promise.resolve(res.propertyData); // ここでのresolveはメソッド
    } else {
      return Promise.reject(res.message);
    }
  })
}
  /* 
    fetchDataを呼び出して、戻ってきたデータのsuccessの値を元にresolveで物件データまたは、rejectでエラーメッセージを返す。
  */

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = _.random(1, 5);
      if (randomNum <= 4) {
        resolve( // これはメソッド、引数ではない
          Object.assign({}, {success: true}, {propertyData})
        );
      } else {
        reject({ // resolveでも検証する（全部関数ができてから）
          success: false,
          message: 'データの取得に失敗しました。'
        });
      }
    }, 1000)
  })
}
  /* 
    lodashのrandom()を使って、80%の確率で正しいデータを返し、20%の確率でエラーを返すようにしましょう。
    またsetTimeoutを利用して、1秒待ってから結果を得るようにします。
  */ 

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", handleClick);
}