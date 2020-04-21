'use strict';

{

  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'AER', c: ['ソチ空港(ロシア)', 'ホルヘ・ニューベリー空港（アルゼンチン）', 'オーレスン空港（ノルウェー）', "アークレイリ空港（アイスランド）"]},
    {q: 'AJY', c: ['マノ・ダヤク国際空港（ニジェール）', 'アトカ空港（アメリカ）', 'アクロン・フルトン国際空港（アメリカ）', "アクトベ空港（カザフスタン）"]},
    {q: 'GYE', c: ['オルメド・ホセ・ホアキン国際空港（エクアドル）', 'ヘイダル・アリエフ国際空港（アゼルバイジャン）', 'グアヤラメリン空港（ボリビア）', "ゲーリー・シカゴ国際空港（アメリカ）"]},
    {q: 'HGA', c: ['アレクサンドリア国際空港(エジプト)', 'ホーソーン・ミュニシパル空港（アメリカ）', '台州路橋空港（中国）', "イフル空港（モルディブ）"]},
    {q: 'KDN', c: ['マヤマヤ空港（ネパール）', 'カドゥー空港（モルディブ）', 'カアーデドゥー空港（モルディブ）', "高知空港（日本）"]},
    {q: 'LBJ', c: ['コモド空港(インドネシア)', 'ル・セケストレ空港（フランス）', 'ホジェンド空港（タジキスタン）', "リーブルヴィル国際空港（ガボン）"]},
    {q: 'LUE', c: ['ボスコヴィツェ空港（スロヴァキア）', 'ルガーノ空港（スイス）', 'カラウパパ空港（アメリカ）', "ルサカ国際空港（ザンビア）"]},
    {q: 'MKQ', c: ['モパ空港（インドネシア）', 'マルタ国際空港（マルタ）', 'ヴェラナ国際空港（モルディブ）', "クワッド・シティ国際空港（アメリカ）"]},
    {q: 'MMY', c: ['宮古空港（日本）', 'マルメ空港（スウェーデン）', 'メリダ国際空港（メキシコ）', "ゲーリー・シカゴ国際空港"]},
    {q: 'NDJ', c: ['ンジャメナ国際空港（チャド）', 'ニューキャッスル国際空港（イギリス）', 'ディオリ・アマニ国際空港（ニジェール）', "ヌアクショット空港（モーリタニア）"]},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}