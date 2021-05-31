# 영화 정보 제공, 추천 사이드 프로젝트

[TOC]

# 프로젝트 실행 :runner:

### 각각의 폴더로 들어간 뒤 터미널에 명령을 입력하세요.

- backend 폴더에서
  - `python -m venv venv`
  - `source venv/Scripts/activate`
  - (DB 관련 자료를 다 날렸다면, 선택사항) 
    - `python manage.py makemgrations`
  - 최초 실행 시
    - 데이터베이스 생성
      - `python manage.py migrate`
    - json 데이터를 DB에 dump
      - `python manage.py loaddata movies/fixtures/tmdb.json`
  - `python manage.py runserver`
- frontend 폴더에서
  - `npm i`
  - `npm run serve`

# 프로젝트 설명 👨‍💻👩‍💻

## 데이터베이스 모델링(ERD)

![erd](README.assets/erd.png)

## 필수 기능

### A. 관리자 뷰

- django의 admin 기능을 이용하여 구현

### B. 영화 정보

- TMDB API를 사용해서 9,974개의 데이터를 json 파일로 변환한 이후, dump
- 모든 로그인 된 유저가 평점 등록 / 수정 가능

### C. 추천 알고리즘

- 틴더와 같이 영화 포스터를 휙휙 넘겨가며 사용자가 선호하는 장르 데이터를 수집하고, 이를 바탕으로 영화를 추천해주는 기능을 구현
  - User에 JsonField를 추가하고, 해당 필드는 Genre 모델에서 key 값을 가져와서 생성해야 한다.

### D. 커뮤니티

- 리뷰, 댓글을 남길 수 있는 커뮤니티 기능 구현
- 로그인한 사용자만 조회 / 생성 할 수 있으며 작성자 본인만 글의 수정 / 삭제 가능
- 리뷰의 작성 및 삭제는 동기, 댓글의 작성, 수정, 삭제, 리뷰의 수정은 비동기로 처리
- 각 리뷰 및 댓글의 생성 및 수정 시각 정보 포함

### E. 기타

- 크게 영화 정보, 추천 페이지, 틴더 페이지, 커뮤니티 페이지 등의 다양한 URL
- HTTP method와 상태 코드를 상황에 맞게 리턴
- axios를 활용한 비동기 요청으로 UX 향상



# 기타

## git-flow

- 기능 구현 시, feature 별로 새로운 branch 생성. ex) `feature/back/<feature_name>`, `feature/front/<feature_name>`
- 작업 완료 후, Pull Request
- merge된 branch는 삭제

```sh
# 새로운 작업 branch 생성 (꼭 develop branch에서 새로운 branch 파기)
git checkout -b feature/front/movies_list_page
# 원격 branch 가져오기
git checkout -t <branch_name>
```

## notion
- [노션](https://www.notion.so/engcraft/06ab1b20a4ed4013b0b27ba6f80fa090)
- 개발 진행상황, 마일스톤 등의 정보를 모아놓은 노션 페이지

## Git-Convention

커밋 메시지, 풀 리퀘스트 커밋 컨벤션입니다.

간단한 내용일 경우 제목만 적어도 무방합니다! 내용도 심플하게 적어 주세요.

```
# <타입>: <제목>

##### 제목은 최대 50 글자까지만 입력 ############## -> |

# 본문은 위에 작성
######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |

# (선택사항) 꼬릿말은 아래에 작성:
    ex)
    Resolves: #이슈 번호
    See also: #이슈 번호, #이슈 번호

# --- COMMIT END ---
# <타입> 리스트
#   feat    : 기능 (새로운 기능)
#   fix     : 버그 (버그 수정)
#   refactor: 리팩토링
#   style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   docs    : 문서 (문서 추가, 수정, 삭제)
#   test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   chore   : 기타 변경사항 (빌드 스크립트 수정 등)
# ------------------
#     제목 첫 글자를 대문자로
#     제목은 명령문으로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#     본문에 여러줄의 메시지를 작성할 땐 "-"로 구분
# ------------------
```

### 커밋 예시

```
feat: 메인 페이지에 무한 스크롤 추가

내용내용내용내용내용내용내용내용내용내용내용
내용내용내용내용내용내용내용내용내용내용내용
내용내용내용내용내용내용내용내용내용내용내용
내용내용내용내용내용내용내용내용내용내용내용

Resolves: #119
```

### resolves?

어떠한 이슈를 해결한 후, 위의 #119와 같이 119번 이슈로 바로 이동할 수 있는 링크를 생성합니다.

이를 통해 편하게 어떤 Issue에 관련된 커밋/풀 리퀘스트인지 빠르게 파악할 수 있습니다.
