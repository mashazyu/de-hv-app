const YandexURL = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180416T105832Z.f4d83a6bdace48bc.58158ca3eacfe99c2170cd7f0253c21afb460de6&lang=de-en&text=';

export function getYandexTranslation(word) {

  return fetch(`${YandexURL}${word}`)
    .then((response) => response.json())
    .then(({def}) => def)
    .catch((error) => error);

}
