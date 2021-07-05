# NETFLIX_TINDER

영화 정보 제공, 추천 프로젝트

## Requirements

- Vue.js, vuex, vue-router, vuetify
- Django

frontend, backend 폴더 내의 package.json, requirements.txt에 명시되어 있습니다.

## Getting Started

### 각각의 폴더로 들어간 뒤 터미널에 명령을 입력하세요.

- backend 폴더에서
  - `python -m venv venv`
  - `source venv/Scripts/activate`
  - 최초 실행할 경우 꼭 수행
    - 데이터베이스 생성
      - `python manage.py migrate`
    - json 데이터를 DB에 dump
      - `python manage.py loaddata movies/fixtures/tmdb.json`
  - `python manage.py runserver`
- frontend 폴더에서
  - `npm i`
  - `npm run serve`

## Note

Youtube API를 발급받으신 후, frontend 루트 디렉토리에 .env.local 파일을 만들어 주세요.

```
.env.local

VUE_APP_YOUTUBE_API=your_youtube_api_key
```

## Blog

- [프로젝트에 대해 정리한 글](https://jdev.tistory.com/76)

## Screen Shot

### main

![main_gif](README.assets/main_gif.gif)

### detail - 1

![v-dialog_gif](README.assets/v-dialog_gif.gif)

### detail - 2s

![detail_gif](README.assets/detail_gif.gif)

### tinder

![tinder_gif](README.assets/tinder_gif.gif)
