function getCurrentLocation(options = {
  enableHighAccuracy: true,
  maximumAge: 20000,
  timeout: 10000
}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocationがサポートされていません'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 返り値に緯度経度を含める（必要なら生データも渡す）
        resolve({ latitude, longitude, raw: position });
      },
      (error) => {
        let msg = "";
        if (error.code === 1) msg = "位置情報が許可されてません";
        else if (error.code === 2) msg = "現在位置を特定できません";
        else if (error.code === 3) msg = "位置情報を取得する前にタイムアウトになりました";
        else msg = "不明なエラー";
        reject(new Error(msg));
      },
      options
    );
  });
}

//**********************************************
// 使用例
//**********************************************
// getCurrentLocation()
//   .then(({ latitude, longitude }) => {
//     console.log("lat:", latitude, "lng:", longitude);
//     // mapsInit相当の処理をここで呼べます
//   })
//   .catch(err => {
//     alert("エラー：" + err.message);
//   });



